import Link from "next/link";
import AuthCard from "@/components/AuthCard/AuthCard";
import FormField from "@/components/FormField/FormField";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function LoginPage() {
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
      <form className={styles.form}>
        <FormField
          label="Adresse email"
          type="email"
          name="email"
          placeholder="vous@entrepot.com"
        />
        <FormField
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="••••••••"
        />
        <Button type="submit" fullWidth>
          Se connecter
        </Button>
      </form>
    </AuthCard>
  );
}