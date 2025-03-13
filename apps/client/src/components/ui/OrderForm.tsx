import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/ui/button";
import { Calendar } from "../ui/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/ui/popover";
import { useOrders } from "../../hooks/useOrders";
import { Switch } from "../ui/ui/switch";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import logo from "/Users/hussein/my-turborepo/apps/client/images/FreshFoldNoBg.png";
import { Link, useNavigate, useParams } from "react-router";
import moment from "moment";
import { useState } from "react";
const FormSchema = z.object({
  pickUpDateTime: z.date({
    required_error: "A pickup date is required.",
  }),
  deliveryDateTime: z.date({ required_error: "A delivery date is required." }),
  serviceType: z.union([
    z.enum(["Wash", "DryClean", "HangClean"]),
    z.literal(""),
  ]),
});

export function OrderForm() {
  const navigate = useNavigate();
  const { address, userId } = useParams();
  const { addOrder } = useOrders();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pickUpDateTime: new Date(),
      deliveryDateTime: new Date(),
      serviceType: "",
    },
  });
  const selectedServiceType = form.watch("serviceType");
  const [isWashSelected, setIsWashSelected] = useState(false);
  const [isDryCleanSelected, setIsDryCleanSelected] = useState(false);

  const onSubmit: SubmitHandler = async (data) => {
    console.log("Form submitted:", data);
    try {
      const pickUpDate = moment(data.pickUpDateTime).toDate();
      const deliveryDate = moment(data.deliveryDateTime).toDate();
      if (userId) {
        await addOrder(
          data.serviceType,
          pickUpDate,
          deliveryDate,
          Number(userId)
        );
      }

      form.reset();
      navigate(`/service/${userId}`);
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <>
      <header className="flex items-center mt-1.5 ml-1.5 font-bold text-xl">
        <Link to="/">
          <img src={logo} alt="FreshFold Logo" className="h-30 w-auto" />
        </Link>
      </header>
      <div className="flex flex-col justify-center items-center text-4xl font-bold">
        <h1>Schedule your order</h1>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 mt-10">
        <Card className="p-6 shadow-lg rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <h3>{address}</h3>
        </Card>
        <Card className="p-6 shadow-lg rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-4">Pickup</h2>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="pickUpDateTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2">
                      <FormLabel className="flex items-center space-x-2">
                        🚚 PICKUP
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        We will always stop by between 8pm and 10pm. At 5:30pm,
                        we will text you a 30-minute arrival window of your
                        Valet, who will bring your free personalized FreshFold
                        bags.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {(selectedServiceType === "Wash" ||
                  selectedServiceType === "DryClean") && (
                  <FormField
                    control={form.control}
                    name="deliveryDateTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2">
                        <FormLabel className="flex items-center space-x-2">
                          📦 DELIVERY
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Select your desired delivery date.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Card className="p-6 shadow-lg rounded-lg bg-white">
                  <h2 className="text-xl font-semibold mb-4">Services</h2>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="Wahs-Fold"
                        // checked={selectedServiceType === "Wash"}
                        checked={isWashSelected}
                        onCheckedChange={(checked) => {
                          setIsWashSelected(checked);
                          if (checked) {
                            console.log("switch toggled to wash");
                            form.setValue("serviceType", "Wash", {
                              shouldValidate: true,
                            });
                          }
                        }}
                      />
                      <Label>👔 Wash & Fold</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="Dry-Clean"
                        // checked={selectedServiceType === "DryClean"}
                        checked={isDryCleanSelected}
                        onCheckedChange={(checked) => {
                          setIsDryCleanSelected(checked);
                          if (checked)
                            form.setValue("serviceType", "DryClean", {
                              shouldValidate: true,
                            });
                        }}
                      />
                      <Label>Dry Clean</Label>
                    </div>
                    <Button
                      type="submit"
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    >
                      Schedule your Order
                    </Button>
                  </div>
                </Card>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
}
