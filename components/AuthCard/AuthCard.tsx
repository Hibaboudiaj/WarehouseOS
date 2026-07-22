import { ReactNode } from "react";
import styles from "./AuthCard.module.css";

interface AuthCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  code: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthCard({
  eyebrow,
  title,
  subtitle,
  code,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.scanTrack}>
          <div className={styles.scanLine} />
        </div>

        <div className={styles.badgeHead}>
          <span className={styles.dot} />
          <span className={styles.eyebrow}>{eyebrow}</span>
        </div>

        <div className={styles.body}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
        </div>

        <div className={styles.footer}>{footer}</div>

        <div className={styles.stub}>
          <div className={styles.barcode} />
          <span className={styles.code}>{code}</span>
        </div>
      </div>
    </div>
  );
}