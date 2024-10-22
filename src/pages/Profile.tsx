"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

type UserData = {
  username: string;
  email: string;
  password: string;
  age: number;
  mobile: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  Userexcercise: any[];
  routine: any[];
};

export default function Profile() {
  const userDataFromStore = useSelector(
    (state: any) => state.auth.user
  ) as UserData; // Fetch user data from the Redux store

  const [userData, setUserData] = useState<UserData>(userDataFromStore);
  //const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log("Updated user data:", userData);
  };

  return userData ? (
    <div className="min-h-screen bg-zinc-900 text-white p-4 mb-12">
      <Card className="max-w-2xl mx-auto bg-zinc-800 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="/placeholder.svg?height=64&width=64"
              alt={userData.username}
            />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="view" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">View Profile</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="view">
              <dl className="space-y-4 mt-4">
                <div>
                  <dt className="text-sm font-medium text-zinc-400">
                    Username
                  </dt>
                  <dd className="text-lg">{userData.username}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-400">Email</dt>
                  <dd className="text-lg">{userData.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-400">Age</dt>
                  <dd className="text-lg">{userData.age}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-400">Gender</dt>
                  <dd className="text-lg">
                    {userData.gender === "M"
                      ? "Male"
                      : userData.gender === "F"
                      ? "Female"
                      : "Other"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-400">Height</dt>
                  <dd className="text-lg">{userData.height} Cm</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-400">Weight</dt>
                  <dd className="text-lg">{userData.weight} Kg</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-400">Goal</dt>
                  <dd className="text-lg capitalize">{userData.goal}</dd>
                </div>
              </dl>
            </TabsContent>
            <TabsContent value="edit">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="bg-zinc-700 text-white border-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="bg-zinc-700 text-white border-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={userData.age}
                    onChange={handleInputChange}
                    className="bg-zinc-700 text-white border-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    value={userData.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                  >
                    <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="O">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    name="height"
                    value={userData.height}
                    onChange={handleInputChange}
                    className="bg-zinc-700 text-white border-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={userData.weight}
                    onChange={handleInputChange}
                    className="bg-zinc-700 text-white border-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <Select
                    name="goal"
                    value={userData.goal}
                    onValueChange={(value) => handleSelectChange("goal", value)}
                  >
                    <SelectTrigger className="bg-zinc-700 text-white border-zinc-600">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                      <SelectItem value="general fitness">
                        General Fitness
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="w-screen h-full bg-zinc-900"></div>
  );
}
