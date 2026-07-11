"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";

export default function DismissReportButton({ id }) {
  const router = useRouter();

  const handleDismiss = async () => {
    const result = await Swal.fire({
      title: "Dismiss Report?",
      text: "This report will be marked as dismissed.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Dismiss",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        router.refresh();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Button
      color="success"
      variant="flat"
      startContent={<FaCheckCircle />}
      onPress={handleDismiss}
    >
      Dismiss
    </Button>
  );
}