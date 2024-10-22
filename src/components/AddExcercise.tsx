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

export default function AddExercise() {
  const dispatch = useDispatch();
  const [exerciseData, setExerciseData] = useState({
    name: "",
    category: "",
    muscle: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = ({ target: { name, value } }: any) => {
    setExerciseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExercise = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/users/create`,
        exerciseData,
        { withCredentials: true }
      );

      if (data?.status === 200) {
        setExerciseData({ name: "", category: "", muscle: "" });
      } else {
        setError("Failed to add exercise. Please try again.");
      }
    } catch (error) {
      console.error("Error adding exercise:", error);
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
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Add New Exercise
          </DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-center">{error}</p>}{" "}
        {/* Error message */}
        <form onSubmit={handleAddExercise} className="space-y-6">
          <div>
            <Label htmlFor="exerciseName" className="block text-sm font-medium">
              Exercise Name
            </Label>
            <Input
              id="exerciseName"
              name="name"
              placeholder="e.g., Squats"
              className="mt-1 bg-zinc-800 text-white border-zinc-600 focus:border-zinc-500 focus:ring focus:ring-zinc-500"
              value={exerciseData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category" className="block text-sm font-medium">
              Category
            </Label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full bg-zinc-800 text-white border-zinc-600 focus:border-zinc-500 focus:ring focus:ring-zinc-500 rounded-md"
              value={exerciseData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {["beginner", "intermediate", "advanced"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="muscle" className="block text-sm font-medium">
              Muscle Group
            </Label>
            <select
              id="muscle"
              name="muscle"
              className="mt-1 block w-full bg-zinc-800 text-white border-zinc-600 focus:border-zinc-500 focus:ring focus:ring-zinc-500 rounded-md"
              value={exerciseData.muscle}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Muscle Group</option>
              {[
                "chest",
                "back",
                "legs",
                "triceps",
                "biceps",
                "shoulders",
                "abs",
              ].map((muscle) => (
                <option key={muscle} value={muscle}>
                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Button
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Add Exercise"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
