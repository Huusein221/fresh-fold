import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUsers } from "../../hooks/useUser";
import { Card } from "./ui/card";
import { Link } from "react-router";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

export function UserForm() {
  const { addUser } = useUsers();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addUser(data.username, data.address);
      form.reset();
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10.5">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="w-2xl"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  {/* <FormMessage>{form.errors.username?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      className="w-2xl"
                      placeholder="Insert your address"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display address.
                  </FormDescription>
                  {/* <FormMessage>{errors.address?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <Link to={`/order/`}>
              <Button className="cursor-pointer" type="submit">
                Continue
              </Button>
            </Link>
          </form>
        </Form>
      </Card>
    </div>
  );
}
