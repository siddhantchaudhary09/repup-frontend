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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { currentuserapi } from "../Api/Authapi.ts";
import { routineInfoapi } from "../Api/Routineexcercise.ts";

interface Exercise {
  _id: string;
  name: string;
  description: string;
}

function Routine() {
  const params = useParams<{ id: string }>();
  const routineId = params?.id;
  const [routineInfo, setRoutineInfo] = useState<any>(null);
  useEffect(() => {
    routineInfoapi(routineId, setRoutineInfo);
  }, [routineId]);

  console.log(routineInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userExercises = useSelector(
    (state: any) => state?.auth?.user?.Userexcercise
  );
  const dispatch = useDispatch();

  const handleAddExercise = async (exercise: Exercise) => {
    try {
      // Make a POST request to add the exercise to the user's routine
      await axios.post(
        `${import.meta.env.VITE_DOMAIN}/excercise/createexcercise`,
        {
          excerciseId: exercise._id,
          routineId,
        },
        {
          withCredentials: true,
        }
      );

      setIsModalOpen(false);
      currentuserapi(dispatch);
    } catch (error) {
      console.error("Error adding exercise to routine:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-900 h-full mb-12 text-white">
      <h1 className="text-2xl font-bold mb-4">Routine {routineInfo?.title}</h1>
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
                userExercises?.map((exercise: any) => (
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

      <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Exercises</h2>
        {routineInfo?.excercises?.length > 0 ? (
          <ul className="space-y-4">
            {routineInfo?.excercises?.map((exercise: any) => (
              <li
                key={exercise._id}
                className="bg-zinc-800 p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-yellow-400">
                  {exercise.name}
                </h3>
                <p className="text-gray-300">Category: {exercise.category}</p>
                <p className="text-gray-300">Muscle: {exercise.muscle}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No exercises added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Routine;
