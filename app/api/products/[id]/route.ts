import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { productSchema } from "@/lib/product-validation";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).populate("category");

    if (!product) {
      return NextResponse.json(
        {
          error: "Produit introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product);
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

export async function PUT(
  request: Request,
  { params }: Params
) {
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

    const existingSku = await Product.findOne({
      sku,
      _id: { $ne: params.id },
    });

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

    const product = await Product.findByIdAndUpdate(
      params.id,
      {
        name,
        sku,
        description,
        category,
        price,
        quantity,
      },
      {
        new: true,
      }
    ).populate("category");

    if (!product) {
      return NextResponse.json(
        {
          error: "Produit introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product);
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

export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const product = await Product.findByIdAndUpdate(
      params.id,
      {
        archived: true,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        {
          error: "Produit introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "Produit archivé avec succès.",
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