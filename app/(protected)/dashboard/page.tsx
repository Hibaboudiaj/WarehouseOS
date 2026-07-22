import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import Button from "@/components/Button/Button";
import ManifestRow from "@/components/ManifestRow/ManifestRow";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name ?? "";
  const userEmail = session?.user?.email ?? "";
  const userId = (session?.user as any)?.id ?? "";
  const loginTime = (session?.user as any)?.loginTime;

  const connectedAt = loginTime
    ? new Date(loginTime).toLocaleString("fr-FR")
    : "";

  return (
    <div className={styles.page}>
      <div className={styles.statusStrip}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>Session active</span>
        <span className={styles.statusTime}>{connectedAt}</span>
      </div>

      <div>
        <p className={styles.eyebrow}>Tableau de bord</p>
        <h1 className={styles.title}>Bienvenue, {userName.split(" ")[0]}</h1>
        <p className={styles.subtitle}>
          Voici votre espace WarehouseOS. Les modules produits et stock
          arrivent dans les prochains sprints.
        </p>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Informations du compte</h2>
          <div className={styles.rows}>
            <ManifestRow label="Nom" value={userName} />
            <ManifestRow label="Email" value={userEmail} />
            <ManifestRow label="Identifiant" value={userId} />
            <ManifestRow label="Connecté depuis" value={connectedAt} />
          </div>
        </section>

        <section className={styles.comingSoon}>
          <span className={styles.comingSoonTag}>Prochain sprint</span>
          <h2 className={styles.comingSoonTitle}>Produits &amp; Stock</h2>
          <p className={styles.comingSoonText}>
            La gestion des produits, des catégories et des mouvements
            d&apos;inventaire sera ajoutée ici dans une prochaine itération.
          </p>
        </section>
      </div>
    </div>
  );
}