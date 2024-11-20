"use client";

import { deleteCorrespondance } from "@/app/actions";
import { useState } from "react";
import { Swal } from "@/services/swal.service";
import { useRouter } from "next/navigation";

export interface CorrespondanceCancelFormProps {
  correspondanceId: string;
}

const CorrespondanceCancelForm: React.FC<CorrespondanceCancelFormProps> = ({
  correspondanceId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const confirmResult = await Swal.fire({
        title: "Konfirmasi",
        html: "Yakin ingin membatalkan surat ini",
        icon: "error",
        showCancelButton: true,
      });

      if (!confirmResult.isConfirmed) return null;

      const actionRes = await deleteCorrespondance(correspondanceId);

      if (actionRes.error)
        return Swal.fire(
          actionRes.error.code,
          actionRes.error.message,
          "error"
        );

      router.push("/dashboard");
    } catch (e: unknown) {
      console.error(e);
      Swal.fire("FETCH_ERROR", "Terjadi kesalahan", "error");
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn btn-subtle-danger rounded-pill w-100"
      disabled={isLoading}
      onClick={handleDelete}
    >
      Batalkan
    </button>
  );
};

export default CorrespondanceCancelForm;
