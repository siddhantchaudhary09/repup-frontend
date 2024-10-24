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
import SkeletonLoader from "../components/Loader.tsx";
import { Input } from "../components/ui/input.tsx";

interface Exercise {
  _id: string;
  name: string;
  description: string;
}

interface SetData {
  _id: string;
  weight: string;
  reps: string;
}

interface RoutineInfo {
  title: string;
  excercises: Exercise[];
}

const Routine = () => {
  const [isDataOpen, setIsDataOpen] = useState<{ [key: string]: boolean }>({});
  const [routineInfo, setRoutineInfo] = useState<RoutineInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setData, setSetData] = useState<{ [key: string]: SetData }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSetId, setEditingSetId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.auth?.user);
  const params = useParams<{ id: string }>();
  const routineId = params?.id;

  const userExercises = useSelector(
    (state: any) => state?.auth?.user?.Userexcercise
  );

  useEffect(() => {
    const fetchRoutineInfo = async () => {
      if (routineId) {
        setLoading(true);
        try {
          await routineInfoapi(routineId, setRoutineInfo);
        } catch (err) {
          setError("Failed to load routine information.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRoutineInfo();
  }, [routineId, dispatch, user]);

  const handleAddExercise = async (exercise: Exercise) => {
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
      setError("Error adding exercise to routine.");
    }
  };

  const handleAddSet = async (exerciseId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_DOMAIN}/set/createset`,
        {
          routineId,
          excerciseId: exerciseId,
          weight: setData[exerciseId]?.weight || "",
          reps: setData[exerciseId]?.reps || "",
        },
        { withCredentials: true }
      );
      // Reset the set data after submission
      setSetData((prev) => ({
        ...prev,
        [exerciseId]: { weight: "", reps: "" },
      }));
      setIsDataOpen((prev) => ({ ...prev, [exerciseId]: false }));
      currentuserapi(dispatch);
    } catch (error) {
      setError("Error adding set.");
    }
  };

  const handleUpdateSet = async (setId: string, exerciseId: string) => {
    try {
      const updatedSetData = {
        weight: setData[exerciseId]?.weight || "",
        reps: setData[exerciseId]?.reps || "",
      };

      await axios.put(
        `${import.meta.env.VITE_DOMAIN}/set/updateset/${setId}`,
        updatedSetData,
        {
          withCredentials: true,
        }
      );

      setEditingSetId(null);
      currentuserapi(dispatch);
    } catch (error) {
      setError("Error updating set.");
    }
  };

  const toggleSetData = (exerciseId: string) => {
    setIsDataOpen((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const toggleEditSet = (
    setId: string,
    exerciseId: string,
    weight: string,
    reps: string
  ) => {
    setEditingSetId(editingSetId === setId ? null : setId);
    setSetData((prev) => ({
      ...prev,
      [exerciseId]: { weight, reps },
    }));
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="container mx-auto p-4 bg-zinc-900 min-h-screen mb-12 text-white">
      <h1 className="text-2xl font-bold mb-4">Routine {routineInfo?.title}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {routineInfo ? (
        <>
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

          <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Exercises</h2>
            {routineInfo.excercises.length > 0 ? (
              <ul className="space-y-4">
                {routineInfo.excercises.map((exercise: any) => (
                  <li
                    key={exercise._id}
                    className="bg-zinc-800 p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-yellow-400">
                      {exercise.name}
                    </h3>
                    <p className="text-gray-300">
                      Category: {exercise?.category}
                    </p>
                    <p className="text-gray-300">Muscle: {exercise?.muscle}</p>
                    {exercise?.Set?.map((set: SetData) => (
                      <div
                        className="flex items-center gap-2 mt-2"
                        key={set._id}
                      >
                        {editingSetId === set._id ? (
                          <>
                            <Input
                              value={
                                setData[exercise._id]?.weight || set.weight
                              }
                              onChange={(e) =>
                                setSetData((prev) => ({
                                  ...prev,
                                  [exercise._id]: {
                                    ...prev[exercise._id],
                                    weight: e.target.value,
                                  },
                                }))
                              }
                              className="bg-zinc-700 p-2 rounded-md w-1/4"
                            />
                            <Input
                              value={setData[exercise._id]?.reps || set.reps}
                              onChange={(e) =>
                                setSetData((prev) => ({
                                  ...prev,
                                  [exercise._id]: {
                                    ...prev[exercise._id],
                                    reps: e.target.value,
                                  },
                                }))
                              }
                              className="bg-zinc-700 p-2 rounded-md w-1/4"
                            />
                            <Button
                              onClick={() =>
                                handleUpdateSet(set._id, exercise._id)
                              }
                              className="bg-zinc-600 hover:bg-zinc-500"
                            >
                              Save
                            </Button>
                          </>
                        ) : (
                          <>
                            <p className="bg-zinc-700 p-2 rounded-md w-1/4">
                              {set.weight}
                            </p>
                            <p className="bg-zinc-700 p-2 rounded-md w-1/4">
                              {set.reps}
                            </p>
                            <Button
                              onClick={() =>
                                toggleEditSet(
                                  set._id,
                                  exercise._id,
                                  set.weight,
                                  set.reps
                                )
                              }
                              className="bg-zinc-600 hover:bg-zinc-500"
                            >
                              Edit
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                    {isDataOpen[exercise._id] && (
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          placeholder="Weight"
                          value={setData[exercise._id]?.weight || ""}
                          onChange={(e) =>
                            setSetData((prev) => ({
                              ...prev,
                              [exercise._id]: {
                                ...prev[exercise._id],
                                weight: e.target.value,
                              },
                            }))
                          }
                          className="bg-zinc-700 p-2 rounded-md w-1/4"
                        />
                        <Input
                          placeholder="Reps"
                          value={setData[exercise._id]?.reps || ""}
                          onChange={(e) =>
                            setSetData((prev) => ({
                              ...prev,
                              [exercise._id]: {
                                ...prev[exercise._id],
                                reps: e.target.value,
                              },
                            }))
                          }
                          className="bg-zinc-700 p-2 rounded-md w-1/4"
                        />
                        <Button
                          onClick={() => handleAddSet(exercise._id)}
                          className="bg-zinc-600 hover:bg-zinc-500"
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
            ) : (
              <p className="text-gray-400">No exercises added yet.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-400">No routine information available.</p>
      )}
    </div>
  );
};

export default Routine;
