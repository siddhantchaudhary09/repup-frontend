"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardList, Dumbbell, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Workout() {
  const [routines, setRoutines] = useState<string[]>([]);
  const [exercises, setExercises] = useState<string[]>([]);

  const addRoutine = (routineName: string) => {
    setRoutines([...routines, routineName]);
  };

  const addExercise = (exerciseName: string) => {
    setExercises([...exercises, exerciseName]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Your Workout</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-24 bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-zinc-700">
              <PlusCircle className="mr-2 h-6 w-6" />
              Add Routine
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Routine</DialogTitle>
              <DialogDescription>
                Create a new workout routine
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const routineName = formData.get("routineName") as string;
                if (routineName) addRoutine(routineName);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="routineName">Routine Name</Label>
                <Input
                  id="routineName"
                  name="routineName"
                  placeholder="e.g., Leg Day"
                  className="bg-zinc-700 text-white border-zinc-600"
                />
              </div>
              <Button type="submit" className="w-full">
                Add Routine
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-24 bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-zinc-700">
              <PlusCircle className="mr-2 h-6 w-6" />
              Add Exercise
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Exercise</DialogTitle>
              <DialogDescription>
                Add a new exercise to your workout
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const exerciseName = formData.get("exerciseName") as string;
                if (exerciseName) addExercise(exerciseName);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="exerciseName">Exercise Name</Label>
                <Input
                  id="exerciseName"
                  name="exerciseName"
                  placeholder="e.g., Squats"
                  className="bg-zinc-700 text-white border-zinc-600"
                />
              </div>
              <Button type="submit" className="w-full">
                Add Exercise
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            Your Routines
          </h2>
          {routines.length > 0 ? (
            <ul className="space-y-2">
              {routines.map((routine, index) => (
                <li key={index} className="bg-zinc-800 p-3 rounded-lg">
                  {routine}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400">No routines added yet.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Dumbbell className="mr-2 h-5 w-5" />
            Your Exercises
          </h2>
          {exercises.length > 0 ? (
            <ul className="space-y-2">
              {exercises.map((exercise, index) => (
                <li key={index} className="bg-zinc-800 p-3 rounded-lg">
                  {exercise}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-400">No exercises added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
