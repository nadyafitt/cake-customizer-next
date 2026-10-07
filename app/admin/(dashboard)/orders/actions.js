"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth();

  if (
    !session?.user ||
    session.user.role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }
}

export async function updateOrderStatus(formData) {
  await checkAdmin();

  const id = Number(formData.get("id"));
  const status = formData.get("status");

  await prisma.order.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
}

export async function deleteOrder(formData) {
  await checkAdmin();

  const id = Number(formData.get("id"));

  await prisma.order.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/orders");
}