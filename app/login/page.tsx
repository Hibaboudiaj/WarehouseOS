"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard/AuthCard";
import FormField from "@/components/FormField/FormField";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <AuthCard
      eyebrow="Accès · Connexion"
      title="Connexion"
      subtitle="Identifiez-vous pour accéder à votre espace WarehouseOS."
      code="WH-OS / LOGIN-01"
      footer={
        <p className={styles.switchLine}>
          Pas encore de compte ?{" "}
          <Link href="/register" className={styles.switchLink}>
            Créer un compte
          </Link>
        </p>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth>
          Se connecter
        </Button>
      </form>
    </AuthCard>
  );
}