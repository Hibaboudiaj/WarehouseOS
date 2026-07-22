"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard/AuthCard";
import FormField from "@/components/FormField/FormField";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/login");
  }

  return (
    <AuthCard
      eyebrow="Accès · Inscription"
      title="Créer un compte"
      subtitle="Renseignez vos informations pour rejoindre WarehouseOS."
      code="WH-OS / REGISTER-01"
      footer={
        <p className={styles.switchLine}>
          Déjà un compte ?{" "}
          <Link href="/login" className={styles.switchLink}>
            Se connecter
          </Link>
        </p>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <FormField
          label="Nom complet"
          type="text"
          name="name"
          placeholder="Jean Dupont"
          hint="Minimum 3 caractères."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormField
          label="Adresse email"
          type="email"
          name="email"
          placeholder="vous@entrepot.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="••••••••"
          hint="Minimum 8 caractères."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormField
          label="Confirmation du mot de passe"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" fullWidth>
          Créer mon compte
        </Button>
      </form>
    </AuthCard>
  );
}