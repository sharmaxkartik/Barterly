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

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);

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
  });

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
      });
    }
  }, [searchParams]);

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

  return (
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
                </form>
              ) : (
                <div className="space-y-2">
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
  );
}
