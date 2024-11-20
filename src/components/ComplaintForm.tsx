"use client";

import classNames from "classnames";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Swal } from "@/services/swal.service";
import { submitComplaint } from "@/app/actions";
import { useRouter } from "next/navigation";

const ComplaintSchema = z.object({
  title: z.string().min(1, { message: "Judul tidak boleh kosong" }),
  content: z.string().min(1, { message: "Konten tidak boleh kosong" }),
});

type ComplaintSchemaInputs = z.infer<typeof ComplaintSchema>;

const ComplaintForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const { control, handleSubmit } = useForm<ComplaintSchemaInputs>({
    resolver: zodResolver(ComplaintSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (formData: ComplaintSchemaInputs) => {
    try {
      setIsLoading(true);

      const actionRes = await submitComplaint(formData.title, formData.content);

      if (actionRes.error)
        return Swal.fire(
          actionRes.error.code,
          actionRes.error.message,
          "error"
        );

      router.push("/dashboard");
    } catch (e: unknown) {
      console.error(e);
      Swal.fire(
        "FETCH_ERROR",
        "Terjadi kesalahan saat melakukan pengambilan data",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="portlet">
      <div className="portlet-header">
        <h3 className="portlet-title text-center">Buat Pengaduan</h3>
      </div>
      <div className="portlet-body">
        <form className="vstack gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan Judul Pengaduan"
                  className={classNames("form-control", {
                    "is-invalid": invalid,
                  })}
                />
                {invalid && (
                  <span className="invalid-feedback">{error?.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <textarea
                  {...field}
                  rows={5}
                  placeholder="Masukkan Konten Pengaduan"
                  className={classNames("form-control", {
                    "is-invalid": invalid,
                  })}
                />
                {invalid && (
                  <span className="invalid-feedback">{error?.message}</span>
                )}
              </div>
            )}
          />
          <button
            type="submit"
            className="btn btn-primary rounded-pill w-100"
            disabled={isLoading}
          >
            Ajukan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
