"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

interface Movement {
  _id: string;
  type: "IN" | "OUT";
  quantity: number;
  createdAt: string;
  product: {
    name: string;
  };
}

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  lowStock: number;
  recentMovements: Movement[];
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setDashboard(data);
    }

    loadDashboard();
  }, []);

  if (!dashboard) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Tableau de bord</h1>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Produits</h3>
          <span>{dashboard.totalProducts}</span>
        </div>

        <div className={styles.card}>
          <h3>Catégories</h3>
          <span>{dashboard.totalCategories}</span>
        </div>

        <div className={styles.card}>
          <h3>Stock faible</h3>
          <span>{dashboard.lowStock}</span>
        </div>

        <div className={styles.card}>
          <h3>Mouvements</h3>
          <span>{dashboard.recentMovements.length}</span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Derniers mouvements</h2>

          <Link href="/stock/movements">
            Voir tout →
          </Link>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Type</th>
              <th>Quantité</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentMovements.map((movement) => (
              <tr key={movement._id}>
                <td>{movement.product.name}</td>

                <td>
                  {movement.type === "IN"
                    ? "Entrée"
                    : "Sortie"}
                </td>

                <td>{movement.quantity}</td>

                <td>
                  {new Date(
                    movement.createdAt
                  ).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}