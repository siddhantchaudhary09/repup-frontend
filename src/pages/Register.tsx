import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Using react-router for navigation
import { SignupAPi } from "../Api/Authapi.ts";

export type FormData = {
  email: string;
  password: string;
  username: string;
  age: number;
  gender: string;
  goal: string;
  height: string;
  weight: string;
};

const initialFormData: FormData = {
  email: "",
  password: "",
  username: "",
  age: 0,
  gender: "",
  goal: "",
  height: "",
  weight: "",
};

const Register = () => {
  const navigate = useNavigate();
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
    SignupAPi(formData, navigate, setIsLoading);
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
                <Label htmlFor="gender">Gender</Label>

                <Select
                  name="gender"
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="bg-zinc-800 text-white border-zinc-700">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="fatloss">FatLoss</SelectItem>
                    <SelectItem value="body recomp"> BodyRecomp</SelectItem>
                    <SelectItem value="muscle gain">MuscleGain</SelectItem>
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
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Register;
