import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentuserapi } from "../Api/Authapi.ts";

export default function AddRoutine() {
  const dispatch = useDispatch();
  const [routineData, setRoutineData] = useState({ title: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = ({ target: { name, value } }: any) => {
    setRoutineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoutine = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/routine/createroutine`,
        routineData,
        { withCredentials: true }
      );

      if (data?.status == 200) {
        setRoutineData({ title: "" });
      } else {
        setError("Failed to add routine. Please try again.");
      }
    } catch (error) {
      console.error("Error adding routine:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      currentuserapi(dispatch);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-24 bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-zinc-700 flex items-center transition-all duration-300">
          <PlusCircle className="mr-2 h-6 w-6" />
          Add Routine
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Add New Routine
          </DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleAddRoutine} className="space-y-6">
          <div>
            <Label htmlFor="routineTitle" className="block text-sm font-medium">
              Routine Title
            </Label>
            <Input
              id="routineTitle"
              name="title"
              placeholder="e.g., Morning Workout"
              className="mt-1 bg-zinc-800 text-white border-zinc-600 focus:border-zinc-500 focus:ring focus:ring-zinc-500"
              value={routineData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Add Routine"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
