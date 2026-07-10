import styles from "./SectionBadge.module.css";

export default function SectionBadge({ icon: Icon, children, className = "" }) {
  return (
    <div className={[styles.badge, className].filter(Boolean).join(" ")}>
      {Icon ? <Icon size={19} aria-hidden="true" /> : null}
      <span>{children}</span>
    </div>
  );
}
