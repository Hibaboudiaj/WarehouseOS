import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import StockMovement from "@/models/StockMovement";

export async function GET() {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments({
      archived: false,
    });

    const totalCategories = await Category.countDocuments({
      archived: false,
    });

    const lowStockProducts = await Product.countDocuments({
      archived: false,
      quantity: { $lte: 5 },
    });

    const recentMovements = await StockMovement.find()
      .populate("product")
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      totalProducts,
      totalCategories,
      lowStockProducts,
      recentMovements,
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