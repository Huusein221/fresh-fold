import { Separator } from "./components/ui/separator";
import { UserForm } from "./components/ui/UserForm";

function App() {
  return (
    <>
      <header className="flex mt-6px ml-6px font-bold">
        <h1>FreshFold</h1>
      </header>
      <Separator />
      <div>
        <h1 className="text-4xl font-bold ">The Smartest Way to Do Laundry</h1>
      </div>

      <div>
        <UserForm />
      </div>
    </>
  );
}

export default App;
