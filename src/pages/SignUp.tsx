import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Using react-router for navigation

type FormData = {
  email: string;
  password: string;
  username: string;
  age: string;
  gender: string;
  goal: string;
  height: string;
  weight: string;
};

const initialFormData: FormData = {
  email: "",
  password: "",
  username: "",
  age: "",
  gender: "",
  goal: "",
  height: "",
  weight: "",
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sign-up logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Reset form or redirect user after successful signup
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col p-4">
      <header className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-white hover:text-zinc-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select
                  name="goal"
                  value={formData.goal}
                  onValueChange={(value) => handleSelectChange("goal", value)}
                >
                  <SelectTrigger className="bg-zinc-800 text-white border-zinc-700">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose_weight">Lose Weight</SelectItem>
                    <SelectItem value="gain_muscle">Gain Muscle</SelectItem>
                    <SelectItem value="improve_fitness">
                      Improve Overall Fitness
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  required
                  value={formData.height}
                  onChange={handleInputChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  required
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="bg-zinc-800 text-white border-zinc-700"
                />
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="bg-zinc-800 text-white border-zinc-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-white text-zinc-900 hover:bg-zinc-200"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-white text-zinc-900 hover:bg-zinc-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400">Already have an account?</p>
          <Button
            variant="link"
            asChild
            className="text-white hover:text-zinc-300"
          >
            <Link to="/signin">Sign In</Link>
          </Button>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-zinc-500">
        © 2024 GainTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default SignUp;
