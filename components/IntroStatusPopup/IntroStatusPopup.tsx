import React, { useEffect, useMemo, useState } from "react";
import "./IntroStatusPopup.css";
import qrCodeAsset from "./arash_littlea2.png";

const qrCode =
  typeof qrCodeAsset === "string"
    ? qrCodeAsset
    : (qrCodeAsset as { src: string }).src;

export type IntroStatusContact = {
  label: string;
  value: string;
  href: string;
  icon: "telegram" | "whatsapp" | "instagram" | "email";
};

export type IntroStatusPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  contacts?: IntroStatusContact[];
};

const DEFAULT_CONTACTS: IntroStatusContact[] = [
  {
    label: "TELEGRAM",
    value: "@Arash_Little_A2",
    href: "https://t.me/Arash_Little_A2",
    icon: "telegram",
  },
  {
    label: "WHATSAPP",
    value: "+90 534 337 6199",
    href: "https://wa.me/905343376199",
    icon: "whatsapp",
  },
  {
    label: "INSTAGRAM",
    value: "@arash_littlea2",
    href: "https://www.instagram.com/arash_littlea2/",
    icon: "instagram",
  },
  {
    label: "EMAIL",
    value: "arashtehrani65@yahoo.com",
    href: "mailto:arashtehrani65@yahoo.com",
    icon: "email",
  },
];

const HEADER_TEXT = "TD.SYSTEM // WEBSITE STATUS";
const STATUS_TEXT = "IN DEVELOPMENT";

const BODY_LINES = [
  "The new Teenager Design website",
  "is currently being built.",
  "",
  "We are crafting a better experience",
  "for exploring ideas, objects and",
  "systems.",
];

const CONTACT_TEXT = "CONTACT WITH ME";

function StatusIcon({ type }: { type: IntroStatusContact["icon"] }) {
  if (type === "telegram") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="td-contact-icon">
        <path
          d="M42.4 7.6 35.7 40c-.5 2.3-1.8 2.9-3.7 1.8l-10.3-7.6-5 4.8c-.6.6-1.1 1.1-2.2 1.1l.8-10.5L34.4 13c.8-.7-.2-1.1-1.2-.4L8.1 28.1l-10.4-3.3c-2.3-.7-2.3-2.3.5-3.4L39.1 5.8c1.9-.7 3.6.4 3.3 1.8Z"
          transform="translate(2 0)"
        />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="td-contact-icon">
        <path
          d="M24 4.5C13.2 4.5 4.5 13.2 4.5 24c0 3.4.9 6.7 2.6 9.6L4.2 43.7l10.4-2.7c2.8 1.6 6.1 2.5 9.4 2.5 10.8 0 19.5-8.7 19.5-19.5S34.8 4.5 24 4.5Zm0 35.5c-3 0-5.9-.8-8.4-2.4l-.6-.4-6.2 1.6 1.7-6-.4-.6A15.9 15.9 0 0 1 8.1 24C8.1 15.2 15.2 8.1 24 8.1S39.9 15.2 39.9 24 32.8 40 24 40Zm8.8-11.9c-.5-.3-3.1-1.5-3.6-1.7-.5-.2-.8-.3-1.2.3-.3.5-1.4 1.7-1.7 2-.3.3-.6.4-1.1.1-.5-.3-2.1-.8-4-2.5-1.5-1.3-2.5-2.9-2.8-3.4-.3-.5 0-.8.2-1.1.2-.2.5-.6.7-.9.2-.3.3-.5.5-.9.2-.3.1-.6 0-.9-.1-.3-1.2-2.9-1.6-4-.4-1-.9-.9-1.2-.9h-1c-.3 0-.9.1-1.3.6-.5.5-1.8 1.8-1.8 4.4s1.8 5.1 2 5.5c.3.3 3.6 5.5 8.8 7.5 1.2.5 2.2.8 2.9 1 .1 0 2.2.3 3.1-.9.9-1.1 1.1-2.3 1-2.5-.1-.3-.4-.4-.9-.7Z"
        />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="td-contact-icon">
        <rect x="7" y="7" width="34" height="34" rx="9" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="34" cy="14" r="2.2" className="td-icon-fill" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="td-contact-icon">
      <rect x="5" y="10" width="38" height="28" rx="2" />
      <path d="m7 12 17 14L41 12" />
    </svg>
  );
}

function useTypewriter(
  text: string,
  active: boolean,
  speed = 34,
  startDelay = 0,
) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!active) {
      setVisibleText("");
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let index = 0;

    timer = setTimeout(() => {
      timer = setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length && timer) {
          clearInterval(timer);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [active, speed, startDelay, text]);

  return visibleText;
}

function TypewriterLine({
  text,
  active,
  speed = 28,
  startDelay = 0,
  className = "",
}: {
  text: string;
  active: boolean;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  const visibleText = useTypewriter(text, active, speed, startDelay);

  return (
    <span className={`td-type-line ${className}`}>
      {visibleText}
    </span>
  );
}

export default function IntroStatusPopup({
  isOpen,
  onClose,
  contacts = DEFAULT_CONTACTS,
}: IntroStatusPopupProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanFinished, setScanFinished] = useState(false);

  const contactText = useTypewriter(
    CONTACT_TEXT,
    isOpen && hasStarted,
    55,
    2000,
  );

  const bodyReady = isOpen && hasStarted;

  useEffect(() => {
    if (!isOpen) {
      setHasStarted(false);
      setScanProgress(0);
      setScanFinished(false);
      return;
    }

    const startTimer = window.setTimeout(() => {
      setHasStarted(true);
    }, 180);

    return () => window.clearTimeout(startTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !hasStarted) return;

    setScanProgress(0);
    setScanFinished(false);

    const scanStart = window.setTimeout(() => {
      const duration = 2100;
      const startedAt = performance.now();

      let frame = 0;

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setScanProgress(progress);

        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        } else {
          setScanFinished(true);
        }
      };

      frame = window.requestAnimationFrame(tick);

      return () => window.cancelAnimationFrame(frame);
    }, 720);

    return () => window.clearTimeout(scanStart);
  }, [isOpen, hasStarted]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const bodyParagraphs = useMemo(
    () => [
      {
        first: BODY_LINES[0],
        second: BODY_LINES[1],
      },
      {
        first: BODY_LINES[3],
        second: BODY_LINES[4],
        third: BODY_LINES[5],
      },
    ],
    [],
  );

  if (!isOpen) return null;

  return (
    <div className="td-status-overlay" role="presentation">
      <button
        className="td-status-backdrop"
        type="button"
        aria-label="Close website status"
        onClick={onClose}
      />

      <section
        className="td-status-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Teenager Design website status"
      >
        <div className="td-status-frame td-status-frame--outer" />

        <div className="td-status-inner">
          <header className="td-status-header">
            <div className="td-status-header-label">
              <TypewriterLine
                text={HEADER_TEXT}
                active={isOpen}
                speed={30}
                startDelay={120}
              />
            </div>

            <button
              className="td-status-close"
              type="button"
              aria-label="Close"
              onClick={onClose}
            >
              <span />
              <span />
            </button>
          </header>

          <div className="td-status-divider td-status-divider--header" />

          <main className="td-status-main">
            <div className="td-status-copy">
              <div className="td-status-title-row">
                <span className="td-status-dot" aria-hidden="true" />
                <TypewriterLine
                  text={STATUS_TEXT}
                  active={bodyReady}
                  speed={42}
                  startDelay={0}
                  className="td-status-title"
                />
              </div>

              <div className="td-status-title-rule" />

              <div className="td-status-description">
                <p>
                  <TypewriterLine
                    text={bodyParagraphs[0].first}
                    active={bodyReady}
                    speed={24}
                    startDelay={650}
                  />
                  <br />
                  <TypewriterLine
                    text={bodyParagraphs[0].second}
                    active={bodyReady}
                    speed={24}
                    startDelay={1250}
                  />
                </p>

                <p>
                  <TypewriterLine
                    text={bodyParagraphs[1].first}
                    active={bodyReady}
                    speed={24}
                    startDelay={2050}
                  />
                  <br />
                  <TypewriterLine
                    text={bodyParagraphs[1].second}
                    active={bodyReady}
                    speed={24}
                    startDelay={2650}
                  />
                  <br />
                  <TypewriterLine
                    text={bodyParagraphs[1].third ?? ""}
                    active={bodyReady}
                    speed={24}
                    startDelay={3250}
                  />
                </p>

              
              </div>
            </div>

            <div className="td-status-scan" aria-label="System scan">
              <div className="td-scan-corner td-scan-corner--tl" />
              <div className="td-scan-corner td-scan-corner--tr" />
              <div className="td-scan-corner td-scan-corner--bl" />
              <div className="td-scan-corner td-scan-corner--br" />
<div
                className={`td-scan-qr-wrap ${
                  scanFinished ? "is-complete" : ""
                }`}
                style={{
                  clipPath: `inset(0 0 ${Math.max(
                    0,
                    100 - scanProgress * 100,
                  )}% 0)`,
                  opacity: scanProgress > 0 ? 1 : 0,
                }}
              >
                <img
                  className="td-scan-qr"
                  src={qrCode}
                  alt="Teenager Design QR code"
                />
              </div>

              
              <div className="td-scan-center-frame" aria-hidden="true" />
            </div>
          </main>

          <div className="td-status-divider td-status-divider--contact" />

          <section className="td-status-contact">
            <div className="td-contact-heading">
              <span>{contactText}</span>
              <span
                className={`td-contact-cursor ${
                  contactText.length === CONTACT_TEXT.length
                    ? "is-blinking"
                    : "is-hidden"
                }`}
              />
            </div>

            <div className="td-contact-divider" />

            <div className="td-contact-grid">
              {contacts.slice(0, 4).map((contact, index) => (
                <a
  key={`${contact.label}-${index}`}
  className={`td-contact-item ${
    contactText.length === CONTACT_TEXT.length
      ? "is-visible"
      : ""
  }`}
  style={{
    transitionDelay: `${
      contactText.length === CONTACT_TEXT.length
        ? index * 0.15
        : 0
    }s`
  }}
                  href={contact.href}
                  target={
                    contact.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    contact.href.startsWith("http")
                      ? "noreferrer"
                      : undefined
                  }
                >
                  <span className="td-contact-icon-wrap">
                    <StatusIcon type={contact.icon} />
                  </span>

                  <span className="td-contact-copy">
                    <span className="td-contact-label">{contact.label}</span>
                    <span className="td-contact-value">{contact.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}