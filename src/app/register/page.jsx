"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Image upload state
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ImgBB তে ছবি আপলোড করার ফাংশন
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error(
        "ImgBB API key পাওয়া যায়নি। .env ফাইলে NEXT_PUBLIC_IMGBB_API_KEY সেট করুন।"
      );
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data?.error?.message || "Image upload failed");
    }

    return data.data.url;
  };

  // ফাইল সিলেক্ট হলে এই হ্যান্ডলার রান হবে
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadError("");

    // সর্বোচ্চ ৩২MB (ImgBB এর লিমিট)
    if (file.size > 32 * 1024 * 1024) {
      setImageUploadError("Image must be smaller than 32MB");
      return;
    }

    // টাইপ চেক
    if (!file.type.startsWith("image/")) {
      setImageUploadError("Please select a valid image file");
      return;
    }

    // Local preview দেখানোর জন্য সাথে সাথে
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await uploadToImgBB(file);
      // আপলোড সফল হলে react-hook-form এ URL সেট করি
      setValue("image", uploadedUrl, { shouldValidate: true });
    } catch (err) {
      console.log("ImgBB upload error:", err);
      setImageUploadError(err.message || "Failed to upload image. Please try again.");
      setImagePreview("");
      setValue("image", "", { shouldValidate: true });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setServerError("");
    setIsLoading(true);
    try {
      const { data: signUpData, error } = await authClient.signUp.email({
        ...data,
      });

      if (error) {
        // Better Auth এ error.message থাকে — এটা ইউজারকে দেখান
        console.log("Sign up error:", error);
        setServerError(error.message || "Something went wrong. Please try again.");
        return;
      }

      console.log("Sign up success:", signUpData);
      // সফলভাবে রেজিস্টার হলে redirect করুন (path অনুযায়ী বদলে নিন)
      router.push("/login");
    } catch (err) {
      // network বা unexpected error
      console.log("Unexpected error:", err);
      setServerError("Unable to reach the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Join RecipeHub to discover delicious recipes, share your cooking
            creations, and connect with food lovers around the world.
          </p>
        </CardHeader>

        <CardBody className="gap-4">
          {/* Server / API error message */}
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
              {serverError}
            </div>
          )}

          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* Full Name */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be at most 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s.'-]+$/,
                    message: "Name can only contain letters, spaces, and . ' -",
                  },
                })}
                id="name"
                placeholder="John Doe"
                labelPlacement="outside"
                startContent={<FaUser className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              {errors.name && (
                <p className="text-red-400 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="email">Email Address</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                  maxLength: {
                    value: 100,
                    message: "Email must be at most 100 characters",
                  },
                })}
                id="email"
                placeholder="john@example.com"
                type="email"
                labelPlacement="outside"
                startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Profile Image Upload (ImgBB) */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="image">Profile Image</Label>

              {/* Hidden field — react-hook-form এর জন্য, এখানে ImgBB থেকে পাওয়া URL জমা থাকবে */}
              <input
                type="hidden"
                {...register("image", {
                  required: "Profile image is required",
                })}
              />

              <div className="flex items-center gap-3 w-full">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
                  />
                )}

                <label
                  htmlFor="imageFile"
                  className="flex-1 cursor-pointer flex items-center gap-2 rounded-lg bg-slate-900/50 border border-white/10 hover:border-pink-500/50 text-slate-400 text-sm px-3 h-10"
                >
                  <FaImage className="text-slate-400 text-sm shrink-0" />
                  {isUploadingImage
                    ? "Uploading..."
                    : imagePreview
                    ? "Change image"
                    : "Choose an image"}
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploadingImage}
                  className="hidden"
                />
              </div>

              {imageUploadError && (
                <p className="text-red-400 text-xs">{imageUploadError}</p>
              )}
              {errors.image && !imageUploadError && (
                <p className="text-red-400 text-xs">{errors.image.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be at most 12 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
                id="password"
                placeholder="••••••••"
                type="password"
                labelPlacement="outside"
                startContent={<FaLock className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              {errors.password && (
                <p className="text-red-400 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor="role"
                className="text-sm font-semibold text-slate-300"
              >
                Select Role
              </Label>
              <select
                id="role"
                defaultValue="normal user"
                {...register("role", { required: "Role is required" })}
                className="w-full rounded-lg bg-slate-900/50 border border-white/10 hover:border-pink-500/50 focus:!border-pink-500 text-white px-3 h-10 outline-none"
              >
                <option value="normalUser">User</option>
                <option value="premiumUser">Premium</option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-xs">{errors.role.message}</p>
              )}
            </div>

            <Button
              type="submit"
              isDisabled={isLoading || isUploadingImage}
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
              radius="lg"
            >
              {isLoading
                ? "Creating Account..."
                : isUploadingImage
                ? "Uploading Image..."
                : "Create Account"}
            </Button>
          </Form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
              Or Sign Up With
            </span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          <Button
            variant="bordered"
            className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
            radius="lg"
            startContent={<FaGoogle className="text-pink-500" />}
            onPress={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            Google OAuth
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
