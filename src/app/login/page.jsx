"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";

import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
    setIsLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const { data: signInData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.log("Sign in error:", error);
        const message = error.message || "Invalid email or password";
        setServerError(message);
        toast.error(message, { id: toastId });
        return;
      }

      console.log("Sign in success:", signInData);
      toast.success("Login successful 🎉", { id: toastId });
      router.push("/");
    } catch (err) {
      console.log("Unexpected error:", err);
      setServerError("Unable to reach the server. Please try again.");
      toast.error("Unable to reach the server. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />

          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="text-slate-400 text-sm mt-1 max-w-sm">
            Sign in to RecipeHub and continue exploring delicious recipes.
          </p>
        </CardHeader>

        <CardBody className="gap-4">
          {/* Server error message */}
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
              {serverError}
            </div>
          )}

          <Form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="w-full">
              <Label htmlFor="email">Email Address</Label>

              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
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
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password</Label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-pink-500 hover:text-pink-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                placeholder="••••••••"
                type="password"
                labelPlacement="outside"
                startContent={<FaLock className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12"
              radius="lg"
            >
              {isLoading ? "Logging in..." : "Login to RecipeHub"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 uppercase">
              Or Continue With
            </span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          {/* Google Login */}
          <Button
            variant="bordered"
            className="w-full border-white/10 text-white font-semibold h-11"
            radius="lg"
            startContent={<FaGoogle className="text-pink-500" />}
            onPress={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            Continue with Google
          </Button>

          {/* Register */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-pink-500 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
