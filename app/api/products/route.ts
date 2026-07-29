import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { productSchema } from "@/lib/product-validation";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      archived: false,
    })
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
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

    const result = productSchema.safeParse(body);

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

    const {
      name,
      sku,
      description,
      category,
      price,
      quantity,
    } = result.data;

    await connectDB();

    const existingSku = await Product.findOne({ sku });

    if (existingSku) {
      return NextResponse.json(
        {
          error: "Cette référence (SKU) existe déjà.",
        },
        {
          status: 409,
        }
      );
    }

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return NextResponse.json(
        {
          error: "Catégorie introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    const product = await Product.create({
      name,
      sku,
      description,
      category,
      price,
      quantity,
    });

    const createdProduct = await Product.findById(product._id).populate(
      "category"
    );

    return NextResponse.json(createdProduct, {
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