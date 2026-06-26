"use client";

import {
  Button,
  Card,
  CardHeader,
  Form,
  Input,
  textArea,
} from "@heroui/react";

const ProfileForm = () => {
  return (
    <div className="mt-6 max-w-3xl">
      <Card
        radius="lg"
        className="bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl"
      >
        <CardHeader className="flex flex-col items-start gap-1 border-b border-white/10 p-6">
          <h2 className="text-2xl font-bold text-white">
            Profile Information
          </h2>
          <p className="text-sm text-slate-400">
            Update your personal information for your RecipeHub profile.
          </p>
        </CardHeader>

        <div className="p-6">
          <Form className="space-y-5 w-full">
            <Input
              label="Full Name"
              labelPlacement="outside"
              placeholder="Enter your full name"
              variant="bordered"
              radius="lg"
              isRequired
              classNames={{
                inputWrapper:
                  "bg-slate-900 border border-white/10 hover:border-pink-500 focus-within:border-pink-500",
              }}
            />

            <Input
              label="Email Address"
              labelPlacement="outside"
              placeholder="john@example.com"
              variant="bordered"
              radius="lg"
              isReadOnly
              classNames={{
                inputWrapper:
                  "bg-slate-900 border border-white/10 cursor-not-allowed",
              }}
            />

            <Input
              label="Profile Photo URL"
              labelPlacement="outside"
              placeholder="https://example.com/profile.jpg"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper:
                  "bg-slate-900 border border-white/10 hover:border-pink-500 focus-within:border-pink-500",
              }}
            />

            <Input
              label="Location"
              labelPlacement="outside"
              placeholder="Dhaka, Bangladesh"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper:
                  "bg-slate-900 border border-white/10 hover:border-pink-500 focus-within:border-pink-500",
              }}
            />

            <Input
              label="Personal Website"
              labelPlacement="outside"
              placeholder="https://yourwebsite.com"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper:
                  "bg-slate-900 border border-white/10 hover:border-pink-500 focus-within:border-pink-500",
              }}
            />

            <textArea
              label="Bio"
              labelPlacement="outside"
              placeholder="Tell the RecipeHub community about yourself, your cooking journey, and your favorite recipes..."
              variant="bordered"
              radius="lg"
              minRows={5}
              classNames={{
                inputWrapper:
                  "bg-slate-900 border border-white/10 hover:border-pink-500 focus-within:border-pink-500",
              }}
            />

            <div className="pt-2">
              <Button
                type="submit"
                radius="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-semibold h-11 px-8 shadow-lg hover:opacity-90 transition"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ProfileForm;