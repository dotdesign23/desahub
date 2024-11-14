"use server";

import { AUTH_CONFIG } from "@/configs/auth.config";
import { prisma } from "@/services/prisma.service";
import { Correspondance } from "@prisma/client";
import { getServerSession } from "next-auth";

export type GetCorrespondanceListResponse =
  | {
      data?: null;
      error: {
        code: "UNAUTHORIZED" | "DATABASE_ERROR";
        message: string;
      };
    }
  | {
      data: Correspondance[];
      error: null;
    };

export async function getCorrespondanceList() {
  const session = await getServerSession(AUTH_CONFIG);

  if (!session || !session?.user) {
    return {
      error: {
        code: "UNAUTHORIZED",
        message: "Pengguna belum terautorisasi",
      },
    };
  }

  try {
    const correspondanceQuery = await prisma.correspondance.findMany({
      select: {
        key: true,
        type: true,
        createdAt: true,
      },
      where: {
        userEmail: session.user.email ?? "",
      },
    });

    return {
      error: null,
      data: correspondanceQuery,
    };
  } catch (e: unknown) {
    console.error(e);

    return {
      error: {
        code: "DATABASE_ERROR",
        message: "Terjadi kesalahan pada database",
      },
    };
  }
}
