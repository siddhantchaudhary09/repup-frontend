import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";

const SetEditor = ({ set, exerciseId, isEditing, toggleEditSet }: any) => {
  const [weight, setWeight] = useState(set.weight || "");
  const [reps, setReps] = useState(set.reps || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (isNaN(weight) || isNaN(reps)) {
      setError("Weight and Reps must be numbers.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_DOMAIN}/set/updateSet`, {
        weight,
        reps,
        setid: set._id,
      });
      toggleEditSet(set._id, exerciseId, weight, reps, set.sno);
    } catch (error) {
      console.error("Error updating set:", error);
      setError("Failed to update set. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-2">
      {error && <div className="text-red-500">{error}</div>}
      {isEditing ? (
        <>
          <Input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight"
            className="bg-zinc-700 p-2 rounded-md mb-2"
          />
          <Input
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Reps"
            className="bg-zinc-700 p-2 rounded-md mb-2"
          />
          <Button
            onClick={handleUpdate}
            className="bg-zinc-600 hover:bg-zinc-500"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </>
      ) : (
        <div className="flex justify-between items-center">
          <div className="text-white">
            <span>Sno: {set.sno}</span> | <span>Weight: {set.weight}</span> |{" "}
            <span>Reps: {set.reps}</span>
          </div>
          <Button
            onClick={() =>
              toggleEditSet(set._id, exerciseId, weight, reps, set.sno)
            }
            className="bg-zinc-600 hover:bg-zinc-500"
            aria-label="Edit set"
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
};

export default SetEditor;
