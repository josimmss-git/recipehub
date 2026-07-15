"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MarkReviewedButton({ id, className = "" }) {
  const router = useRouter();

  const handleDismiss = async () => {
    const result = await Swal.fire({
      title: "Dismiss Report?",
      text: "This report will be marked as dismissed. The recipe will stay.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Dismiss",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/reports/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Dismissed!",
        text: "Report has been dismissed successfully.",
        icon: "success",
        timer: 2000,
      });
      router.refresh();
    } else {
      Swal.fire("Error", data.message || "Something went wrong", "error");
    }
  };

  return (
    <button
      onClick={handleDismiss}
      className={`btn btn-sm btn-ghost border border-base-300 hover:bg-base-200 ${className}`}
    >
      Dismiss
    </button>
  );
}