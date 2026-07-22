import styles from "./FormField.module.css";

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  hint?: string;
}

export default function FormField({
  label,
  type = "text",
  name,
  placeholder,
  hint,
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.input}
      />
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}