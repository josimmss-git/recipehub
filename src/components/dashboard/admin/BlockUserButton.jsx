"use client";

import { useRouter } from "next/navigation";
import { FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function BlockUserButton({ id }) {
  const router = useRouter();

  const handleBlock = async () => {
    const result = await Swal.fire({
      title: "Block User?",
      text: "This user won't be able to use the platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Block",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/users/${id}/block`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "User Blocked",
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
    <button
      onClick={handleBlock}
      className="btn btn-warning btn-sm"
    >
      <FaUserSlash />
      Block
    </button>
  );
}