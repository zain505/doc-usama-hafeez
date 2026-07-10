"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Newspaper,
  Phone,
  PlayCircle,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Tag,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { withBasePath } from "@/lib/site";
import Button from "./Button";
import Navbar from "./Navbar";
import SectionBadge from "./SectionBadge";
import styles from "./HomePage.module.css";

function SocialIcon({ className, children }) {
  return (
    <span className={`${styles.socialIcon} ${className}`}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        {children}
      </svg>
    </span>
  );
}

function SocialIconRail() {
  return (
    <div className={styles.socialRail} aria-hidden="true">
      <SocialIcon className={styles.facebookIcon}>
        <path d="M15.12 8.25h-2.04c-.74 0-1.08.35-1.08 1.02v1.67h3.04l-.4 3.08H12v7.48H8.82v-7.48H6.18v-3.08h2.64V8.88c0-2.61 1.6-4.04 3.94-4.04 1.12 0 2.08.08 2.36.12v3.29Z" />
      </SocialIcon>
      <SocialIcon className={styles.instagramIcon}>
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="16.75" cy="7.25" r="1.15" />
      </SocialIcon>
      <SocialIcon className={styles.youtubeIcon}>
        <path d="M9.35 7.6v8.8L16.7 12 9.35 7.6Z" />
      </SocialIcon>
      <SocialIcon className={styles.whatsappIcon}>
        <path
          d="M5.45 19.1 6.3 16.05a7.05 7.05 0 1 1 2.6 2.5L5.45 19.1Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M9.42 8.48c.2-.42.42-.43.62-.43h.46c.14 0 .36.05.55.44.19.38.66 1.28.72 1.38.06.1.1.22.02.36-.08.15-.12.23-.24.36-.12.14-.25.3-.36.4-.12.12-.25.25-.1.5.14.25.64 1.05 1.38 1.7.95.84 1.74 1.1 1.99 1.22.25.13.4.1.54-.06.15-.16.62-.72.79-.97.17-.25.33-.21.56-.13.24.08 1.48.7 1.73.83.25.12.42.18.48.28.06.1.06.6-.14 1.18-.2.58-1.17 1.1-1.63 1.14-.44.04-1 .06-1.62-.1-.37-.1-.84-.27-1.45-.52-2.55-1.1-4.2-3.66-4.33-3.84-.13-.17-1.03-1.36-1.03-2.6 0-1.24.65-1.85.88-2.1.22-.26.49-.32.65-.32"
          fill="currentColor"
        />
      </SocialIcon>
    </div>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const [activePlanIndex, setActivePlanIndex] = useState(1);
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.328566034792!2d71.6751325!3d29.389942899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b910075a5998b%3A0x24bc47c24ed2a986!2sDental%20Square%20by%20Dr%20Usama%20Hafeez%20and%20Dr%20Raham%20Umar!5e0!3m2!1sen!2s!4v1783489160475!5m2!1sen!2s";
  const googleMapsPlaceUrl =
    "https://www.google.com/maps/search/?api=1&query=Dental%20Square%20by%20Dr%20Usama%20Hafeez%20and%20Dr%20Raham%20Umar%2C%2029.3899429%2C%2071.6751325";
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=29.3899429%2C71.6751325";
  const heroClinicImage = withBasePath("/images/dental/hero-clinic.png");
  const toothShieldImage = withBasePath("/images/dental/tooth-shield.png");
  const doctorPortraitImage = withBasePath("/images/dental/about-dentist-portrait.jpg");

  const heroFeatures = [
    { icon: ShieldCheck, label: t("hero.advanced") },
    { icon: Users, label: t("hero.team") },
    { icon: Heart, label: t("hero.comfort") },
  ];

  const serviceCards = [
    { icon: ShieldCheck, title: t("services.general.title"), copy: t("services.general.copy"), active: true },
    { icon: Sparkles, title: t("services.cosmetic.title"), copy: t("services.cosmetic.copy") },
    { icon: BadgeCheck, title: t("services.implants.title"), copy: t("services.implants.copy") },
    { icon: Smile, title: t("services.whitening.title"), copy: t("services.whitening.copy") },
    { icon: CircleCheck, title: t("services.orthodontics.title"), copy: t("services.orthodontics.copy") },
    { icon: Stethoscope, title: t("services.emergency.title"), copy: t("services.emergency.copy") },
  ];

  const aboutCards = [
    { icon: Star, title: t("about.cardA.title"), copy: t("about.cardA.copy") },
    { icon: Sparkles, title: t("about.cardB.title"), copy: t("about.cardB.copy") },
    { icon: Users, title: t("about.cardC.title"), copy: t("about.cardC.copy") },
  ];

  const pricingCards = [
    {
      icon: Smile,
      title: t("pricing.basicTitle"),
      price: t("pricing.basicPrice"),
      cta: t("common.bookNow"),
      features: [t("pricing.basicOne"), t("pricing.basicTwo"), t("pricing.basicThree")],
    },
    {
      icon: Sparkles,
      title: t("pricing.smileTitle"),
      price: t("pricing.smilePrice"),
      cta: t("common.choosePlan"),
      featured: true,
      features: [
        t("pricing.smileOne"),
        t("pricing.smileTwo"),
        t("pricing.smileThree"),
        t("pricing.smileFour"),
      ],
    },
    {
      icon: BadgeCheck,
      title: t("pricing.premiumTitle"),
      price: t("pricing.premiumPrice"),
      cta: t("common.getStarted"),
      features: [
        t("pricing.premiumOne"),
        t("pricing.premiumTwo"),
        t("pricing.premiumThree"),
        t("pricing.premiumFour"),
      ],
    },
  ];
  const pricingPlanCount = pricingCards.length;
  const wrapPlanIndex = (index) => (index + pricingPlanCount) % pricingPlanCount;
  const visiblePricingCards = [-1, 0, 1].map((offset) => {
    const planIndex = wrapPlanIndex(activePlanIndex + offset);

    return {
      ...pricingCards[planIndex],
      originalIndex: planIndex,
      position: offset,
    };
  });
  const showPreviousPlan = () => {
    setActivePlanIndex((currentIndex) => wrapPlanIndex(currentIndex - 1));
  };
  const showNextPlan = () => {
    setActivePlanIndex((currentIndex) => wrapPlanIndex(currentIndex + 1));
  };

  const blogCards = [
    {
      category: t("blogs.cosmetic"),
      date: t("blogs.dateA"),
      read: t("blogs.readA"),
      title: t("blogs.postATitle"),
      copy: t("blogs.postACopy"),
      image: withBasePath("/images/dental/blog-whitening.png"),
      href: "/blog/5-tips-for-brighter-whiter-smile",
      icon: Smile,
    },
    {
      category: t("blogs.pediatric"),
      date: t("blogs.dateB"),
      read: t("blogs.readB"),
      title: t("blogs.postBTitle"),
      copy: t("blogs.postBCopy"),
      image: withBasePath("/images/dental/blog-kids.png"),
      href: "/blog/make-dental-visits-fun-for-kids",
      icon: Heart,
    },
    {
      category: t("blogs.orthodontics"),
      date: t("blogs.dateC"),
      read: t("blogs.readC"),
      title: t("blogs.postCTitle"),
      copy: t("blogs.postCCopy"),
      image: withBasePath("/images/dental/blog-braces.png"),
      href: "/blog/braces-care-clean-healthy-smile",
      icon: BadgeCheck,
    },
  ];

  const hoursSchedule = t("contact.hoursSchedule", { returnObjects: true });
  const contactHours = Array.isArray(hoursSchedule) ? hoursSchedule : [];

  const contactCards = [
    { icon: Phone, label: t("contact.phoneLabel"), value: t("topbar.phone") },
    { icon: MapPin, label: t("contact.locationLabel"), value: t("contact.location") },
  ];

  const contactActions = [
    {
      href: "tel:+923336367187",
      icon: Phone,
      label: t("contact.callNow"),
      className: styles.callButton,
    },
    {
      href: "https://wa.me/923336367187",
      icon: MessageCircle,
      label: t("contact.chatWhatsApp"),
      className: styles.whatsappButton,
    },
    {
      href: googleMapsDirectionsUrl,
      icon: Navigation,
      label: t("contact.getDirections"),
      className: styles.directionButton,
      external: true,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <Navbar />
      <SocialIconRail />

      <main>
        <section id="home" className={`${styles.section} ${styles.hero}`}>
          <div className={styles.dotGrid} aria-hidden="true" />
          <div className={styles.heroWave} aria-hidden="true" />
          <div className={styles.heroImage} aria-hidden="true">
            <Image
              src={heroClinicImage}
              alt=""
              fill
              preload
              sizes="100vw"
              className={styles.fillImage}
            />
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.heroContent}>
              <SectionBadge icon={BadgeCheck} className={styles.heroBadge}>
                {t("hero.badge")}
              </SectionBadge>
              <h1>
                {t("hero.titleA")}
                <br />
                {" "}
                <span>{t("hero.titleB")}</span> {t("hero.titleC")}
              </h1>
              <p>{t("hero.copy")}</p>

              <div className={styles.featureRow}>
                {heroFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div className={styles.featureItem} key={feature.label}>
                      <span>
                        <Icon size={26} aria-hidden="true" />
                      </span>
                      <strong>{feature.label}</strong>
                    </div>
                  );
                })}
              </div>

              <div className={styles.heroActions}>
                <Button href="#contact" icon={CalendarDays}>
                  {t("common.bookAppointment")}
                </Button>
                <Button href="#blogs" icon={PlayCircle} variant="secondary">
                  {t("common.watchVideo")}
                </Button>
              </div>
            </div>

            <div className={styles.heroTooth} aria-hidden="true">
              <Image
                src={toothShieldImage}
                alt=""
                width={420}
                height={420}
                sizes="(max-width: 700px) 260px, 420px"
              />
            </div>
          </div>
        </section>

        <section id="services" className={`${styles.section} ${styles.services}`}>
          <div className={styles.sectionDecorLeft} aria-hidden="true" />
          <div className={styles.sectionDecorRight} aria-hidden="true" />
          <div className={`${styles.sectionHeader} ${styles.servicesHeader}`}>
            <SectionBadge icon={Sparkles}>{t("services.badge")}</SectionBadge>
            <h2>
              {t("services.titleA")} <span>{t("services.titleB")}</span>
              <br />
              {" "}
              {t("services.titleC")} <span>{t("services.titleD")}</span>
            </h2>
            <p>{t("services.copy")}</p>
          </div>

          <div className={styles.serviceGrid}>
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  className={`${styles.serviceCard} ${service.active ? styles.activeCard : ""}`}
                  key={service.title}
                >
                  <div className={styles.cardIcon}>
                    <Icon size={38} aria-hidden="true" />
                  </div>
                  <div className={styles.cardCopy}>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <a href="#contact" className={styles.textLink}>
                      {t("common.learnMore")}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.sectionTooth} aria-hidden="true">
            <Image src={toothShieldImage} alt="" width={210} height={210} />
          </div>
        </section>

        <section id="about-dentist" className={`${styles.section} ${styles.about}`}>
          <div className={styles.sectionInner}>
            <div className={styles.aboutVisual} aria-hidden="true">
              <div className={styles.doctorFrame}>
                <Image
                  src={doctorPortraitImage}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 82vw, 520px"
                  className={styles.doctorImage}
                />
              </div>
              <Image
                className={styles.aboutTooth}
                src={toothShieldImage}
                alt=""
                width={240}
                height={240}
              />
            </div>

            <div className={styles.aboutContent}>
              <SectionBadge icon={Stethoscope}>{t("about.badge")}</SectionBadge>
              <h2>
                {t("about.titleA")} <span>{t("about.titleB")}</span>
              </h2>
              <p>{t("about.copy")}</p>

              <div className={styles.aboutCards}>
                {aboutCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article key={card.title} className={styles.aboutCard}>
                      <div className={styles.cardIcon}>
                        <Icon size={34} aria-hidden="true" />
                      </div>
                      <h3>{card.title}</h3>
                      <p>{card.copy}</p>
                    </article>
                  );
                })}
              </div>

              <div className={styles.aboutActions}>
                <Button href="#contact" icon={CalendarDays}>
                  {t("common.bookAppointment")}
                </Button>
                <Button href="#blogs" icon={Users} variant="secondary">
                  {t("common.viewProfile")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing-offers" className={`${styles.section} ${styles.pricing}`}>
          <div className={styles.pricingDots} aria-hidden="true" />
          <div className={styles.pricingDotsLeft} aria-hidden="true" />
          <div className={styles.pricingRing} aria-hidden="true" />
          <div className={`${styles.sectionHeader} ${styles.pricingHeader}`}>
            <SectionBadge icon={Tag} className={styles.largeBadge}>
              {t("pricing.badge")}
            </SectionBadge>
            <h2>
              {t("pricing.titleA")} <span>{t("pricing.titleB")}</span>
            </h2>
            <p>{t("pricing.copy")}</p>
          </div>

          <div className={styles.pricingWrap}>
            <button
              className={`${styles.carouselButton} ${styles.carouselPrev}`}
              type="button"
              aria-label="Previous plan"
              onClick={showPreviousPlan}
            >
              <ChevronLeft size={34} aria-hidden="true" />
            </button>
            <div className={styles.pricingGrid} aria-live="polite">
              {visiblePricingCards.map((plan) => {
                const Icon = plan.icon;
                const isActive = plan.position === 0;
                const cardClassName = [
                  styles.priceCard,
                  isActive ? styles.activePlan : styles.sidePlan,
                  plan.position < 0 ? styles.previousPlan : "",
                  plan.position > 0 ? styles.nextPlan : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <article className={cardClassName} key={`${plan.title}-${plan.originalIndex}`}>
                    <div className={styles.planIcon}>
                      <Icon size={42} aria-hidden="true" />
                    </div>
                    <h3>{plan.title}</h3>
                    <div className={styles.price}>{plan.price}</div>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <CircleCheck size={20} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button href="#contact" icon={CalendarDays} variant={isActive ? "primary" : "secondary"}>
                      {plan.cta}
                    </Button>
                  </article>
                );
              })}
            </div>
            <button
              className={`${styles.carouselButton} ${styles.carouselNext}`}
              type="button"
              aria-label="Next plan"
              onClick={showNextPlan}
            >
              <ChevronRight size={34} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.planDots} aria-label="Choose pricing plan">
            {pricingCards.map((plan, index) => (
              <button
                aria-current={index === activePlanIndex ? "true" : undefined}
                aria-label={`Show ${plan.title}`}
                className={index === activePlanIndex ? styles.activeDot : ""}
                key={plan.title}
                onClick={() => setActivePlanIndex(index)}
                type="button"
              />
            ))}
          </div>

          <div className={styles.offerGrid}>
            <article className={styles.offerStrip}>
              <div className={styles.cardIcon}>
                <Sparkles size={38} aria-hidden="true" />
              </div>
              <div>
                <strong>{t("pricing.offerA")}</strong>
                <h3>{t("pricing.offerATitle")}</h3>
              </div>
              <p>{t("pricing.offerACopy")}</p>
            </article>
            <article className={styles.offerStrip}>
              <div className={styles.cardIcon}>
                <Stethoscope size={38} aria-hidden="true" />
              </div>
              <div>
                <strong>{t("pricing.offerB")}</strong>
                <h3>{t("pricing.offerBTitle")}</h3>
              </div>
              <p>{t("pricing.offerBCopy")}</p>
            </article>
          </div>

          <div className={styles.pricingTooth} aria-hidden="true">
            <Image
              src={toothShieldImage}
              alt=""
              width={340}
              height={340}
              sizes="(max-width: 860px) 0px, (max-width: 1280px) 220px, 340px"
            />
          </div>
        </section>

        <section id="blogs" className={`${styles.section} ${styles.blogs}`}>
          <div className={styles.blogDots} aria-hidden="true" />
          <div className={`${styles.sectionHeader} ${styles.blogHeader}`}>
            <SectionBadge icon={Newspaper}>{t("blogs.badge")}</SectionBadge>
            <h2>
              {t("blogs.titleA")} <span>{t("blogs.titleB")}</span> {t("blogs.titleC")}
            </h2>
            <p>{t("blogs.copy")}</p>
            <Link href="/blog" className={styles.viewAllLink}>
              <ArrowRight size={22} aria-hidden="true" />
              {t("common.viewAllArticles")}
            </Link>
          </div>

          <div className={styles.blogGrid}>
            {blogCards.map((post) => {
              const Icon = post.icon;
              return (
                <article className={styles.blogCard} key={post.title}>
                  <div className={styles.blogImageWrap}>
                    <Image src={post.image} alt="" fill sizes="(max-width: 900px) 90vw, 390px" className={styles.fillImage} />
                    <span className={styles.blogIcon}>
                      <Icon size={28} aria-hidden="true" />
                    </span>
                  </div>
                  <div className={styles.blogMeta}>
                    <span className={styles.category}>{post.category}</span>
                    <span>
                      <CalendarDays size={15} aria-hidden="true" />
                      {post.date}
                    </span>
                    <span>
                      <Clock size={15} aria-hidden="true" />
                      {post.read}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.copy}</p>
                  <Link href={post.href} className={styles.readMore}>
                    {t("common.readMore")}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <div className={styles.contactGlow} aria-hidden="true" />
          <div className={styles.sectionInner}>
            <div className={styles.contactContent}>
              <SectionBadge icon={Mail} className={styles.largeBadge}>
                {t("contact.badge")}
              </SectionBadge>
              <h2>
                {t("contact.titleA")} <span>{t("contact.titleB")}</span>
              </h2>
              <p>{t("contact.copy")}</p>

              <div className={styles.contactCards}>
                {contactCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article key={card.label} className={styles.contactCard}>
                      <span className={styles.contactIcon}>
                        <Icon size={28} aria-hidden="true" />
                      </span>
                      <div>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                      </div>
                    </article>
                  );
                })}

                <article className={`${styles.contactCard} ${styles.hoursCard}`}>
                  <span className={styles.contactIcon}>
                    <Clock size={28} aria-hidden="true" />
                  </span>
                  <div className={styles.hoursDetails}>
                    <span>{t("contact.hoursLabel")}</span>
                    <div className={styles.hoursSchedule}>
                      {contactHours.map((slot) => (
                        <div className={styles.hoursRow} key={slot.day}>
                          <span>{slot.day}</span>
                          <strong>{slot.time}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>

              <div className={styles.contactActions}>
                {contactActions.map((action) => {
                  const Icon = action.icon;
                  const actionClassName = [styles.contactAction, action.className].filter(Boolean).join(" ");

                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      className={actionClassName}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                    >
                      <span className={styles.contactActionIcon}>
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className={styles.contactActionLabel}>{action.label}</span>
                      <span className={styles.contactActionArrow}>
                        <ArrowRight size={20} aria-hidden="true" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className={styles.mapPanel} aria-label={t("contact.mapLabel")}>
              <div className={styles.mapCard}>
                <span className={styles.mapMarkerIcon}>
                  <MapPin size={42} aria-hidden="true" />
                </span>
                <div>
                  <span>{t("contact.locationLabel")}</span>
                  <strong>{t("brand")}</strong>
                  <p>{t("contact.location")}</p>
                  <p>{t("contact.plusCode")}</p>
                </div>
                <a href={googleMapsPlaceUrl} target="_blank" rel="noreferrer">
                  <MapPin size={18} aria-hidden="true" />
                  {t("contact.openMaps")}
                </a>
              </div>
              <iframe
                className={styles.googleMap}
                src={googleMapsEmbedUrl}
                title={t("contact.mapLabel")}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerShell}>
          <span className={styles.footerDotsLeft} aria-hidden="true" />
          <span className={styles.footerDotsRight} aria-hidden="true" />

          <div className={styles.footerContent}>
            <section className={styles.footerIntro} aria-labelledby="footer-brand-title">
              <a className={styles.footerBrand} href="#home" aria-label={t("brand")}>
                <span className={styles.footerBrandMark} aria-hidden="true" />
                <span id="footer-brand-title" className={styles.footerBrandText}>
                  <span>{t("brandFirst")}</span>
                  <span>{t("brandSecond")}</span>
                </span>
              </a>
              <p>{t("footer.tagline")}</p>
              <span className={styles.footerAccent} aria-hidden="true" />

              <div className={styles.footerAppointmentPanel}>
                <span className={styles.footerAppointmentIcon}>
                  <CalendarDays size={30} aria-hidden="true" />
                </span>
                <div>
                  <h2>{t("common.bookAppointment")}</h2>
                  <p>{t("contact.copy")}</p>
                </div>
                <a className={styles.footerAppointmentButton} href="#contact">
                  <CalendarDays size={19} aria-hidden="true" />
                  <span>{t("common.bookAppointment")}</span>
                  <ArrowRight size={22} aria-hidden="true" />
                </a>
              </div>
            </section>

            <section className={styles.footerContactPanel} aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title">{t("contact.badge")}</h2>
              <div className={styles.footerContactList}>
                <a className={styles.footerContactRow} href={googleMapsPlaceUrl} target="_blank" rel="noreferrer">
                  <span className={styles.footerContactIcon}>
                    <MapPin size={28} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{t("contact.locationLabel")}</strong>
                    <span>
                      {t("contact.location")}
                      <br />
                      {t("contact.plusCode")}
                    </span>
                  </span>
                </a>

                <a className={styles.footerContactRow} href="tel:+923336367187">
                  <span className={styles.footerContactIcon}>
                    <Phone size={27} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{t("contact.phoneLabel")}</strong>
                    <span>{t("topbar.phone")}</span>
                  </span>
                </a>
              </div>

              <div className={styles.footerMiniActions} aria-label={t("footer.actionsTitle")}>
                <a href={googleMapsDirectionsUrl} target="_blank" rel="noreferrer">
                  <Navigation size={18} aria-hidden="true" />
                  <span>{t("contact.getDirections")}</span>
                </a>
                <a href="https://wa.me/923336367187" target="_blank" rel="noreferrer">
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>{t("contact.chatWhatsApp")}</span>
                </a>
              </div>
            </section>

            <section className={styles.footerHoursPanel} aria-labelledby="footer-hours-title">
              <h2 id="footer-hours-title">{t("contact.hoursLabel")}</h2>
              <div className={styles.footerHoursList}>
                {contactHours.map((slot) => (
                  <div className={styles.footerHoursRow} key={slot.day}>
                    <span>{slot.day}</span>
                    <i aria-hidden="true" />
                    <strong>{slot.time}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={styles.footerTooth} aria-hidden="true">
            <Image
              src={toothShieldImage}
              alt=""
              width={250}
              height={250}
              sizes="(max-width: 860px) 150px, 250px"
            />
          </div>

          <div className={styles.footerBottom}>
            <span>
              &copy; {currentYear} {t("brand")}. {t("footer.rights")}
            </span>
            <span className={styles.footerMiniMark} aria-hidden="true" />
            <a href="tel:+923336367187">{t("topbar.phone")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
