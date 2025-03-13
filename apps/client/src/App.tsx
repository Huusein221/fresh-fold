// import { Separator } from "./components/ui/ui/separator";

import logo from "../images/FreshFoldNoBg.png";
import { Button } from "./components/ui/ui/button";
import { Link } from "react-router";
// import bg from "../images/SelfService.png";
function App() {
  return (
    <>
      <header className="flex items-center mt-1.5 ml-1.5 font-bold text-xl">
        <img src={logo} alt="FreshFold Logo" className="h-30 w-auto" />
      </header>

      {/* <Separator className="flex items-center mt-1.5 ml-1.5 font-bold text-xl" /> */}
      <div className="relative bg-orange-200 h-screen">
        <div className="absolute inset-0 bg-cover bg-center">
          <div className="bg-orange-200 bg-opacity-50 flex flex-col justify-center items-center h-full">
            <div className="text-black p-4 text-center">
              <h1 className="text-4xl font-bold">Welcome to FreshFold</h1>
              <h2 className="text-xl mt-2">The Smartest Way to Do Laundry</h2>

              <Link to="/dashboard" className="mt-4">
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Make your first order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
