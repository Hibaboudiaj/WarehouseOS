"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import FormField from "@/components/FormField/FormField";
import styles from "./page.module.css";

interface Category {
  _id: string;
  name: string;
}

export default function CreateProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        sku,
        description,
        category,
        price: Number(price),
        quantity: Number(quantity),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/products");
  }

  return (
    <div className={styles.page}>
      <h1>Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <FormField
          label="Nom"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormField
          label="SKU"
          name="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />

        <FormField
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.field}>
          <label>Catégorie</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">Choisir...</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <FormField
          label="Prix"
          name="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <FormField
          label="Quantité"
          name="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Button type="submit">
          Ajouter
        </Button>
      </form>
    </div>
  );
}