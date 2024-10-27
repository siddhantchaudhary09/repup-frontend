"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import axios from "axios";
import { useMemo, useState } from "react";
import SetEditor from "./SetEditor.tsx";

const ExerciseList = ({ exercises }: { exercises: any[] }) => {
  const [isDataOpen, setIsDataOpen] = useState<{ [key: string]: boolean }>({});
  const [sno, setSno] = useState<string>(""); // For Sno input
  const [weight, setWeight] = useState<string>(""); // For weight (non-editable)
  const [reps, setReps] = useState<string>(""); // For reps (non-editable)
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  const toggleSetData = (exerciseId: string) => {
    setIsDataOpen((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const handleAddSet = async (exerciseId: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/set/createset`,
        { excerciseId: exerciseId, sno, weight, reps }
      );
      console.log(response);
      setSno(""); // Reset Sno input
      setWeight(""); // Reset Weight display
      setReps(""); // Reset Reps display
      toggleSetData(exerciseId);
    } catch (error: any) {
      console.error(
        "Error adding set:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const toggleEditSet = (setId: string) => {
    setEditingSetId((prev) => (prev === setId ? null : setId));
  };

  const memoizedExercises = useMemo(() => {
    return exercises.map((exercise) => ({
      ...exercise,
      // Add any necessary transformations or optimizations here
    }));
  }, [exercises]);

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Exercises</h2>
      <ul className="space-y-4">
        {memoizedExercises.map((exercise) => (
          <li
            key={exercise._id}
            className="bg-zinc-800 p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-yellow-400">
              {exercise.name}
            </h3>
            <p className="text-gray-300">Category: {exercise?.category}</p>
            <p className="text-gray-300">Muscle: {exercise?.muscle}</p>
            <ul>
              {exercise?.Set?.map((set: any) => (
                <li key={set._id}>
                  <SetEditor
                    key={set._id}
                    set={set}
                    exerciseId={exercise._id}
                    isEditing={editingSetId === set._id}
                    toggleEditSet={toggleEditSet}
                  />
                </li>
              ))}
            </ul>
            {isDataOpen[exercise._id] && (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={sno}
                  onChange={(e) => setSno(e.target.value)}
                  placeholder="Sno"
                  className="bg-zinc-700 p-2 rounded-md w-1/4"
                />
                <div className="bg-zinc-700 p-2 rounded-md w-1/4 text-gray-300">
                  Weight: {weight}
                </div>
                <div className="bg-zinc-700 p-2 rounded-md w-1/4 text-gray-300">
                  Reps: {reps}
                </div>
                <Button
                  className="bg-zinc-600 hover:bg-zinc-500"
                  onClick={() => handleAddSet(exercise._id)}
                >
                  Add Set
                </Button>
              </div>
            )}
            <Button
              className="w-full mt-3"
              onClick={() => toggleSetData(exercise._id)}
            >
              {isDataOpen[exercise._id] ? "Hide Set" : "Add Set"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
