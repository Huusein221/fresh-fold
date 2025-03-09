import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Calendar } from "./components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

function App() {
  return (
    <>
      <div>
        <Avatar className="flex justify-end">
          <AvatarImage src="" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 className="text-4xl font-bold ">The Smartest Way to Do Laundry</h1>
      </div>
      <div>
        <Button className="bg-orange-500 text-white p-3 rounded-full flex items-center justify-center hover:bg-orange-600 focus:outline-none">
          Send
        </Button>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            {" "}
            <Calendar mode="single" />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default App;
