import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import StockMovement from "@/models/StockMovement";
import { movementSchema } from "@/lib/movement-validation";

export async function GET() {
  try {
    await connectDB();

    const movements = await StockMovement.find()
      .populate("product")
      .sort({ createdAt: -1 });

    return NextResponse.json(movements);
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur serveur est survenue.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = movementSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const { product, type, quantity, note } = result.data;

    await connectDB();

    const existingProduct = await Product.findById(product);

    if (!existingProduct) {
      return NextResponse.json(
        {
          error: "Produit introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    if (type === "OUT" && existingProduct.quantity < quantity) {
      return NextResponse.json(
        {
          error: "Stock insuffisant.",
        },
        {
          status: 400,
        }
      );
    }

    if (type === "IN") {
      existingProduct.quantity += quantity;
    } else {
      existingProduct.quantity -= quantity;
    }

    await existingProduct.save();

    const movement = await StockMovement.create({
      product,
      type,
      quantity,
      note,
    });

    const createdMovement = await StockMovement.findById(
      movement._id
    ).populate("product");

    return NextResponse.json(createdMovement, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur serveur est survenue.",
      },
      {
        status: 500,
      }
    );
  }
}