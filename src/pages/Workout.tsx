import { ClipboardList, Dumbbell, Plus } from "lucide-react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router";
import AddExercise from "../components/AddExcercise.tsx";
import AddRoutine from "../components/AddRoutine.tsx";
import SkeletonLoader from "../components/Loader.tsx";
import { Button } from "../components/ui/button.tsx";

export default function Workout() {
  const navigate = useNavigate();
  const userExercises = useSelector(
    (state: any) => state?.auth?.user?.Userexcercise
  );
  const routines = useSelector((state: any) => state?.auth?.user?.routine);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 mb-12">
      {routines ? (
        <div>
          {" "}
          <h1 className="text-2xl font-bold mb-6">Your Workout</h1>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <AddRoutine />
            <AddExercise />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <ClipboardList className="mr-2 h-5 w-5" />
                Your Routines
              </h2>
              {routines?.length > 0 ? (
                <ul className="space-y-2">
                  {routines?.map((routine: any) => (
                    <div>
                      <li
                        key={routine._id}
                        className="bg-zinc-800 p-3 rounded-lg "
                      >
                        {routine.title}
                      </li>
                      <Button
                        className=" bg-blue-500  w-full  "
                        onClick={() => {
                          navigate(`/routine/${routine._id}`);
                        }}
                      >
                        Start Routine <Plus className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
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
              {userExercises?.length > 0 ? (
                <ul className="space-y-2">
                  {userExercises?.map((exercise: any, index: number) => (
                    <li
                      key={index}
                      className="bg-zinc-800 p-3 rounded-lg"
                      onClick={() => navigate(`/excercise/${exercise._id}`)}
                    >
                      {exercise.name} - {exercise.category} - {exercise.muscle}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-400">No exercises added yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}
