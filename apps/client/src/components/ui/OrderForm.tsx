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

const FormSchema = z.object({
  pickUpDateTime: z.date({
    required_error: "A pickup date is required.",
  }),
  deliveryDateTime: z.date({ required_error: "A delivery date is required." }),
  serviceType: z.enum(["Wash", "DryClean", "HangClean"]),
});

export function OrderForm() {
  const { addOrder } = useOrders();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pickUpDateTime: new Date(),
    },
  });
  const onSubmit: SubmitHandler = async (data) => {
    try {
      await addOrder(
        data.pickUpDateTime,
        data.deliveryDateTime,
        data.serviceType
      );

      form.reset();
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-4xl font-bold">
        <h1>Schedule your order</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Card>
          <div>
            <h2>Address</h2>
          </div>
        </Card>
        <Card>
          <div>
            <h2>Pickup</h2>
          </div>
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
                    <FormItem className="flex flex-col">
                      <FormLabel>🚚 PICKUP</FormLabel>
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
                <Card>
                  <div>
                    <h2>Services</h2>
                    <div className="flex items-center space-x-2">
                      <Switch id="Wahs&Fold" />
                      <Label>👔 Wash & Fold</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="Dry-Clean" />
                      <Label>Dry Clean</Label>
                    </div>
                    <Button className="cursor-pointer">
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
