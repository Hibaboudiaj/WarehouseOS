"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: Category;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();

    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function archiveProduct(id: string) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment archiver ce produit ?"
    );

    if (!confirmed) return;

    await fetch(`/api/products/${id}`, {
      method: "PATCH",
    });

    loadProducts();
  }

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Produits</h1>

        <Link href="/products/create">
          <Button>Ajouter un produit</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p>Aucun produit.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>SKU</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>

                <td>{product.sku}</td>

                <td>{product.category?.name}</td>

                <td>{product.price} MAD</td>

                <td>{product.quantity}</td>

                <td className={styles.actions}>
                  <Link href={`/products/${product._id}`}>
                    Voir
                  </Link>

                  <Link href={`/products/edit/${product._id}`}>
                    Modifier
                  </Link>

                  <button
                    onClick={() => archiveProduct(product._id)}
                    className={styles.archive}
                  >
                    Archiver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}