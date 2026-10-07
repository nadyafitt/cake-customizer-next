import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customerName,
      phone,
      flavor,
      frosting,
      size,
      topping,
      message,
      totalPrice,
    } = body;

    if (
      !customerName ||
      !phone ||
      !flavor ||
      !frosting ||
      !size ||
      !topping ||
      totalPrice === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        flavor,
        frosting,
        size,
        topping,
        message: message || null,
        totalPrice: Number(totalPrice),
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 }
    );
  }
}