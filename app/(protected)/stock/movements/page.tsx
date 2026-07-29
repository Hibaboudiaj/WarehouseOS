"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

interface Product {
  _id: string;
  name: string;
}

interface Movement {
  _id: string;
  type: "IN" | "OUT";
  quantity: number;
  note: string;
  createdAt: string;
  product: Product;
}

export default function StockMovementsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);

  const [product, setProduct] = useState("");
  const [type, setType] = useState<"IN" | "OUT">("IN");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function loadMovements() {
    const res = await fetch("/api/stock/movements");
    const data = await res.json();
    setMovements(data);
  }

  useEffect(() => {
    loadProducts();
    loadMovements();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const res = await fetch("/api/stock/movements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
        type,
        quantity: Number(quantity),
        note,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setProduct("");
    setQuantity("");
    setNote("");
    setType("IN");

    loadProducts();
    loadMovements();
  }

  const filteredMovements = filter
    ? movements.filter((m) => m.product._id === filter)
    : movements;

  return (
    <div className={styles.page}>
      <h1>Mouvements de stock</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className={styles.select}
        >
          <option value="">Choisir un produit</option>

          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as "IN" | "OUT")}
          className={styles.select}
        >
          <option value="IN">Entrée</option>
          <option value="OUT">Sortie</option>
        </select>

        <input
          type="number"
          placeholder="Quantité"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Note (optionnelle)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={styles.input}
        />

        <Button type="submit">
          Enregistrer
        </Button>
      </form>

      <div className={styles.filter}>
        <label>Filtrer par produit</label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.select}
        >
          <option value="">Tous les produits</option>

          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Type</th>
            <th>Quantité</th>
            <th>Date</th>
            <th>Note</th>
          </tr>
        </thead>

        <tbody>
          {filteredMovements.map((movement) => (
            <tr key={movement._id}>
              <td>{movement.product.name}</td>

              <td>
                {movement.type === "IN" ? "Entrée" : "Sortie"}
              </td>

              <td>{movement.quantity}</td>

              <td>
                {new Date(movement.createdAt).toLocaleDateString("fr-FR")}
              </td>

              <td>{movement.note || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}