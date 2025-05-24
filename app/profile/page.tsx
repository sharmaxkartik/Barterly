"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "example@example.com",
    phone: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    skills: [] as string[],
    skillsWanted: [] as string[],
  });

  // Replace the single newSkill state with two separate states
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Initialize profile with searchParams if no saved data exists
      setProfile({
        firstName: searchParams.get("firstName") || "John",
        lastName: searchParams.get("lastName") || "Doe",
        email: searchParams.get("email") || "example@example.com",
        phone: searchParams.get("phone") || "",
        bio: searchParams.get("bio") || "",
        address: searchParams.get("address") || "",
        city: searchParams.get("city") || "",
        state: searchParams.get("state") || "",
        zipCode: searchParams.get("zipCode") || "",
        country: searchParams.get("country") || "",
        skills: [],
        skillsWanted: [],
      });
    }
  }, [searchParams]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the updated profile to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleAddSkill = (type: "skills" | "skillsWanted") => {
    const skillValue = type === "skills" ? newOfferedSkill : newWantedSkill;
    if (skillValue.trim()) {
      setProfile((prev) => ({
        ...prev,
        [type]: [...prev[type], skillValue.trim()],
      }));
      // Reset the correct state
      if (type === "skills") {
        setNewOfferedSkill("");
      } else {
        setNewWantedSkill("");
      }
    }
  };

  const handleRemoveSkill = (
    type: "skills" | "skillsWanted",
    skill: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      [type]: prev[type].filter((s) => s !== skill),
    }));
  };

  return isClient ? (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="relative pt-6 pb-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarFallback>
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{`${profile.firstName} ${profile.lastName}`}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Skills I Offer
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.length > 0 ? (
                      profile.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-purple-500/10 text-purple-500"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No skills added yet
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Skills I Want
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsWanted?.length > 0 ? (
                      profile.skillsWanted.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-500"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No wanted skills added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                {isEditing
                  ? "Edit your profile information"
                  : "View your profile information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      placeholder="Write a short bio"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <Input
                      id="city"
                      name="city"
                      value={profile.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <Input
                      id="state"
                      name="state"
                      value={profile.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Zip Code
                    </label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={profile.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter your zip code"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <Input
                      id="country"
                      name="country"
                      value={profile.country}
                      onChange={handleInputChange}
                      placeholder="Enter your country"
                    />
                  </div>

                  {/* Skills I Offer section */}
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills I Offer
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profile.skills?.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-purple-500/10 text-purple-500 flex items-center gap-1"
                        >
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleRemoveSkill("skills", skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="new-skill"
                        value={newOfferedSkill}
                        onChange={(e) => setNewOfferedSkill(e.target.value)}
                        placeholder="Add a skill you can offer"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleAddSkill("skills")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Skills I Want section */}
                  <div>
                    <label
                      htmlFor="skillsWanted"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills I Want
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profile.skillsWanted?.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-500 flex items-center gap-1"
                        >
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() =>
                              handleRemoveSkill("skillsWanted", skill)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="new-skill-wanted"
                        value={newWantedSkill}
                        onChange={(e) => setNewWantedSkill(e.target.value)}
                        placeholder="Add a skill you want to learn"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleAddSkill("skillsWanted")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p>
                      <strong>First Name:</strong> {profile.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {profile.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {profile.phone || "Not provided"}
                    </p>
                    <p>
                      <strong>Bio:</strong> {profile.bio || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>Skills I Offer:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.skills?.length > 0 ? (
                        profile.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-purple-500/10 text-purple-500"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          None specified
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p>
                      <strong>Skills I'm Looking For:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.skillsWanted?.length > 0 ? (
                        profile.skillsWanted.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-500"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          None specified
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p>
                      <strong>Address:</strong>{" "}
                      {profile.address || "Not provided"}
                    </p>
                    <p>
                      <strong>City:</strong> {profile.city || "Not provided"}
                    </p>
                    <p>
                      <strong>State:</strong> {profile.state || "Not provided"}
                    </p>
                    <p>
                      <strong>Zip Code:</strong>{" "}
                      {profile.zipCode || "Not provided"}
                    </p>
                    <p>
                      <strong>Country:</strong>{" "}
                      {profile.country || "Not provided"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {isEditing ? (
                <div className="flex space-x-4">
                  <Button onClick={handleSave}>Save</Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <p>Loading profile...</p>
    </div>
  );
}
