"use server";

import { AUTH_CONFIG } from "@/configs/auth.config";
import { prisma } from "@/services/prisma.service";
import { Complaint, Correspondance, CorrespondanceType } from "@prisma/client";
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

export async function getCorrespondanceList(): Promise<GetCorrespondanceListResponse> {
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

export type SubmitCorrespondanceResponse =
  | {
      data?: null;
      error: {
        code: "UNAUTHORIZED" | "DATABASE_ERROR";
        message: string;
      };
    }
  | {
      data: Pick<Correspondance, "id">;
      error: null;
    };

export async function submitCorrespondance(
  type: CorrespondanceType,
  content: Record<string & "whatsappContact", string>
): Promise<SubmitCorrespondanceResponse> {
  const session = await getServerSession(AUTH_CONFIG);

  if (!session || !session?.user?.email) {
    return {
      error: {
        code: "UNAUTHORIZED",
        message: "Pengguna belum terautorisasi",
      },
    };
  }

  try {
    const correspondanceQuery = await prisma.correspondance.create({
      select: {
        id: true,
      },
      data: {
        type: type,
        status: "SUBMITTED",
        content: content,
        userEmail: session.user.email,
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

export type GetCorrespondanceDetailResponse =
  | {
      data?: null;
      error: {
        code: "UNAUTHORIZED" | "DATABASE_ERROR";
        message: string;
      };
    }
  | {
      data: Pick<
        Correspondance,
        "id" | "type" | "status" | "content" | "createdAt"
      > | null;
      error: null;
    };

export async function getCorrespondanceDetail(
  id: string
): Promise<GetCorrespondanceDetailResponse> {
  const session = await getServerSession(AUTH_CONFIG);

  if (!session || !session?.user?.email) {
    return {
      error: {
        code: "UNAUTHORIZED",
        message: "Pengguna belum terautorisasi",
      },
    };
  }

  try {
    const correspondanceQuery = await prisma.correspondance.findUnique({
      where: {
        id: id,
        userEmail: session.user.email,
      },
      select: {
        id: true,
        type: true,
        status: true,
        content: true,
        createdAt: true,
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

export type DeleteCorrespondanceResponse =
  | {
      data?: null;
      error: {
        code: "UNAUTHORIZED" | "DATABASE_ERROR";
        message: string;
      };
    }
  | {
      data: Pick<Correspondance, "id">;
      error: null;
    };

export async function deleteCorrespondance(
  id: string
): Promise<DeleteCorrespondanceResponse> {
  const session = await getServerSession(AUTH_CONFIG);

  if (!session || !session?.user?.email) {
    return {
      error: {
        code: "UNAUTHORIZED",
        message: "Pengguna belum terautorisasi",
      },
    };
  }

  try {
    const correspondanceQuery = await prisma.correspondance.update({
      where: {
        id: id,
        userEmail: session.user.email,
      },
      data: {
        status: "CANCELED",
      },
      select: {
        id: true,
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
      data: Pick<Complaint, "id" | "title" | "status" | "createdAt">[];
      error: null;
    };

export async function getComplaintList(): Promise<GetComplaintListResponse> {
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
