"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { routineInfoapi } from "../Api/Routineexcercise.ts";
import ExerciseDialog from "../components/ExerciseDialog.tsx";
import ExerciseList from "../components/ExerciseList.tsx";
import SkeletonLoader from "../components/Loader.tsx";

interface RoutineInfo {
  title: string;
  excercises: any[];
}

const Createroutine = () => {
  const [routineInfo, setRoutineInfo] = useState<RoutineInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const routineId = params?.id;

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
  }, [routineId, dispatch]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="container mx-auto p-4 bg-zinc-900 min-h-screen mb-12 text-white">
      <h1 className="text-2xl font-bold mb-4">Routine {routineInfo?.title}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {routineInfo ? (
        <>
          <ExerciseDialog routineId={routineId} />
          <ExerciseList exercises={routineInfo.excercises} />
        </>
      ) : (
        <p className="text-gray-400">No routine information available.</p>
      )}
    </div>
  );
};

export default Createroutine;
