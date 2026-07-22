import styles from "./ManifestRow.module.css";

interface ManifestRowProps {
  label: string;
  value: string;
}

export default function ManifestRow({ label, value }: ManifestRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}