"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import FormField from "@/components/FormField/FormField";
import styles from "./page.module.css";

interface Category {
  _id: string;
  name: string;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState("");

  const [error, setError] = useState("");

  async function loadCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();

    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const url = editingId
      ? `/api/categories/${editingId}`
      : "/api/categories";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    resetForm();

    loadCategories();
  }

  function resetForm() {
    setEditingId("");
    setName("");
    setDescription("");
  }

  function editCategory(category: Category) {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description);
  }

  async function archiveCategory(id: string) {
    const confirmed = window.confirm(
      "Voulez-vous archiver cette catégorie ?"
    );

    if (!confirmed) return;

    await fetch(`/api/categories/${id}`, {
      method: "PATCH",
    });

    loadCategories();
  }

  return (
    <div className={styles.page}>
      <h1>Catégories</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <FormField
          label="Nom"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormField
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.buttons}>
          <Button type="submit">
            {editingId ? "Modifier" : "Ajouter"}
          </Button>

          {editingId && (
            <Button
              variant="secondary"
              type="button"
              onClick={resetForm}
            >
              Annuler
            </Button>
          )}
        </div>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>

              <td>{category.description}</td>

              <td className={styles.actions}>
                <button
                  className={styles.edit}
                  onClick={() => editCategory(category)}
                >
                  Modifier
                </button>

                <button
                  className={styles.archive}
                  onClick={() => archiveCategory(category._id)}
                >
                  Archiver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}