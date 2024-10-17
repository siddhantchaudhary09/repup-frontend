import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Dumbbell, Menu, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">GainTrack</h1>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Track Your Gains</h2>
          <p className="text-zinc-400">
            Log workouts, monitor progress, and achieve your fitness goals.
          </p>
        </section>

        <section className="space-y-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Dumbbell className="h-6 w-6 text-white" />
              <CardTitle className="text-lg">Log Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                Easily record your exercises, sets, reps, and weights.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <TrendingUp className="h-6 w-6 text-white" />
              <CardTitle className="text-lg">Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                Visualize your improvements over time with detailed charts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <BarChart className="h-6 w-6 text-white" />
              <CardTitle className="text-lg">Manage Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                Create and customize workout routines to fit your goals.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Button
            asChild
            className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </section>

        <section className="mt-4 text-center">
          <p className="text-zinc-400">Already have an account?</p>
          <Button
            variant="link"
            asChild
            className="text-white hover:text-zinc-200"
          >
            <Link to="/login">Log In</Link>
          </Button>
        </section>
      </main>

      <footer className="p-4  mb-12 text-center text-sm text-zinc-500">
        © 2024 RepUp. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;
