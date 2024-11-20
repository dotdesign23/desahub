import { CorrespondanceType } from "@prisma/client";

export interface CorrespondanceDetails {
  abbr: string;
  title: string;
  description: string;
}

export const CORRESPONDANCE_CONFIG: Record<
  CorrespondanceType,
  CorrespondanceDetails
> = {
  SURAT_KETERANGAN_DOMISILI: {
    abbr: "SKD",
    title: "Surat Keterangan Domisili",
    description:
      "Surat yang digunakan untuk menyatakan tempat tinggal seseorang.",
  },
  SURAT_KETERANGAN_TIDAK_MAMPU: {
    abbr: "SKTM",
    title: "Surat Keterangan Tidak Mampu",
    description:
      "Surat yang digunakan untuk menyatakan bahwa seseorang tidak mampu secara ekonomi.",
  },
  SURAT_KETERANGAN_KEMATIAN: {
    abbr: "SKK",
    title: "Surat Keterangan Kematian",
    description:
      "Surat yang digunakan untuk menyatakan bahwa seseorang telah meninggal dunia.",
  },
  SURAT_KETERANGAN_USAHA: {
    abbr: "SKU",
    title: "Surat Keterangan Usaha",
    description:
      "Surat yang digunakan untuk menyatakan bahwa seseorang memiliki usaha tertentu.",
  },
};

export enum Gender {
  Male = "Laki-Laki",
  Female = "Perempuan",
}

export enum MaritalStatus {
  Single = "Belum Kawin",
  Married = "Kawin",
  DivorcedAlive = "Cerai Hidup",
  DivorcedDeceased = "Cerai Mati",
}

export enum Religion {
  Islam = "Islam",
  Christianity = "Kristen",
  Catholicism = "Katolik",
  Hinduism = "Hindu",
  Buddhism = "Buddha",
  Confucianism = "Konghucu",
}
