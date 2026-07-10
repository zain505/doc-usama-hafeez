"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { withBasePath } from "@/lib/site";
import styles from "./Navbar.module.css";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "services", href: "#services" },
  { key: "dentists", href: "#about-dentist" },
  { key: "pricing", href: "#pricing-offers" },
  { key: "blogs", href: "/blog" },
  { key: "contact", href: "#contact" },
];

const withHomePrefix = (homeHrefPrefix, href) =>
  withBasePath(href.startsWith("#") ? `${homeHrefPrefix}${href}` : href);

function Brand({ homeHrefPrefix = "" }) {
  const { t } = useTranslation();

  return (
    <a className={styles.brand} href={withHomePrefix(homeHrefPrefix, "#home")} aria-label={t("brand")}>
      <span className={styles.brandMark} aria-hidden="true" />
      <span className={styles.brandText}>
        <span>{t("brandFirst")}</span>
        <span>{t("brandSecond")}</span>
      </span>
    </a>
  );
}

export default function Navbar({ homeHrefPrefix = "", activeKey = "home" }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 769px)");
    const closeOnDesktop = (event) => {
      if (event.matches) {
        setDrawerOpen(false);
      }
    };

    closeOnDesktop(desktopQuery);
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span>
            <MapPin size={20} aria-hidden="true" />
            {t("topbar.address")}
          </span>
          <span>
            <Phone size={20} aria-hidden="true" />
            {t("topbar.phone")}
          </span>
          <span>
            <Clock size={20} aria-hidden="true" />
            {t("topbar.hours")}
          </span>
        </div>
      </div>

      <div className={styles.stickyNav}>
        <div className={styles.navShell}>
          <Brand homeHrefPrefix={homeHrefPrefix} />

          <nav className={styles.desktopLinks} aria-label={t("nav.main")}>
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={withHomePrefix(homeHrefPrefix, link.href)}
                className={link.key === activeKey ? styles.activeLink : ""}
              >
                <span>{t(`nav.${link.key}`)}</span>
              </a>
            ))}
            <LanguageSwitcher />
          </nav>

          <div className={styles.navActions}>
            <a className={styles.phonePill} href="tel:+923336367187">
              <Phone size={20} aria-hidden="true" />
              <span>{t("topbar.phone")}</span>
            </a>
            <Button
              href={withHomePrefix(homeHrefPrefix, "#contact")}
              icon={CalendarDays}
              className={styles.appointmentButton}
            >
              {t("common.bookAppointment")}
            </Button>
          </div>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={t("nav.menu")}
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        className={`${styles.overlay} ${drawerOpen ? styles.overlayOpen : ""}`}
        type="button"
        aria-label={t("nav.close")}
        onClick={closeDrawer}
      />

      <aside
        id="mobile-menu"
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div className={styles.drawerHeader}>
          <Brand homeHrefPrefix={homeHrefPrefix} />
          <button type="button" aria-label={t("nav.close")} onClick={closeDrawer}>
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.drawerLinks} aria-label={t("nav.mobile")}>
          {navLinks.map((link) => (
            <a key={link.key} href={withHomePrefix(homeHrefPrefix, link.href)} onClick={closeDrawer}>
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className={styles.drawerActions}>
          <LanguageSwitcher compact />
          <Button href={withHomePrefix(homeHrefPrefix, "#contact")} icon={CalendarDays} onClick={closeDrawer}>
            {t("common.bookAppointment")}
          </Button>
          <a className={styles.drawerPhone} href="tel:+923336367187">
            <Phone size={18} aria-hidden="true" />
            {t("topbar.phone")}
          </a>
        </div>
      </aside>
    </header>
  );
}
