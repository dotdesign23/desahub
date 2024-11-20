"use client";

import classNames from "classnames";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Swal } from "@/services/swal.service";
import { Gender } from "@/configs/correspondance.config";
import { submitCorrespondance } from "@/app/actions";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

const CorrespondanceSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  nik: z
    .string()
    .length(16, { message: "NIK harus terdiri dari 16 digit" })
    .regex(/^\d+$/, { message: "NIK hanya boleh berisi angka" }),
  gender: z.string().min(1, { message: "Pilih jenis kelamin yang valid" }),
  birthPlace: z.string().min(1, { message: "Tempat lahir tidak boleh kosong" }),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Tanggal lahir harus dalam format YYYY-MM-DD",
    })
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Tanggal lahir tidak valid",
    }),
  address: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
  deathDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Tanggal meninggal harus dalam format YYYY-MM-DD",
    })
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Tanggal meninggal tidak valid",
    }),
  deathTime: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Jam meninggal harus dalam format HH:mm (contoh: 14:30)",
  }),
  deathPlace: z
    .string()
    .min(1, { message: "Tempat meninggal tidak boleh kosong" }),
  causeOfDeath: z
    .string()
    .min(1, { message: "Penyebab kematian tidak boleh kosong" }),
  burialPlace: z
    .string()
    .min(1, { message: "Lokasi pemakaman tidak boleh kosong" }),
  attachmentUrls: z
    .array(z.string().url("Format gambar tidak valid"))
    .nonempty({ message: "Sertakan lampiran" }),
  whatsappContact: z.string().regex(/^\+?\d{10,15}$/, {
    message:
      "Nomor WhatsApp harus berupa angka dengan panjang 10-15 digit, diawali dengan '+' jika perlu",
  }),
});

type CorrespondanceSchemaInputs = z.infer<typeof CorrespondanceSchema>;

const CorrespondanceForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const { control, handleSubmit } = useForm<CorrespondanceSchemaInputs>({
    resolver: zodResolver(CorrespondanceSchema),
    defaultValues: {
      name: "",
      nik: "",
      gender: "",
      birthPlace: "",
      birthDate: "",
      address: "",
      deathDate: "",
      deathTime: "",
      deathPlace: "",
      causeOfDeath: "",
      burialPlace: "",
      attachmentUrls: [],
      whatsappContact: "",
    },
  });

  const onSubmit = async (formData: CorrespondanceSchemaInputs) => {
    try {
      setIsLoading(true);

      const actionRes = await submitCorrespondance(
        "SURAT_KETERANGAN_KEMATIAN",
        formData
      );

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
        <h3 className="portlet-title text-center">Surat Keterangan Kematian</h3>
      </div>
      <div className="portlet-body">
        <form className="vstack gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan Nama"
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
            name="nik"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan NIK"
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
            name="gender"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <select
                  {...field}
                  className={classNames("form-select", {
                    "is-invalid": invalid,
                  })}
                >
                  <option value="" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  {Object.values(Gender).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {invalid && (
                  <span className="invalid-feedback">{error?.message}</span>
                )}
              </div>
            )}
          />
          <div className="vstack gap-2">
            <label className="form-text m-0">Tempat & tanggal lahir</label>
            <div className="hstack align-items-start gap-2">
              <Controller
                name="birthPlace"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <div className="w-100">
                    <input
                      {...field}
                      type="text"
                      placeholder="Tempat Lahir"
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
                name="birthDate"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <div className="w-100">
                    <input
                      {...field}
                      type="date"
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
            </div>
          </div>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <textarea
                  {...field}
                  rows={5}
                  placeholder="Masukkan Alamat Tempat Tinggal"
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
          <hr className="m-0" />
          <div className="vstack gap-2">
            <label className="form-text m-0">Waktu meninggal</label>
            <div className="hstack align-items-start gap-2">
              <Controller
                name="deathDate"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <div className="w-100">
                    <input
                      {...field}
                      type="date"
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
                name="deathTime"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <div className="w-100">
                    <input
                      {...field}
                      type="time"
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
            </div>
          </div>
          <Controller
            name="deathPlace"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan Tempat Meninggal"
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
            name="causeOfDeath"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan Penyebab Kematian"
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
            name="burialPlace"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan Lokasi Pemakaman"
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
            name="attachmentUrls"
            control={control}
            render={({
              field: { value, onChange, disabled },
              fieldState: { invalid, error },
            }) => (
              <div className="w-100">
                <label className="form-label">Lampiran</label>
                <ImageUpload
                  multiple
                  storagePath="correspondance_imgs"
                  acceptType={["jpg", "gif", "png"]}
                  allowNonImageType={false}
                  inputProps={{ disabled }}
                  images={
                    value
                      ? value.map((dataValue) => ({ dataURL: dataValue }))
                      : []
                  }
                  setImages={(images) => {
                    onChange(
                      images.length > 0
                        ? images.map((image) => image.dataURL)
                        : []
                    );
                  }}
                />
                {invalid ? (
                  <p className="form-text text-danger mt-2 mb-0">
                    {error?.message}
                  </p>
                ) : null}
                <p className="form-text mt-2 mb-0">
                  Silahkan lampirkan
                  <ul>
                    <li>KTP yang meninggal</li>
                    <li>KK yang meninggal</li>
                    <li>
                      Surat keterangan kematian dari dokter, rumah sakit, atau
                      kepolisian
                    </li>
                  </ul>
                </p>
              </div>
            )}
          />
          <hr className="m-0" />
          <Controller
            name="whatsappContact"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="w-100">
                <input
                  {...field}
                  type="text"
                  placeholder="Masukkan Nomor WhatsApp"
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

export default CorrespondanceForm;
