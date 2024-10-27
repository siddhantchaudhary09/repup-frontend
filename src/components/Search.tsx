import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card.tsx";
import { Input } from "./ui/input.tsx";

interface Exercise {
  name: string;
  muscle: string;
  difficulty: string;
  category: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debouncing
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!debouncedTerm) return;

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/exercises?name=${debouncedTerm}`,
          {
            headers: {
              "X-Api-Key": "sXWo/cDIQctqi3vw9WFSow==eIA2BlJxuXVIPSVi", // Use environment variable
            },
          }
        );

        setExercises(response.data.slice(0, 5));
      } catch (err: any) {
        if (err.response) {
          setError(err.response.data.message || "Error fetching exercises.");
        } else {
          setError("Network error. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [debouncedTerm]);

  const handleAddExercise = async (exercise: Exercise) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/users/create`,
        {
          name: exercise.name,
          category: exercise.category,
          muscle: exercise.muscle,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Exercise added successfully!");
        // Optionally, you could refresh the list of exercises or update state
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Error adding exercise.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-zinc-900 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add Exercises to Your App Directly
      </h1>
      <Input
        type="text"
        placeholder="Search for an exercise..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      />
      {loading && (
        <p className="block mx-auto text-yellow-500 text-center">Loading...</p>
      )}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      <div className="mt-4 p-4 bg-zinc-800 rounded-lg">
        {exercises.length === 0 && !loading && !error && (
          <p className="mt-4 text-gray-500 text-center">No exercises found.</p>
        )}
        <ul className="space-y-2">
          {exercises.map((exercise) => (
            <Card
              key={exercise.name}
              className="p-3 bg-zinc-700 rounded-lg shadow-md transition hover:shadow-lg cursor-pointer"
              onClick={() => handleAddExercise(exercise)}
            >
              <h2 className="font-semibold text-lg">{exercise.name}</h2>
              <p className="text-gray-200">Muscle: {exercise.muscle}</p>
              <p className="text-gray-200">Difficulty: {exercise.difficulty}</p>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
