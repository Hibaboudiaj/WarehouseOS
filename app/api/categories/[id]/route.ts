import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { categorySchema } from "@/lib/category-validation";

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

    const category = await Category.findById(params.id);

    if (!category) {
      return NextResponse.json(
        {
          error: "Catégorie introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(category);
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

    const result = categorySchema.safeParse(body);

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

    await connectDB();

    const existingCategory = await Category.findOne({
      name: result.data.name,
      _id: { $ne: params.id },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          error: "Cette catégorie existe déjà.",
        },
        {
          status: 409,
        }
      );
    }

    const category = await Category.findByIdAndUpdate(
      params.id,
      result.data,
      {
        new: true,
      }
    );

    if (!category) {
      return NextResponse.json(
        {
          error: "Catégorie introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(category);
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

    const category = await Category.findByIdAndUpdate(
      params.id,
      {
        archived: true,
      },
      {
        new: true,
      }
    );

    if (!category) {
      return NextResponse.json(
        {
          error: "Catégorie introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "Catégorie archivée avec succès.",
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