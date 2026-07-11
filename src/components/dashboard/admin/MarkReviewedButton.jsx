"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MarkReviewedButton({ id }) {
  const router = useRouter();

  const handleReview = async () => {
    const result = await Swal.fire({
      title: "Mark as Reviewed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/reports/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success!", "Report marked as reviewed.", "success");
      router.refresh();
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  return (
    <button
      onClick={handleReview}
      className="btn btn-sm btn-success"
    >
      Reviewed
    </button>
  );
}