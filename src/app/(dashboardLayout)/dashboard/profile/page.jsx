"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Form,
  Input,
} from "@heroui/react";
import toast from "react-hot-toast";

const ProfileForm = ({ session }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      image: "",
      location: "",
      website: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/profile/${session.user.email}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data);

        reset({
          name: data.name || "",
          email: data.email || "",
          image: data.image || "",
          location: data.location || "",
          website: data.website || "",
          bio: data.bio || "",
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    loadProfile();
  }, [session, reset]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/users/profile/${session.user.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setUser(result);
      reset(result);

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <Card className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <CardHeader className="flex flex-col items-start gap-2 border-b border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white">
            Profile Information
          </h2>

          <p className="text-slate-400 text-sm">
            Update your RecipeHub profile information.
          </p>
        </CardHeader>

        <div className="p-6">
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col items-center gap-4">
              <Avatar
                src={watch("image") || user?.image}
                className="w-28 h-28 border-2 border-pink-500"
              />

              <p className="text-xs text-slate-400">
                Live Profile Preview
              </p>
            </div>

            <Input
              {...register("name", {
                required: "Name is required",
              })}
              label="Full Name"
              labelPlacement="outside"
              placeholder="John Doe"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />

            <Input
              {...register("email")}
              label="Email Address"
              labelPlacement="outside"
              isReadOnly
            />

            <Input
              {...register("image")}
              label="Profile Image URL"
              labelPlacement="outside"
              placeholder="https://example.com/avatar.png"
            />
    
                <Input
              {...register("location")}
              label="Location"
              labelPlacement="outside"
              placeholder="Dhaka, Bangladesh"
            />

            <Input
              {...register("website")}
              label="Website"
              labelPlacement="outside"
              placeholder="https://yourwebsite.com"
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-white mb-2">
                Bio
              </label>

              <textarea
                {...register("bio")}
                rows={6}
                placeholder="Tell the RecipeHub community about yourself, your cooking journey, and your favorite recipes..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-slate-900/30 p-4">
                <h3 className="text-white font-semibold mb-1">
                  Display Name
                </h3>

                <p className="text-slate-400 text-sm">
                  {watch("name") || "Your Name"}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/30 p-4">
                <h3 className="text-white font-semibold mb-1">
                  Location
                </h3>

                <p className="text-slate-400 text-sm">
                  {watch("location") || "No location added"}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/30 p-4">
                <h3 className="text-white font-semibold mb-1">
                  Website
                </h3>

                <p className="text-slate-400 text-sm break-all">
                  {watch("website") || "No website added"}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/30 p-4">
                <h3 className="text-white font-semibold mb-1">
                  Bio Preview
                </h3>

                <p className="text-slate-400 text-sm line-clamp-4">
                  {watch("bio") || "No bio yet."}
                </p>
              </div>
            </div>
                <Button
              type="submit"
              isLoading={isLoading}
              radius="lg"
              className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-bold shadow-lg hover:opacity-90 transition"
            >
              {isLoading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ProfileForm;