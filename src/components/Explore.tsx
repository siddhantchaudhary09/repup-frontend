import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { Button } from "./ui/button.tsx";

const Explore = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-24 bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-zinc-700 flex items-center transition-all duration-300">
          Explore
          <Search className="ml--1 h-6 w-6" />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default Explore;
