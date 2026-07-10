"use client";

import { Button } from "@heroui/react";
import Swal from "sweetalert2";

export default function ReportRecipeButton({
  recipeId,
  recipeTitle,
}) {
  const handleReport = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Report Recipe",
      html: `
        <select id="reason" class="swal2-input">
          <option value="Spam">Spam</option>
          <option value="Fake Recipe">Fake Recipe</option>
          <option value="Offensive">Offensive</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          id="message"
          class="swal2-textarea"
          placeholder="Describe the issue..."
        ></textarea>
      `,
      showCancelButton: true,
      preConfirm: () => ({
        reason: document.getElementById("reason").value,
        message: document.getElementById("message").value,
      }),
    });

    if (!formValues) return;

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId,
        recipeTitle,
        reason: formValues.reason,
        message: formValues.message,
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success", "Report submitted.", "success");
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  return (
    <Button
    
      color="danger"
      radius="full"
      variant="outline"
      onClick={handleReport} className="hover:scale-105 transition-transform">
      Report Recipe
    </Button>
  );
}