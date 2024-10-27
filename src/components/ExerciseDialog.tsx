"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentuserapi } from "../Api/Authapi.ts";

interface Exercise {
  _id: string;
  name: string;
}

const ExerciseDialog = ({ routineId }: { routineId: string | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userExercises = useSelector(
    (state: any) => state?.auth?.user?.Userexcercise
  );
  const dispatch = useDispatch();

  const handleAddExercise = async (exercise: Exercise) => {
    if (!routineId) {
      console.error("Routine ID is undefined");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_DOMAIN}/excercise/createexcercise`,
        {
          excerciseId: exercise._id,
          routineId,
        },
        { withCredentials: true }
      );
      setIsModalOpen(false);
      currentuserapi(dispatch);
    } catch (error) {
      console.error("Error adding exercise to routine:", error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-zinc-700 hover:bg-zinc-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Add Exercise to Routine</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ScrollArea className="h-[300px] w-full rounded-md border bg-zinc-700 p-4">
            {userExercises?.length > 0 ? (
              userExercises.map((exercise: Exercise) => (
                <div
                  key={exercise._id}
                  className="flex items-center justify-between py-2"
                >
                  <span>{exercise.name}</span>
                  <Button
                    onClick={() => handleAddExercise(exercise)}
                    className="bg-zinc-600 hover:bg-zinc-500"
                  >
                    Add
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                No exercises available
              </p>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseDialog;
