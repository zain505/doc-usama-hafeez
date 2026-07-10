import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  icon: Icon,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      <span>{children}</span>
      {variant === "link" ? <ArrowRight size={17} aria-hidden="true" /> : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
