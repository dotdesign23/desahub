"use server";

import { AUTH_CONFIG } from "@/configs/auth.config";
import { prisma } from "@/services/prisma.service";
import { Complaint, Correspondance } from "@prisma/client";
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
      data: Pick<Correspondance, "id" | "type" | "status" | "createdAt">[];
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
        id: true,
        type: true,
        status: true,
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

export type GetComplaintListResponse =
  | {
      data?: null;
      error: {
        code: "UNAUTHORIZED" | "DATABASE_ERROR";
        message: string;
      };
    }
  | {
      data: Pick<
        Complaint,
        "id" | "title" | "status" | "createdAt"
      >[];
      error: null;
    };

export async function getComplaintList() {
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
    const complainQuery = await prisma.complaint.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
      where: {
        userEmail: session.user.email ?? "",
      },
    });

    return {
      error: null,
      data: complainQuery,
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
