import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { categorySchema } from "@/lib/category-validation";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({
      archived: false,
    }).sort({ createdAt: -1 });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
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

    const result = categorySchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0].message;

      return NextResponse.json(
        {
          error: firstError,
        },
        {
          status: 400,
        }
      );
    }

    const { name, description } = result.data;

    await connectDB();

    const existingCategory = await Category.findOne({
      name,
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

    const category = await Category.create({
      name,
      description,
    });

    return NextResponse.json(category, {
      status: 201,
    });
  } catch (error) {
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