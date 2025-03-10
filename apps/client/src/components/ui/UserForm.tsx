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
} from "./library/form";
import { Input } from "./library/input";
import { Button } from "./library/button";
import { useUsers } from "../../hooks/useUser";

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
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addUser(data.username, data.address);
      form.reset(); // Reset form fields upon successful submission
    } catch (error) {
      console.error("Submission error", error);
      // Optionally display a server error message here
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
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
                <Input placeholder="Insert your address" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display address.
              </FormDescription>
              {/* <FormMessage>{errors.address?.message}</FormMessage> */}
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
