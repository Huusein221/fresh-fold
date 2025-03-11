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
import { useNavigate } from "react-router";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

export interface InewUser {
  message: string;
  user: {
    id: number;
    username: string;
    createdAt: string;
    address: string;
  };
}
export function UserForm() {
  const navigate = useNavigate();
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
      const newUser = await addUser(data.username, data.address);
      console.log("newUser", newUser);
      form.reset();
      // navigate
      const test = newUser as unknown as InewUser;

      if (newUser !== undefined) {
        navigate(`/order/${test.user.id}/${data.address}`);
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10.5">
      <Card className="w-full max-w-4xl p-8 shadow-xl bg-white rounded-lg">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
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
                <FormItem className="space-y-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
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
            <div className="flex justify-center">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
