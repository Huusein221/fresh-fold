// import { Separator } from "./components/ui/ui/separator";
import { UserForm } from "./components/ui/UserForm";
import logo from "../images/FreshFoldNoBg.png";

function App() {
  return (
    <>
      <header className="flex items-center mt-1.5 ml-1.5 font-bold text-xl">
        <img src={logo} alt="FreshFold Logo" className="h-30 w-auto" />
      </header>
      {/* <Separator className="flex items-center mt-1.5 ml-1.5 font-bold text-xl" /> */}
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
