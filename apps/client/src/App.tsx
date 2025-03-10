import { useEffect, useState } from "react";

import { UserForm } from "./components/ui/UserForm";
const serviceApi = {
  async getUsers() {
    const response = await fetch(`http://localhost:3000/user`);
    const data = await response.json();
    return data;
  },
  async postUser(username: string, address: string) {
    const response = await fetch(`http://localhost:3000/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, address }),
    });
    const data = await response.json();
    return data;
  },
};

function App() {
  const [, setUser] = useState([]);
  // const [addressInput, setAddressInput] = useState("");
  // const [usernameInput, setUsernameInput] = useState("");
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: "",
  //     address: "",
  //   },
  // });
  async function fetchUsers() {
    const fetchedUsers = await serviceApi.getUsers();
    setUser(fetchedUsers);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  // function inputUserChange(event) {
  //   setUsernameInput(event.target.value);
  // }
  // function inputAddressChange(event) {
  //   setAddressInput(event.target.value);
  // }
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   await serviceApi.postUser(usernameInput, addressInput);
  //   setUsernameInput("");
  //   setAddressInput("");
  //   fetchUsers();
  // }

  return (
    <>
      <div className="flex mt-6px ml-6px font-bold">
        <h1>FreshFold</h1>
      </div>

      <div>
        <h1 className="text-4xl font-bold ">The Smartest Way to Do Laundry</h1>
      </div>

      <UserForm />
    </>
  );
}

export default App;
