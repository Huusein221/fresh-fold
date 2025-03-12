import logo from "../../../images/FreshFoldNoBg.png";
import { UserForm } from "./UserForm";
export function Dashboard() {
  return (
    <>
      <header className="flex items-center mt-1.5 ml-1.5 font-bold text-xl">
        <img src={logo} alt="FreshFold Logo" className="h-30 w-auto" />
      </header>
      <div className="flex flex-col justify-center items-center text-4xl font-bold">
        <h1>Start your order!</h1>
      </div>
      {/* <Separator className="flex items-center mt-1.5 ml-1.5 font-bold text-xl" /> */}
      <UserForm />
    </>
  );
}
