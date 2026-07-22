import styles from "./Button.module.css";

interface ButtonProps {
  children: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  onClick,
}:ButtonProps){
    let className = styles.button + " " + styles[variant];
  if (fullWidth) {
    className = className + " " + styles.fullWidth;
}
return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}