/* ============================================================
   CONTACT POPUP
   Teenager Design — Contact / Links
   ============================================================ */

"use client";

import "./ContactPopup.css";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ============================================================
   EDIT CONTACT LINKS HERE
   فقط لینک‌های زیر را تغییر بده.
   ============================================================ */

const CONTACT_LINKS = {
  telegram: "https://t.me/YOUR_TELEGRAM",
  whatsapp: "https://wa.me/YOUR_WHATSAPP_NUMBER",
  instagram: "https://instagram.com/YOUR_INSTAGRAM",
  email: "mailto:YOUR_EMAIL@example.com",
};

/* ============================================================
   ICONS
   SVG icons — no external assets required.
   ============================================================ */

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="td-contact-icon"
    >
      <path
        d="M21.4 3.6 3.5 10.5c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.3c.2.6.1.8.8.8.5 0 .7-.2 1-.5l2.2-2.1 4.6 3.4c.8.4 1.4.2 1.6-.8l3-14.2c.3-1.2-.5-1.8-1.4-1.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m8.2 13.2 9.4-6-7.4 7.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="td-contact-icon"
    >
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.7 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2.1.4-.1.6l-.6.7c.7 1.3 1.7 2.2 3 2.8l.6-.7c.2-.2.4-.2.7-.1l1.4.7c.3.1.4.3.3.6-.2.7-.8 1.3-1.5 1.5-1 .2-2.8-.5-4.3-1.8-1.5-1.3-2.4-3-2.3-4 0-.7.2-1.4.5-1.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="td-contact-icon"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="17.2"
        cy="6.9"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="td-contact-icon"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="td-contact-arrow"
    >
      <path
        d="M4 14 14 4M7 4h7v7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function ContactPopup({
  isOpen,
  onClose,
}: ContactPopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="td-contact-popup-layer"
      role="dialog"
      aria-modal="true"
      aria-label="Teenager Design contact links"
    >
      <div className="td-contact-popup">

        {/* Corner details */}
        <div className="td-contact-corner td-contact-corner-tl" />
        <div className="td-contact-corner td-contact-corner-tr" />
        <div className="td-contact-corner td-contact-corner-bl" />
        <div className="td-contact-corner td-contact-corner-br" />

        {/* Header */}
        <header className="td-contact-header">

          <div className="td-contact-title">
            CONTACT
            <span>/</span>
            LINKS
          </div>

          <button
            type="button"
            className="td-contact-close"
            onClick={onClose}
            aria-label="Close contact popup"
          >
            ×
          </button>

        </header>

        <div className="td-contact-divider" />

        {/* Contact links */}
        <main className="td-contact-list">

          <a
            className="td-contact-row"
            href={CONTACT_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="td-contact-icon-box">
              <TelegramIcon />
            </div>

            <div className="td-contact-name">
              TELEGRAM
            </div>

            <div className="td-contact-value">
              @YOUR_TELEGRAM
            </div>

            <div className="td-contact-arrow-box">
              <ExternalArrow />
            </div>
          </a>

          <a
            className="td-contact-row"
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="td-contact-icon-box">
              <WhatsAppIcon />
            </div>

            <div className="td-contact-name">
              WHATSAPP
            </div>

            <div className="td-contact-value">
              +YOUR NUMBER
            </div>

            <div className="td-contact-arrow-box">
              <ExternalArrow />
            </div>
          </a>

          <a
            className="td-contact-row"
            href={CONTACT_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="td-contact-icon-box">
              <InstagramIcon />
            </div>

            <div className="td-contact-name">
              INSTAGRAM
            </div>

            <div className="td-contact-value">
              @YOUR_INSTAGRAM
            </div>

            <div className="td-contact-arrow-box">
              <ExternalArrow />
            </div>
          </a>

          <a
            className="td-contact-row"
            href={CONTACT_LINKS.email}
          >
            <div className="td-contact-icon-box">
              <EmailIcon />
            </div>

            <div className="td-contact-name">
              EMAIL
            </div>

            <div className="td-contact-value">
              YOUR_EMAIL@example.com
            </div>

            <div className="td-contact-arrow-box">
              <ExternalArrow />
            </div>
          </a>

        </main>

      </div>
    </div>
  );
}