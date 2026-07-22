import Link from "next/link";
import AuthCard from "@/components/AuthCard/AuthCard";
import FormField from "@/components/FormField/FormField";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function RegisterPage() {
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
      <form className={styles.form}>
        <FormField
          label="Nom complet"
          type="text"
          name="name"
          placeholder="Jean Dupont"
          hint="Minimum 3 caractères."
        />
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
          hint="Minimum 8 caractères."
        />
        <FormField
          label="Confirmation du mot de passe"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
        />
        <Button type="submit" fullWidth>
          Créer mon compte
        </Button>
      </form>
    </AuthCard>
  );
}