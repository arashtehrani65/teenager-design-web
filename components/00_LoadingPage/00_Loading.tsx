/* ============================================================
   00 — LOADING PAGE
   SEQUENCE 02 — FIXED HOOK VERSION
   ============================================================ */

"use client";

import { useEffect, useRef, useState } from "react";
import "./00_Loading.css";

/* ============================================================
   TEXT CONTENT
   ============================================================ */

const GROUP_01_TITLE = "INITIALIZING";

const GROUP_01_LINES = [
  "PREPARING SYSTEM...",
  "VERIFYING SYSTEM...",
  "ESTABLISHING CONNECTION...",
];

const GROUP_01_ACCESS = "TD.SYSTEM // CORE ACCESS";

const GROUP_02_TITLE = "ACCESSING UNKNOWN SPACE";

const GROUP_02_SUBTITLE = "RETRIEVING DATA PACKETS...";

const GROUP_02_STATUS_LINES = [
  "SCANNING ENVIRONMENT",
  "LOADING ASSETS",
  "ESTABLISHING CONNECTION",
  "PREPARING INTERFACE",
];

/* ============================================================
   GROUP 03 — VISUAL / CODE CONTENT
   ============================================================ */

const GROUP_03_CODE = [
  "const stars = createParticleField();",
  "const field = createStarField({",
  "  density: STAR_DENSITY,",
  "  depth: SPACE_DEPTH,",
  "  glow: true,",
  "});",
  "",
  "stars.forEach(star => {",
  "  star.opacity = Math.random();",
  "  star.speed = BASE_SPEED;",
  "  star.twinkle = true;",
  "",
  "  if (star.size > LARGE_STAR_SIZE) {",
  "    star.color = pick([BLUE, PURPLE]);",
  "    star.glow = STAR_GLOW;",
  "  } else {",
  "    star.color = WHITE;",
  "  }",
  "});",
  "",
  "renderStarField(field, stars);",
  "startParticleMotion();",
  "startStarTail();",
  "",
  "console.log('STAR FIELD // LIVE');",
];

/* ============================================================
   TIMING SETTINGS
   ============================================================ */

const INITIALIZING_DURATION = 600;

const GROUP_01_LINE_SPEED = 20;
const GROUP_01_LINE_DELAY = 60;

const ACCESS_CURSOR_BLINKS = 5;
const ACCESS_CURSOR_BLINK_SPEED = 180;

const GROUP_03_CONTENT_DELAY = 600;
const GROUP_03_CODE_SPEED = 16;

const GROUP_01_TO_GROUP_02_DELAY = 150;

const GROUP_02_TITLE_DURATION = 600;

const GROUP_02_SUBTITLE_SPEED = 16;

const LOADING_BAR_START_DELAY = 600;

const LOADING_DURATION = 1600;
const LOADING_SEGMENTS = 50;

const STATUS_LINE_SPEED = 20;
const STATUS_LINE_DELAY = 60;

const CURSOR_BLINK_COUNT = 5;
const CURSOR_BLINK_DURATION = 600;
const CURSOR_POST_TYPE_DURATION =
  CURSOR_BLINK_COUNT * CURSOR_BLINK_DURATION;

/* ============================================================
   SCRAMBLE
   ============================================================ */

const SCRAMBLE_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

function scrambleText(
  finalText: string,
  progress: number
): string {

  const visibleCharacters =
    Math.floor(finalText.length * progress);

  return finalText
    .split("")
    .map((character, index) => {

      if (character === " ") {
        return " ";
      }

      if (index < visibleCharacters) {
        return character;
      }

      const scrambleIndex =
        (index * 17 + finalText.length * 3) %
        SCRAMBLE_CHARACTERS.length;

      return SCRAMBLE_CHARACTERS[scrambleIndex];

    })
    .join("");
}

/* ============================================================
   GROUP 03 — STAR DATA
   ============================================================ */

const GROUP_03_STARS = Array.from(
  { length: 72 },
  (_, index) => ({
    left: `${(index * 47) % 97}%`,
    top: `${(index * 71) % 91}%`,
    size: `${index % 3 === 0 ? 2 : 1}px`,
    delay: `${(index * 37) % 1200}ms`,
    duration: `${1800 + ((index * 83) % 1800)}ms`,
  })
);

/* ============================================================
   COMPONENT
   ============================================================ */

interface LoadingProps {
  onComplete: () => void;
}

export default function Loading({
  onComplete,
}: LoadingProps) {

  const [
    initializingProgress,
    setInitializingProgress
  ] = useState(0);

  const [
    group01Line,
    setGroup01Line
  ] = useState(0);

  const [
    group01LineText,
    setGroup01LineText
  ] = useState("");

  const [
    accessVisible,
    setAccessVisible
  ] = useState(false);

  const [
    accessRed,
    setAccessRed
  ] = useState(false);

  const [
    initializingCursorVisible,
    setInitializingCursorVisible
  ] = useState(true);

  const [
    accessCursorVisible,
    setAccessCursorVisible
  ] = useState(true);

  const [
    group03Visible,
    setGroup03Visible
  ] = useState(false);

  const [
    group03ContentVisible,
    setGroup03ContentVisible
  ] = useState(false);

  const [
    group03CodeText,
    setGroup03CodeText
  ] = useState("");

  const [
    group02Visible,
    setGroup02Visible
  ] = useState(false);

  const [
    group02TitleProgress,
    setGroup02TitleProgress
  ] = useState(0);

  const [
    group02TitleCursorVisible,
    setGroup02TitleCursorVisible
  ] = useState(true);

  const [
    group02Subtitle,
    setGroup02Subtitle
  ] = useState("");

  const [
    group02SubtitleCursorVisible,
    setGroup02SubtitleCursorVisible
  ] = useState(true);

  const [
    group02Progress,
    setGroup02Progress
  ] = useState(0);

  const [
    loadingBarVisible,
    setLoadingBarVisible
  ] = useState(false);

  const [
    statusVisible,
    setStatusVisible
  ] = useState(false);

  const [
    statusLines,
    setStatusLines
  ] = useState<string[]>([]);

  const mountedRef = useRef(true);

  useEffect(() => {

    mountedRef.current = true;

    const scrambleStart =
      performance.now();

    let initializingFrame:
      number | null =
      null;

    const statusTimers:
      ReturnType<typeof setTimeout>[] = [];

    const cursorTimers:
      ReturnType<typeof setTimeout>[] = [];

    let currentLine = 0;
    let currentCharacter = 0;

    let lineTimer:
      ReturnType<typeof setInterval> | null =
      null;

    let lineDelayTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    let group03ContentTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    let group03CodeTimer:
      ReturnType<typeof setInterval> | null =
      null;

    let group02StartTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    let group02TitleFrame:
      number | null =
      null;

    let subtitleTimer:
      ReturnType<typeof setInterval> | null =
      null;

    let loadingBarStartTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    let loadingFrame:
      number | null =
      null;

    let statusInterval:
      ReturnType<typeof setInterval> | null =
      null;

    /* ==========================================================
       GROUP 01 — INITIALIZING
       ========================================================== */

    const animateInitializing = () => {

      if (!mountedRef.current) {
        return;
      }

      const elapsed =
        performance.now() -
        scrambleStart;

      const progress =
        Math.min(
          elapsed /
          INITIALIZING_DURATION,
          1
        );

      setInitializingProgress(progress);

      if (progress < 1) {

        initializingFrame =
          requestAnimationFrame(
            animateInitializing
          );

      } else {

        const timer = setTimeout(() => {

          if (mountedRef.current) {
            setInitializingCursorVisible(false);
          }

        }, CURSOR_POST_TYPE_DURATION);

        cursorTimers.push(timer);
      }
    };

    initializingFrame =
      requestAnimationFrame(
        animateInitializing
      );

    /* ==========================================================
       GROUP 03 — CODE TYPEWRITER
       ========================================================== */

    const startGroup03Code = () => {

      if (!mountedRef.current) {
        return;
      }

      const fullCode =
        GROUP_03_CODE.join("\n");

      let character = 0;

      group03CodeTimer =
        setInterval(() => {

          if (!mountedRef.current) {
            return;
          }

          character++;

          setGroup03CodeText(
            fullCode.slice(
              0,
              character
            )
          );

          if (
            character >=
            fullCode.length
          ) {

            if (group03CodeTimer) {
              clearInterval(
                group03CodeTimer
              );
              group03CodeTimer = null;
            }
          }

        }, GROUP_03_CODE_SPEED);
    };

    /* ==========================================================
       GROUP 02 — STATUS LINES
       FIX:
       Each line owns its own character counter and writes into
       a stable index. This prevents the old interval/timer
       chain from visually jumping between lines.
       ========================================================== */

    const startStatusLines = () => {

      if (!mountedRef.current) {
        return;
      }

      setStatusVisible(true);
      setStatusLines([]);

      let currentStatusLine = 0;

      const typeStatusLine = () => {

        if (!mountedRef.current) {
          return;
        }

        if (
          currentStatusLine >=
          GROUP_02_STATUS_LINES.length
        ) {

          onComplete();
          return;
        }

        const lineIndex =
          currentStatusLine;

        const text =
          GROUP_02_STATUS_LINES[
            lineIndex
          ];

        let character = 0;

        /* Start the new line with an explicit empty value. */
        setStatusLines(previous => {

          const updated = [
            ...previous
          ];

          updated[lineIndex] = "";

          return updated;
        });

        statusInterval =
          setInterval(() => {

            if (!mountedRef.current) {
              return;
            }

            character++;

            const visibleText =
              text.slice(
                0,
                character
              );

            setStatusLines(previous => {

              const updated = [
                ...previous
              ];

              updated[lineIndex] =
                visibleText;

              return updated;
            });

            if (
              character >=
              text.length
            ) {

              if (statusInterval) {
                clearInterval(
                  statusInterval
                );
                statusInterval = null;
              }

              currentStatusLine++;

              const nextTimer =
                setTimeout(
                  typeStatusLine,
                  STATUS_LINE_DELAY
                );

              statusTimers.push(
                nextTimer
              );
            }

          }, STATUS_LINE_SPEED);
      };

      typeStatusLine();
    };

    /* ==========================================================
       GROUP 02 — LOADING BAR
       ========================================================== */

    const startLoadingBar = () => {

      if (!mountedRef.current) {
        return;
      }

      setLoadingBarVisible(true);

      const loadingStart =
        performance.now();

      const animateLoading = () => {

        if (!mountedRef.current) {
          return;
        }

        const elapsed =
          performance.now() -
          loadingStart;

        const progress =
          Math.min(
            elapsed /
            LOADING_DURATION,
            1
          );

        setGroup02Progress(progress);

        if (progress < 1) {

          loadingFrame =
            requestAnimationFrame(
              animateLoading
            );

        } else {

          startStatusLines();
        }
      };

      loadingFrame =
        requestAnimationFrame(
          animateLoading
        );
    };

    /* ==========================================================
       GROUP 02 — START
       ========================================================== */

    const startGroup02 = () => {

      if (!mountedRef.current) {
        return;
      }

      setGroup02Visible(true);

      const titleStart =
        performance.now();

      const animateGroup02Title = () => {

        if (!mountedRef.current) {
          return;
        }

        const elapsed =
          performance.now() -
          titleStart;

        const progress =
          Math.min(
            elapsed /
            GROUP_02_TITLE_DURATION,
            1
          );

        setGroup02TitleProgress(progress);

        if (progress < 1) {

          group02TitleFrame =
            requestAnimationFrame(
              animateGroup02Title
            );
        }
      };

      group02TitleFrame =
        requestAnimationFrame(
          animateGroup02Title
        );

      const group02TitleCursorHideTimer =
        setTimeout(() => {

          if (mountedRef.current) {
            setGroup02TitleCursorVisible(false);
          }

        },
        GROUP_02_TITLE_DURATION +
        CURSOR_POST_TYPE_DURATION);

      cursorTimers.push(
        group02TitleCursorHideTimer
      );

      /* --------------------------------------------------------
         RETRIEVING DATA PACKETS
         -------------------------------------------------------- */

      const subtitleStartTimer =
        setTimeout(() => {

          if (!mountedRef.current) {
            return;
          }

          let character = 0;

          subtitleTimer =
            setInterval(() => {

              if (!mountedRef.current) {
                return;
              }

              character++;

              setGroup02Subtitle(
                GROUP_02_SUBTITLE.slice(
                  0,
                  character
                )
              );

              if (
                character >=
                GROUP_02_SUBTITLE.length
              ) {

                if (subtitleTimer) {
                  clearInterval(
                    subtitleTimer
                  );
                  subtitleTimer = null;
                }

                const subtitleCursorHideTimer =
                  setTimeout(() => {

                    if (mountedRef.current) {
                      setGroup02SubtitleCursorVisible(
                        false
                      );
                    }

                  },
                  CURSOR_POST_TYPE_DURATION);

                cursorTimers.push(
                  subtitleCursorHideTimer
                );

                loadingBarStartTimer =
                  setTimeout(() => {

                    if (!mountedRef.current) {
                      return;
                    }

                    startLoadingBar();

                  },
                  LOADING_BAR_START_DELAY);
              }

            },
            GROUP_02_SUBTITLE_SPEED);

        },
        GROUP_02_TITLE_DURATION);

      statusTimers.push(
        subtitleStartTimer
      );
    };

    /* ==========================================================
       GROUP 01 — SYSTEM LINES
       ========================================================== */

    const startNextSystemLine = () => {

      if (!mountedRef.current) {
        return;
      }

      if (
        currentLine >=
        GROUP_01_LINES.length
      ) {

        setAccessVisible(true);

        const accessBlinkDuration =
          ACCESS_CURSOR_BLINKS *
          ACCESS_CURSOR_BLINK_SPEED;

        const accessCursorHideTimer =
          setTimeout(() => {

            if (mountedRef.current) {
              setAccessCursorVisible(false);
            }

          },
          CURSOR_POST_TYPE_DURATION);

        cursorTimers.push(
          accessCursorHideTimer
        );

        const accessRedTimer =
          setTimeout(() => {

            if (!mountedRef.current) {
              return;
            }

            setAccessRed(true);

            group02StartTimer =
              setTimeout(() => {

                if (!mountedRef.current) {
                  return;
                }

                startGroup02();

              },
              GROUP_01_TO_GROUP_02_DELAY);

          },
          accessBlinkDuration);

        statusTimers.push(
          accessRedTimer
        );

        return;
      }

      currentCharacter = 0;

      setGroup01Line(
        currentLine
      );

      setGroup01LineText("");

      if (currentLine === 2) {

        setGroup03Visible(true);

        group03ContentTimer =
          setTimeout(() => {

            if (!mountedRef.current) {
              return;
            }

            setGroup03ContentVisible(true);
            startGroup03Code();

          },
          GROUP_03_CONTENT_DELAY);
      }

      lineTimer =
        setInterval(() => {

          if (!mountedRef.current) {
            return;
          }

          const text =
            GROUP_01_LINES[
              currentLine
            ];

          currentCharacter++;

          setGroup01LineText(
            text.slice(
              0,
              currentCharacter
            )
          );

          if (
            currentCharacter >=
            text.length
          ) {

            if (lineTimer) {
              clearInterval(
                lineTimer
              );
              lineTimer = null;
            }

            currentLine++;

            lineDelayTimer =
              setTimeout(
                startNextSystemLine,
                GROUP_01_LINE_DELAY
              );
          }

        },
        GROUP_01_LINE_SPEED);
    };

    /* ==========================================================
       START GROUP 01 SYSTEM LINES
       ========================================================== */

    const systemLinesStartTimer =
      setTimeout(() => {

        if (!mountedRef.current) {
          return;
        }

        startNextSystemLine();

      },
      INITIALIZING_DURATION + 180);

    /* ==========================================================
       CLEANUP
       ========================================================== */

    return () => {

      mountedRef.current = false;

      if (initializingFrame !== null) {
        cancelAnimationFrame(
          initializingFrame
        );
      }

      if (group02TitleFrame !== null) {
        cancelAnimationFrame(
          group02TitleFrame
        );
      }

      if (loadingFrame !== null) {
        cancelAnimationFrame(
          loadingFrame
        );
      }

      clearTimeout(
        systemLinesStartTimer
      );

      if (lineTimer) {
        clearInterval(
          lineTimer
        );
      }

      if (lineDelayTimer) {
        clearTimeout(
          lineDelayTimer
        );
      }

      if (group03ContentTimer) {
        clearTimeout(
          group03ContentTimer
        );
      }

      if (group03CodeTimer) {
        clearInterval(
          group03CodeTimer
        );
      }

      if (group02StartTimer) {
        clearTimeout(
          group02StartTimer
        );
      }

      if (subtitleTimer) {
        clearInterval(
          subtitleTimer
        );
      }

      if (loadingBarStartTimer) {
        clearTimeout(
          loadingBarStartTimer
        );
      }

      if (statusInterval) {
        clearInterval(
          statusInterval
        );
      }

      statusTimers.forEach(
        timer => clearTimeout(timer)
      );

      cursorTimers.forEach(
        timer => clearTimeout(timer)
      );
    };

  }, [onComplete]);

  /* ============================================================
     RENDER
     ============================================================ */

  return (

    <section className="loading-page">

      <div className="loading-fixed-layer">

        <div className="loading-plus loading-plus-left">
          +
        </div>

        <div className="loading-plus loading-plus-right">
          +
        </div>

        <div className="loading-bottom-information loading-bottom-left">
          V0.01
        </div>

        <div className="loading-bottom-information loading-bottom-right">
          TD-00
        </div>

      </div>

      {/* ======================================================
          GROUP 01
          ====================================================== */}

      <div className="loading-group loading-group-01">

        <div className="loading-group-01-placeholder">

          <div className="loading-title loading-title-initializing">

            {GROUP_01_TITLE.slice(
              0,
              Math.floor(
                GROUP_01_TITLE.length *
                initializingProgress
              )
            )}

            {initializingCursorVisible && (
              <span className="loading-cursor">
                |
              </span>
            )}

          </div>

          <div className="loading-system-lines">

            {GROUP_01_LINES.map(
              (line, index) => (

                <div
                  key={line}
                  className="loading-system-line"
                >

                  {index < group01Line
                    ? line
                    : index === group01Line
                    ? group01LineText
                    : ""}

                  {index === group01Line && (
                    <span className="loading-cursor">
                      |
                    </span>
                  )}

                </div>
              )
            )}

          </div>

          {accessVisible && (

            <div
              className={`
                loading-access
                ${accessRed ? "loading-access-red" : ""}
              `}
            >

              <span>
                {GROUP_01_ACCESS}
              </span>

              {accessCursorVisible && (
                <span className="loading-access-cursor">
                  |
                </span>
              )}

            </div>

          )}

        </div>

      </div>

      {/* ======================================================
          GROUP 03 — RIGHT VISUAL / CODE
          ====================================================== */}

      {group03Visible && (

        <div className="loading-group loading-group-03 loading-group-03-visible">

          <div className="loading-group-03-placeholder">

            <div
              className={`
                loading-group-03-visual
                ${group03ContentVisible ? "loading-group-03-content-visible" : ""}
              `}
            >

              <div className="loading-visual-corner loading-visual-corner-tl" />
              <div className="loading-visual-corner loading-visual-corner-tr" />
              <div className="loading-visual-corner loading-visual-corner-bl" />
              <div className="loading-visual-corner loading-visual-corner-br" />

              <div className="loading-star-field" aria-hidden="true">

                {GROUP_03_STARS.map(
                  (star, index) => (

                    <span
                      key={index}
                      className={`loading-star ${
                        index % 11 === 0
                          ? "loading-star-purple"
                          : index % 7 === 0
                          ? "loading-star-blue"
                          : "loading-star-white"
                      }`}
                      style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                        animationDuration: star.duration,
                      }}
                    />

                  )
                )}

              </div>

              <div className="loading-visual-label">
                STAR FIELD // LIVE
              </div>

            </div>

            <div
              className={`
                loading-code-window
                ${group03ContentVisible ? "loading-group-03-content-visible" : ""}
              `}
            >

              <div className="loading-code-header">

                <div className="loading-code-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="loading-code-filename">
                  00_Loading.tsx
                </div>

              </div>

              <div className="loading-code-content">

                {group03CodeText.split("\n").map(
                  (line, index) => (

                    <div
                      key={index}
                      className="loading-code-line"
                    >
                      {line}
                    </div>

                  )
                )}

                {group03ContentVisible &&
                  group03CodeText.length > 0 && (

                    <span className="loading-code-cursor">
                      |
                    </span>

                  )}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          GROUP 02
          ====================================================== */}

      {group02Visible && (

        <div className="loading-group loading-group-02">

          <div className="loading-group-02-placeholder">

            <div className="loading-title loading-title-access">

              {scrambleText(
                GROUP_02_TITLE,
                group02TitleProgress
              )}

              {group02TitleCursorVisible && (
                <span className="loading-cursor">
                  |
                </span>
              )}

            </div>

            <div className="loading-retrieving">

              {group02Subtitle}

              {group02SubtitleCursorVisible && (
                <span className="loading-cursor">
                  |
                </span>
              )}

            </div>

            {loadingBarVisible && (

              <div className="loading-progress-row">

                <div className="loading-progress-container">

                  <div className="loading-progress-segments">

                    {Array.from({
                      length:
                        LOADING_SEGMENTS
                    }).map(
                      (_, index) => {

                        const segmentProgress =
                          group02Progress *
                          LOADING_SEGMENTS;

                        const filled =
                          index <
                          segmentProgress;

                        const isRed =
                          group02Progress >= 0.5 &&
                          filled;

                        return (

                          <span
                            key={index}
                            className={`
                              loading-progress-segment
                              ${filled ? "loading-progress-segment-filled" : ""}
                              ${isRed ? "loading-progress-segment-red" : ""}
                            `}
                          />

                        );
                      }
                    )}

                  </div>

                </div>

                <div
                  className={`
                    loading-percentage
                    ${
                      group02Progress >= 0.5
                        ? "loading-percentage-red"
                        : ""
                    }
                  `}
                >
                  {Math.floor(
                    group02Progress * 100
                  )}%
                </div>

              </div>
            )}

            {statusVisible && (

              <div className="loading-status-lines">

                {GROUP_02_STATUS_LINES.map(
                  (line, index) => {

                    const typedLine =
                      statusLines[index] || "";

                    const isTyping =
                      index === statusLines.length - 1 &&
                      typedLine.length < line.length;

                    return (

                      <div
                        key={line}
                        className="loading-status-line"
                      >

                        <span className="loading-status-arrow">
                          &gt;
                        </span>

                        <span>
                          {typedLine}
                        </span>

                        {isTyping && (
                          <span className="loading-cursor">
                            |
                          </span>
                        )}

                      </div>

                    );
                  }
                )}

              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}