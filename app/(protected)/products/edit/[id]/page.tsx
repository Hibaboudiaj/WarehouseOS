"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField/FormField";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

interface Category {
  _id: string;
  name: string;
}

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
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
    async function loadData() {
      const productRes = await fetch(`/api/products/${params.id}`);
      const product = await productRes.json();

      const categoryRes = await fetch("/api/categories");
      const categories = await categoryRes.json();

      setCategories(categories);

      setName(product.name);
      setSku(product.sku);
      setDescription(product.description);
      setCategory(product.category._id);
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
    }

    loadData();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
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
      <h1>Modifier un produit</h1>

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
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <FormField
          label="Prix"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <FormField
          label="Quantité"
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Button type="submit">
          Enregistrer
        </Button>
      </form>
    </div>
  );
}