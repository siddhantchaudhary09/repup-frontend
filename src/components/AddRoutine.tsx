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
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function AddRoutine({
  addRoutine,
}: {
  addRoutine: (routineName: string) => void;
}) {
  const [routineName, setRoutineName] = useState("");

  const handleAddRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (routineName) {
      addRoutine(routineName);
      setRoutineName("");
    }
  };

  return (
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
          <DialogDescription>Create a new workout routine</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddRoutine} className="space-y-4">
          <div>
            <Label htmlFor="routineName">Routine Name</Label>
            <Input
              id="routineName"
              name="routineName"
              placeholder="e.g., Leg Day"
              className="bg-zinc-700 text-white border-zinc-600"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Routine
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
