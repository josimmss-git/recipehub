"use client";

import { useState } from "react";

export default function ProfileForm({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name,
        image,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Profile updated successfully.");
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Profile Image</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>

        <input
          type="email"
          className="input input-bordered w-full"
          value={user.email}
          readOnly
        />
      </div>

      <button className="btn btn-primary">
        Update Profile
      </button>

    </form>
  );
}