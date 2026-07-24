"use client";

import { Button } from "@heroui/react";
import Swal from "sweetalert2";

export default function ReportRecipeButton({ recipeId }) {
  const reportRecipe = async () => {
    const { value: reason } = await Swal.fire({
      title: "Report Recipe",
      input: "select",
      inputOptions: {
        Spam: "Spam",
        "Offensive Content": "Offensive Content",
        "Copyright Issue": "Copyright Issue",
      },
      inputPlaceholder: "Select reason",
      showCancelButton: true,
    });

    if (!reason) return;

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId,
        reason,
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success", data.message, "success");
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  return (
    <button
      color="cyan"
      radius="full"
      className="px-8 shadow-lg shadow-cyan/30 hover:scale-105 transition-transform outline-2 outline-cyan/50
      rounded-full text-white font-semibold py-2 bg-cyan"
      onPress={reportRecipe}>
      Report Recipe
    </button>
  );
}