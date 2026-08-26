"use client";


import { useEffect, useRef, useState } from "react";
import IntroStatusPopup from "./IntroStatusPopup/IntroStatusPopup";


type ParticleType =
  | "white"
  | "warm"
  | "blue"
  | "purple";

type GalaxyDustParticle = {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  seed: number;
  speedBias: number;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  brightness: number;
  type: ParticleType;
  seed: number;
  speedBias: number;
};

type ShootingStar = {
  angle: number;
  radius: number;
  speed: number;
  length: number;
  width: number;
  brightness: number;
  type: ParticleType;
  seed: number;
  life: number;
  maxLife: number;
};

type LoadingIntroProps = {
  onComplete?: () => void;
};

export default function LoadingIntro({
  onComplete,
}: LoadingIntroProps) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const shootingCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const pointerDownRef =
    useRef(false);

    
  // A quick tap must NOT trigger acceleration.
  // Acceleration only becomes active after the pointer has been held.
  const pointerHoldStartRef =
    useRef(0);

  const accelerationActiveRef =
    useRef(false);

  const speedRef =
    useRef(0.024);

  const targetSpeedRef =
    useRef(0.024);

    const [statusPopupOpen, setStatusPopupOpen] =
  useState(false);
  console.log("statusPopupOpen =", statusPopupOpen);

  useEffect(() => {
}, []);
    
  /*
  ------------------------------------------------------------
  RELEASE RETURN
  ------------------------------------------------------------
  A short reverse phase after releasing the hold lets the
  central stars visually gather back toward the vanishing point.
  White stars receive the strongest return, so the effect feels
  like the small bright particles are re-forming in the center.
  ------------------------------------------------------------
  */
  const releaseReturnRef =
    useRef(0);

  /*
  ============================================================
  MOUSE / HOVER
  ============================================================
  */

  const mouseRef = useRef({
    x: 0,
    y: 0,

    targetX: 0,
    targetY: 0,

    active: false,
  });

  const sceneRef =
    useRef<HTMLDivElement | null>(null);

  const cursorRef =
    useRef<HTMLDivElement | null>(null);

  const cursorLabelRef =
    useRef<HTMLDivElement | null>(null);

  const loadingNumberRef =
    useRef<HTMLDivElement | null>(null);

  const loadingMessageRef =
    useRef<HTMLDivElement | null>(null);

  const topRightTitleRef =
    useRef<HTMLDivElement | null>(null);

  const topRightSubtitleRef =
    useRef<HTMLDivElement | null>(null);

  const loadingProgressRef =
    useRef(0);

    const studyTitleRef =
  useRef<HTMLDivElement | null>(null);

  const discoverRef =
    useRef<HTMLDivElement | null>(null);

  const loadingBarFillRef =
    useRef<HTMLDivElement | null>(null);

  /*
  ============================================================
  TEXT GROUPS — EDITABLE GUIDE
  ============================================================

  Each group below is intentionally kept together like a visual
  layer/folder. Change only the values inside the group you want.

  POSITION GUIDE
  X = left / right movement in pixels.
  Y = up / down movement in pixels.
  Positive X = right. Negative X = left.
  Positive Y = down. Negative Y = up.

  TYPOGRAPHY GUIDE
  fontFamily   = font name / fallback fonts
  fontSize     = text size
  fontWeight   = thickness / boldness
  lineHeight   = vertical line spacing
  letterSpacing = spacing between letters
  color        = RGBA color; last value is alpha
  opacity      = overall visibility

  Every visible text area has its own group and its own controls.
  Nothing here changes the starfield, particles, hover, cursor or motion.
  */

  const TEXT_GROUPS = {
    /*
    ============================================================
    TEXT GROUP 01 — TOP LEFT
    ============================================================
    */
    topLeft: {
      position: {
        X: "32px",
        Y: "32px",
      },

      title: {
        text: "A STUDY\nOF NEW SPACE",
        fontFamily:
          "Bahnschrift, Arial, Helvetica, sans-serif",
        fontSize: "32px",
        fontWeight: 600,
        lineHeight: "0.98",
        letterSpacing: "0.01em",
        color:
          "rgba(245,245,245,0.92)",
        opacity: 1,
      },

      code: {
        text: "TD-01",
        X: "0px",
        Y: "14px",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "8px",
        fontWeight: 600,
        lineHeight: "1",
        letterSpacing: "0.12em",
        color: "rgba(235,235,235,0.62)",
        opacity: 1,
      },
    },

    /*
    ============================================================
    TEXT GROUP 02 — TOP RIGHT
    ============================================================
    */
    topRight: {
      position: {
        X: "0px",
        Y: "32px",
      },

      title: {
        text: "TEENAGER DESIGN / EXPERIMENTAL FIELD",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "8px",
        fontWeight: 500,
        lineHeight: "1.45",
        letterSpacing: "0.10em",
        color: "rgba(235,235,235,0.62)",
        opacity: 1,
      },

      subtitle: {
        text: "EXPLORING UNKNOWN SPACE",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "8px",
        fontWeight: 500,
        lineHeight: "1.45",
        letterSpacing: "0.10em",
        color: "rgba(235,235,235,0.62)",
        opacity: 1,
        marginTop: "0px",
      },
    },

    /*
    ============================================================
    TEXT GROUP 03 — LOADING
    ============================================================
    */
    loading: {
      position: {
        X: "0px",
        Y: "0px",
      },

      container: {
        left: "3.2%",
        right: "3.2%",
        bottom: "9.2%",
      },

      label: {
        loadingText: "LOADING",
        readyText: "READY",
        X: "0px",
        Y: "0px",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "8px",
        fontWeight: 500,
        lineHeight: "1",
        letterSpacing: "0.16em",
        color: "rgba(235,235,235,0.62)",
        opacity: 1,
      },

      percent: {
        X: "0px",
        Y: "0px",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "8px",
        fontWeight: 500,
        lineHeight: "1",
        letterSpacing: "0.10em",
        color: "rgba(235,235,235,0.62)",
        opacity: 1,
      },

      bar: {
        height: "1px",
        trackColor: "rgba(235,235,235,0.12)",
        trackOpacity: 1,
        fillColor: "rgba(85,155,255,0.95)",
        fillOpacity: 1,
        fillTransition: "width 80ms linear",
      },

      spacing: {
        labelToBar: "7px",
      },
    },

    /*
    ============================================================
    TEXT GROUP 04 — Click Here TO DISCOVER
    ============================================================
    */
    discover: {
      position: {
        X: "0px",
        Y: "0px",
        bottomOffset: "16px",
      },

      text: {
        text: "< CLICK HERE TO DISCOVER >",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        lineHeight: "0",
        letterSpacing: "0.22em",
        color: "rgb(197, 197, 197)",
        opacity: 1,
      },

      glow: {
        animation: "discoverGlowPulse 2.6s ease-in-out infinite",
        textShadow: "0 0 0 rgba(235,235,235,0)",
      },
    },

  };

  /*
  ============================================================
  EFFECT
  ============================================================
  */

  /*
  ============================================================
  INTRO TEXT TIMING
  ============================================================

  Top-left:
  Simple fade-in at page start.

  Top-right:
  Typewriter reveal, title first and subtitle immediately after.

  Center:
  Removed. No center title is displayed.
  ============================================================
  */

  useEffect(() => {
    const element =
      studyTitleRef.current;

    if (!element) {
      return;
    }

    const text =
      TEXT_GROUPS.topLeft.title.text;

    let index = 0;
    let frame = 0;
    let startTime = 0;

    const characterDelay = 42;

    element.textContent = "";

    const type = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed =
        time - startTime;

      const targetIndex =
        Math.min(
          text.length,
          Math.floor(
            elapsed /
              characterDelay
          )
        );

      if (targetIndex !== index) {
        index = targetIndex;
        element.textContent =
          text.slice(0, index);
      }

      if (index < text.length) {
        frame =
          requestAnimationFrame(type);

      }
    };

    frame =
      requestAnimationFrame(type);

    return () => {
      cancelAnimationFrame(frame);
      element.textContent = text;
    };
  }, []);

  useEffect(() => {
    const title =
      topRightTitleRef.current;

    const subtitle =
      topRightSubtitleRef.current;

    if (!title || !subtitle) {
      return;
    }

    const titleText =
      TEXT_GROUPS.topRight.title.text;

    const subtitleText =
      TEXT_GROUPS.topRight.subtitle.text;

    let titleIndex = 0;
    let subtitleIndex = 0;
    let frame = 0;
    let startTime = 0;

    const characterDelay = 34;

    title.textContent = "";
    subtitle.textContent = "";

    const type = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed =
        time - startTime;

      const targetTitleIndex =
        Math.min(
          titleText.length,
          Math.floor(
            elapsed /
              characterDelay
          )
        );

      if (
        targetTitleIndex !==
        titleIndex
      ) {
        titleIndex =
          targetTitleIndex;

        title.textContent =
          titleText.slice(
            0,
            titleIndex
          );
      }

      const subtitleStart =
        titleText.length *
          characterDelay +
        120;

      if (
        elapsed >=
        subtitleStart
      ) {
        subtitleIndex =
          Math.min(
            subtitleText.length,
            Math.floor(
              (
                elapsed -
                subtitleStart
              ) /
                characterDelay
            )
          );

        subtitle.textContent =
          subtitleText.slice(
            0,
            subtitleIndex
          );
      }

      if (
        titleIndex <
          titleText.length ||
        subtitleIndex <
          subtitleText.length
      ) {
        frame =
          requestAnimationFrame(
            type
          );
      }
    };

    frame =
      requestAnimationFrame(
        type
      );

    return () => {
      cancelAnimationFrame(
        frame
      );

      title.textContent =
        titleText;

      subtitle.textContent =
        subtitleText;
    };
  }, []);

  useEffect(() => {
    const canvas =
      canvasRef.current!;

    const shootingCanvas =
      shootingCanvasRef.current!;
      
    const scene =
      sceneRef.current!;

    const cursor =
      cursorRef.current!;

    const cursorLabel =
      cursorLabelRef.current!;

    const loadingNumber =
      loadingNumberRef.current!;

    const loadingMessage =
      loadingMessageRef.current!;

    const discover =
      discoverRef.current!;

    const loadingBarFill =
      loadingBarFillRef.current!;

    if (
      !canvas ||
      !shootingCanvas ||
      !scene ||
      !cursor ||
      !cursorLabel ||
      !loadingNumber ||
      !loadingMessage ||
      !discover ||
      !loadingBarFill
    ) {
      return;
    }

    const ctx =
      canvas.getContext("2d", {
        alpha: false,
      })!;

    const shootingCtx =
      shootingCanvas.getContext("2d", {
        alpha: true,
      })!;

    if (!ctx || !shootingCtx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    let lastTime =
      performance.now();

    const particles: Particle[] =
      [];

    /*
    ============================================================
    BACKGROUND POWDER / GALAXY LAYER
    ============================================================

    A permanent dust field sits behind the crisp stars.
    It forms two irregular, tapered arms around the vanishing
    point, inspired by the supplied powder / galaxy reference.
    It follows the same depth-speed system during acceleration.
    ============================================================
    */

    const galaxyDust: GalaxyDustParticle[] =
      [];

    const GALAXY_DUST_COUNT =
      2850;

    const GALAXY_DUST_MAX_Z =
      2.92;

    /*
    ============================================================
    CONFIG
    ============================================================
    */

    const PARTICLE_COUNT = 1250;

    const VANISH_X = 0.5;
    const VANISH_Y = 0.49;

    const BASE_SPEED = 0.024;

    const MAX_SPEED = 0.98;

    // Prevent repeated quick clicks from accumulating acceleration.
    // The user must actually hold the button for this long.
    const ACCELERATION_HOLD_DELAY = 120;

    const ACCELERATION = 0.068;

    const DECELERATION = 0.055;

    /*
    ------------------------------------------------------------
    COLOR TRAIL LENGTH
    ------------------------------------------------------------
    Slightly shorter than the previous version so blue/purple
    particles keep the accelerated feeling without becoming
    excessively stretched.
    ------------------------------------------------------------
    */
    const COLOR_TRAIL_MULTIPLIER =
      1.38;

    const CENTER_HOLE =
      0.025;

    /*
    ============================================================
    SHOOTING STAR LAYER
    ============================================================
    Independent visual layer.
    It uses the existing speedRef / accelerator state only.
    It does not modify the existing particle system.
    ============================================================
    */

    const shootingStars: ShootingStar[] =
      [];

    const SHOOTING_STAR_MAX =
      42;

    const SHOOTING_STAR_TRIGGER =
      0.13;

    const SHOOTING_STAR_SPAWN_RATE =
      0.055;

    const SHOOTING_STAR_BASE_SPEED =
      110;

    const SHOOTING_STAR_MAX_SPEED =
      750;

    const SHOOTING_STAR_BASE_LENGTH =
      7;

    const SHOOTING_STAR_MAX_LENGTH =
      62;

    const SHOOTING_STAR_BASE_ALPHA =
      0.16;

    const SHOOTING_STAR_MAX_ALPHA =
      0.72;

    function getShootingIntensity() {
      return Math.max(
        0,
        Math.min(
          1,
          (speedRef.current -
            SHOOTING_STAR_TRIGGER) /
            (MAX_SPEED -
              SHOOTING_STAR_TRIGGER)
        )
      );
    }

    function randomShootingType(): ParticleType {
      const r =
        Math.random();

      if (r < 0.54) {
        return "white";
      }

      if (r < 0.78) {
        return "blue";
      }

      if (r < 0.92) {
        return "purple";
      }

      return "warm";
    }

    function spawnShootingStar(
      intensity: number
    ) {
      if (
        shootingStars.length >=
        SHOOTING_STAR_MAX
      ) {
        return;
      }

      const type =
        randomShootingType();

      const angle =
        Math.random() *
          Math.PI *
          2;

      const maxRadius =
        Math.min(
          width,
          height
        ) *
        0.42;

      const radius =
        Math.min(
          maxRadius,
          Math.max(
            10,
            Math.random() *
              maxRadius *
              (0.2 +
                intensity *
                  0.55)
          )
        );

      const speed =
        SHOOTING_STAR_BASE_SPEED +
        intensity *
          (SHOOTING_STAR_MAX_SPEED -
            SHOOTING_STAR_BASE_SPEED) *
          (0.55 +
            Math.random() *
              0.45);

      const length =
        SHOOTING_STAR_BASE_LENGTH +
        intensity *
          (SHOOTING_STAR_MAX_LENGTH -
            SHOOTING_STAR_BASE_LENGTH) *
          (0.55 +
            Math.random() *
              0.45);

      const brightness =
        SHOOTING_STAR_BASE_ALPHA +
        intensity *
          (SHOOTING_STAR_MAX_ALPHA -
            SHOOTING_STAR_BASE_ALPHA) *
          (0.55 +
            Math.random() *
              0.45);

      shootingStars.push({
        angle,
        radius,
        speed,
        length,
        width:
          0.45 +
          intensity *
            (0.9 +
              Math.random() *
                0.7),
        brightness,
        type,
        seed:
          Math.random() *
          Math.PI *
          2,
        life: 0,
        maxLife:
          0.48 +
          Math.random() *
            0.62,
      });
    }

    function drawShootingStars(
      time: number,
      dt: number
    ) {
      shootingCtx.clearRect(
        0,
        0,
        width,
        height
      );

      const intensity =
        getShootingIntensity();

      if (
        intensity <= 0
      ) {
        return;
      }

      const spawnChance =
        SHOOTING_STAR_SPAWN_RATE *
        intensity *
        (dt / 16.67);

      if (
        Math.random() <
        spawnChance
      ) {
        spawnShootingStar(
          intensity
        );
      }

      const cx =
        width * VANISH_X;

      const cy =
        height * VANISH_Y;

      for (
        let i =
          shootingStars.length -
          1;
        i >= 0;
        i--
      ) {
        const star =
          shootingStars[i];

        star.life +=
          dt /
          1000;

        if (
          star.life >=
          star.maxLife
        ) {
          shootingStars.splice(
            i,
            1
          );
          continue;
        }

        star.radius +=
          star.speed *
          (dt / 1000);

        const x =
          cx +
          Math.cos(
            star.angle
          ) *
            star.radius;

        const y =
          cy +
          Math.sin(
            star.angle
          ) *
            star.radius;

        const fadeIn =
          Math.min(
            1,
            star.life /
              0.12
          );

        const fadeOut =
          Math.max(
            0,
            1 -
              (star.life -
                star.maxLife *
                  0.62) /
                (star.maxLife *
                  0.38)
          );

        const alpha =
          star.brightness *
          fadeIn *
          Math.min(
            1,
            fadeOut
          );

        if (
          alpha <= 0
        ) {
          continue;
        }

        const directionX =
          Math.cos(
            star.angle
          );

        const directionY =
          Math.sin(
            star.angle
          );

        const trailLength =
          star.length *
          (0.72 +
            intensity *
              0.9);

        const endX =
          x -
          directionX *
            trailLength;

        const endY =
          y -
          directionY *
            trailLength;

        let headColor =
          `rgba(245,245,245,${alpha})`;

        let glowColor =
          `rgba(255,255,255,${alpha * 0.45})`;

        if (
          star.type === "blue"
        ) {
          headColor =
            `rgba(115,165,255,${alpha})`;

          glowColor =
            `rgba(65,125,255,${alpha * 0.6})`;
        }

        if (
          star.type === "purple"
        ) {
          headColor =
            `rgba(190,145,255,${alpha})`;

          glowColor =
            `rgba(155,80,255,${alpha * 0.6})`;
        }

        if (
          star.type === "warm"
        ) {
          headColor =
            `rgba(255,244,220,${alpha * 0.9})`;

          glowColor =
            `rgba(255,220,175,${alpha * 0.42})`;
        }

        const gradient =
          shootingCtx.createLinearGradient(
            endX,
            endY,
            x,
            y
          );

        gradient.addColorStop(
          0,
          "rgba(255,255,255,0)"
        );

        if (
          star.type === "blue"
        ) {
          gradient.addColorStop(
            0.42,
            `rgba(70,125,255,${alpha * 0.16})`
          );

          gradient.addColorStop(
            0.78,
            `rgba(105,160,255,${alpha * 0.55})`
          );
        } else if (
          star.type === "purple"
        ) {
          gradient.addColorStop(
            0.42,
            `rgba(150,75,255,${alpha * 0.14})`
          );

          gradient.addColorStop(
            0.78,
            `rgba(195,125,255,${alpha * 0.52})`
          );
        } else {
          gradient.addColorStop(
            0.42,
            `rgba(235,235,235,${alpha * 0.12})`
          );

          gradient.addColorStop(
            0.78,
            `rgba(245,245,245,${alpha * 0.42})`
          );
        }

        gradient.addColorStop(
          1,
          headColor
        );

        shootingCtx.lineWidth =
          star.width;

        shootingCtx.lineCap =
          "round";

        shootingCtx.strokeStyle =
          gradient;

        shootingCtx.shadowBlur =
          2 +
          intensity *
            7;

        shootingCtx.shadowColor =
          glowColor;

        shootingCtx.beginPath();

        shootingCtx.moveTo(
          endX,
          endY
        );

        shootingCtx.lineTo(
          x,
          y
        );

        shootingCtx.stroke();

        shootingCtx.shadowBlur =
          0;

        const headRadius =
          0.6 +
          intensity *
            1.15;

        shootingCtx.fillStyle =
          headColor;

        shootingCtx.beginPath();

        shootingCtx.arc(
          x,
          y,
          headRadius,
          0,
          Math.PI * 2
        );

        shootingCtx.fill();
      }

      /*
      ========================================================
      SHOOTING STAR LAYER — VERY SUBTLE MOTION VARIATION
      ========================================================
      */

      if (
        shootingStars.length > 0
      ) {
        shootingCtx.globalCompositeOperation =
          "lighter";

        shootingCtx.globalAlpha =
          0.9 +
          Math.sin(
            time * 0.001 +
              shootingStars[0].seed
          ) *
            0.05;

        shootingCtx.globalCompositeOperation =
          "source-over";

        shootingCtx.globalAlpha = 1;
      }
    }

    /*
    ============================================================
    HOVER MOTION
    ============================================================
    */

    const HOVER_MOVE_X = 14;
    const HOVER_MOVE_Y = 10;

    const HOVER_ROTATE_X = 0.65;
    const HOVER_ROTATE_Y = 0.9;

    /*
    ============================================================
    RESIZE
    ============================================================
    */

    function resize() {
      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width =
        window.innerWidth;

      height =
        window.innerHeight;

      canvas.width =
        Math.floor(
          width * dpr
        );

      canvas.height =
        Math.floor(
          height * dpr
        );

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      shootingCanvas.width =
        Math.floor(
          width * dpr
        );

      shootingCanvas.height =
        Math.floor(
          height * dpr
        );

      shootingCanvas.style.width =
        `${width}px`;

      shootingCanvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      shootingCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    }

    /*
    ============================================================
    PARTICLE TYPE
    ============================================================
    */

    function randomParticleType():
      ParticleType {
      const r =
        Math.random();

      if (r < 0.60) {
        return "white";
      }

      if (r < 0.80) {
        return "warm";
      }

      if (r < 0.93) {
        return "blue";
      }

      return "purple";
    }

    /*
    ============================================================
    RANDOM STAR POSITION
    ============================================================
    */

    function createParticle():
      Particle {
      let x = 0;
      let y = 0;

      /*
      ------------------------------------------------------------
      CENTER DENSITY
      ------------------------------------------------------------
      A portion of the stars is intentionally sampled closer to
      the vanishing point so the center feels fuller and more
      compact instead of forming a large empty hole.
      ------------------------------------------------------------
      */

      const centerCluster =
        Math.random() < 0.38;

      if (centerCluster) {
        const angle =
          Math.random() *
          Math.PI *
          2;

        const radius =
          0.025 +
          Math.pow(
            Math.random(),
            1.85
          ) *
            0.18;

        x =
          VANISH_X +
          Math.cos(angle) *
            radius;

        y =
          VANISH_Y +
          Math.sin(angle) *
            radius *
            (height /
              Math.max(
                width,
                1
              ));

        x =
          Math.max(
            0,
            Math.min(
              1,
              x
            )
          );

        y =
          Math.max(
            0,
            Math.min(
              1,
              y
            )
          );
      } else {
        do {
          x =
            Math.random();

          y =
            Math.random();

          const dx =
            x - VANISH_X;

          const dy =
            (y - VANISH_Y) *
            (width /
              Math.max(
                height,
                1
              ));

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance >
            CENTER_HOLE
          ) {
            break;
          }
        } while (true);
      }

      const type =
        randomParticleType();

      const z =
        0.08 +
        Math.pow(
          Math.random(),
          1.35
        ) *
          0.92;

      let size = 0.7;

      if (
        type === "white"
      ) {
        size =
          0.45 +
          Math.random() *
            1.05;
      }

      if (
        type === "warm"
      ) {
        /*
        Warm cream stars are intentionally smaller in the
        foreground so they don't become oversized blobs.
        */
        size =
          0.68 +
          Math.random() *
            1.05;
      }

      if (
        type === "blue"
      ) {
        size =
          0.7 +
          Math.random() *
            1.2;
      }

      if (
        type === "purple"
      ) {
        size =
          0.7 +
          Math.random() *
            1.2;
      }

      return {
        x,
        y,
        z,

        px: x,
        py: y,

        size,

        brightness:
          0.35 +
          Math.random() *
            0.65,

        type,

        seed:
          Math.random() *
          Math.PI *
          2,

        speedBias:
          0.55 +
          Math.random() *
            1,
      };
    }

    function createParticles() {
      particles.length = 0;

      for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
      ) {
        particles.push(
          createParticle()
        );
      }

      createGalaxyDust();
    }

    function projectParticle(
      p: Particle
    ) {
      const cx =
        width * VANISH_X;

      const cy =
        height * VANISH_Y;

      const perspective =
        0.25 +
        p.z * 1.75;

      const sx =
        cx +
        (p.x - VANISH_X) *
          width *
          perspective;

      const sy =
        cy +
        (p.y - VANISH_Y) *
          height *
          perspective;

      return {
        x: sx,
        y: sy,
        scale:
          perspective,
      };
    }

    function resetParticle(
      p: Particle
    ) {
      p.x =
        Math.random();

      p.y =
        Math.random();

      p.z =
        0.05 +
        Math.random() *
          0.18;

      p.px = p.x;
      p.py = p.y;

      const dx =
        p.x - VANISH_X;

      const dy =
        p.y - VANISH_Y;

      const d =
        Math.sqrt(
          dx * dx +
            dy * dy
        );

      if (
        d < CENTER_HOLE
      ) {
        const angle =
          Math.random() *
          Math.PI *
          2;

        const radius =
          CENTER_HOLE +
          Math.random() *
            0.035;

        p.x =
          VANISH_X +
          Math.cos(angle) *
            radius;

        p.y =
          VANISH_Y +
          Math.sin(angle) *
            radius *
            (width /
              Math.max(
                height,
                1
              ));
      }
    }

    function randomGalaxyDustParticle():
      GalaxyDustParticle {
      const arm =
        Math.random() < 0.5
          ? -1
          : 1;

      /*
      Two opposite arms:
      - arm +1: upper-right
      - arm -1: lower-left
      */

      const directionX =
        0.88 * arm;

      const directionY =
        -0.47 * arm;

      const directionLength =
        Math.sqrt(
          directionX *
            directionX +
            directionY *
              directionY
        );

      const dx =
        directionX /
        directionLength;

      const dy =
        directionY /
        directionLength;

      const perpX = -dy;
      const perpY = dx;

      /*
      Powder-like falloff:
      many particles live near the inner section, but the arm
      continuously thins toward its tip.
      */
      const t =
        Math.pow(
          Math.random(),
          1.18
        );

      const irregular =
        (
          Math.random() +
          Math.random() +
          Math.random()
        ) /
          3 -
        0.5;

      const wave =
        Math.sin(
          t * 17 +
            Math.random() *
              4
        ) *
        0.018;

      const spread =
        0.018 +
        (1 - t) *
          0.055 +
        Math.pow(
          Math.random(),
          2
        ) *
          0.035;

      const centerX =
        VANISH_X +
        dx *
          t *
          0.50;

      const centerY =
        VANISH_Y +
        dy *
          t *
          0.50;

      const x =
        centerX +
        perpX *
          (
            irregular *
              spread +
            wave
          );

      const y =
        centerY +
        perpY *
          (
            irregular *
              spread +
            wave
          ) *
          (
            width /
            Math.max(
              height,
              1
            )
          );

      return {
        x,
        y,

        z:
          0.10 +
          Math.pow(
            Math.random(),
            1.25
          ) *
            1.12,

        size:
          0.28 +
          Math.random() *
            0.75,

        brightness:
          0.16 +
          Math.random() *
            0.46,

        seed:
          Math.random() *
          Math.PI *
          2,

        speedBias:
          0.55 +
          Math.random() *
            0.75,
      };
    }

    function createGalaxyDust() {
      galaxyDust.length = 0;

      for (
        let i = 0;
        i <
        GALAXY_DUST_COUNT;
        i++
      ) {
        galaxyDust.push(
          randomGalaxyDustParticle()
        );
      }
    }

    function drawGalaxyDust(
      time: number,
      dt: number,
      speed: number,
      opacity: number
    ) {
      /*
      Draw this layer first so the sharper stars sit naturally
      above the powder cloud.
      */
      ctx.save();

      for (
        const dust of galaxyDust
      ) {
        const movement =
          speed *
          0.014 *
          dust.speedBias *
          (dt / 16.67);

        if (
          releaseReturnRef.current > 0
        ) {
          /*
          Do not reverse dust.z here. Reversing depth was the
          source of the repeated-click zoom-out behavior.

          Instead, gently gather the powder toward the same
          vanishing point while its depth continues forward.
          */
          const returnStrength =
            Math.min(
              1,
              releaseReturnRef.current /
                0.34
            );

          const gatherAmount =
            0.012 *
            returnStrength *
            (dt / 16.67);

          dust.x +=
            (VANISH_X - dust.x) *
            gatherAmount;

          dust.y +=
            (VANISH_Y - dust.y) *
            gatherAmount;

          dust.z += movement;

        } else {
          dust.z +=
            movement;
        }

        if (
          dust.z >
          GALAXY_DUST_MAX_Z
        ) {
          const replacement =
            randomGalaxyDustParticle();

          dust.x =
            replacement.x;

          dust.y =
            replacement.y;

          dust.z =
            0.08 +
            Math.random() *
              0.16;

          dust.size =
            replacement.size;

          dust.brightness =
            replacement.brightness;

          dust.seed =
            replacement.seed;

          dust.speedBias =
            replacement.speedBias;
        }

        const projected =
          projectParticle({
            x: dust.x,
            y: dust.y,
            z: dust.z,
            px: dust.x,
            py: dust.y,
            size: dust.size,
            brightness:
              dust.brightness,
            type: "white",
            seed: dust.seed,
            speedBias:
              dust.speedBias,
          });

        const pulse =
          0.82 +
          Math.sin(
            time * 0.0008 +
              dust.seed
          ) *
            0.18;

        const alpha =
          dust.brightness *
          pulse *
          opacity *
          Math.min(
            1,
            0.28 +
              projected.scale *
                0.34
          );

        if (
          alpha <= 0
        ) {
          continue;
        }

        const radius =
          Math.max(
            0.22,
            dust.size *
              projected.scale *
              0.42
          );

        /*
        Very subtle blue-white powder.
        */
        ctx.fillStyle =
          `rgba(190,214,242,${alpha * 0.34})`;

        ctx.beginPath();

        ctx.arc(
          projected.x,
          projected.y,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /*
        A tiny warm-white fraction keeps the cloud organic
        instead of looking like a flat blue line.
        */
        if (
          (
            dust.seed %
              1
          ) >
          0.82
        ) {
          ctx.fillStyle =
            `rgba(235,238,232,${alpha * 0.28})`;

          ctx.beginPath();

          ctx.arc(
            projected.x,
            projected.y,
            radius * 0.72,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }

      ctx.restore();
    }

    function drawStar(
      p: Particle,
      x: number,
      y: number,
      scale: number,
      time: number
    ) {
      const pulse =
        0.86 +
        Math.sin(
          time * 0.0012 +
            p.seed
        ) *
          0.14;

      const alpha =
        p.brightness *
        pulse *
        Math.min(
          1,
          0.35 +
            scale * 0.42
        );

      if (
        p.type === "white"
      ) {
        ctx.fillStyle =
          `rgba(235,238,242,${alpha * 0.8})`;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          Math.max(
            0.35,
            p.size *
              scale *
              0.55
          ),
          0,
          Math.PI * 2
        );

        ctx.fill();

        return;
      }

      if (
        p.type === "warm"
      ) {
        const radius =
          Math.max(
            0.65,
            p.size *
              scale *
              0.7
          );

        ctx.shadowBlur =
          Math.min(
            12,
            radius * 5
          );

        ctx.shadowColor =
          "rgba(255,244,220,0.55)";

        ctx.fillStyle =
          `rgba(255,244,220,${alpha})`;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        return;
      }

      if (
        p.type === "blue"
      ) {
        const radius =
          Math.max(
            0.45,
            p.size *
              scale *
              0.58
          );

        ctx.shadowBlur =
          Math.min(
            14,
            radius * 6
          );

        ctx.shadowColor =
          "rgba(55,125,255,0.7)";

        ctx.fillStyle =
          `rgba(65,130,255,${alpha})`;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        return;
      }

      const radius =
        Math.max(
          0.45,
          p.size *
            scale *
            0.58
        );

      ctx.shadowBlur =
        Math.min(
          14,
          radius * 6
        );

      ctx.shadowColor =
        "rgba(160,65,255,0.7)";

      ctx.fillStyle =
        `rgba(180,75,255,${alpha})`;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.shadowBlur = 0;
    }

    function drawTrail(
      p: Particle,
      x: number,
      y: number,
      oldX: number,
      oldY: number,
      speed: number,
      scale: number
    ) {
      if (
        p.type !== "blue" &&
        p.type !== "purple"
      ) {
        return;
      }

      const dx =
        x - oldX;

      const dy =
        y - oldY;

      const distance =
        Math.sqrt(
          dx * dx +
            dy * dy
        );

      if (
        distance < 0.5
      ) {
        return;
      }

      const intensity =
        Math.min(
          1,
          speed / MAX_SPEED
        );

      const trailMultiplier =
        p.type === "purple"
          ? COLOR_TRAIL_MULTIPLIER *
            (0.45 +
              intensity *
                1.82)
          : COLOR_TRAIL_MULTIPLIER *
            (0.45 +
              intensity *
                1.58);

      const tx =
        dx *
        trailMultiplier;

      const ty =
        dy *
        trailMultiplier;

      const startX = x;
      const startY = y;

      const endX =
        x - tx;

      const endY =
        y - ty;

      const gradient =
        ctx.createLinearGradient(
          endX,
          endY,
          startX,
          startY
        );

      if (
        p.type === "blue"
      ) {
        gradient.addColorStop(
          0,
          "rgba(50,110,255,0)"
        );

        gradient.addColorStop(
          0.18,
          "rgba(50,110,255,0.12)"
        );

        gradient.addColorStop(
          0.48,
          "rgba(65,130,255,0.48)"
        );

        gradient.addColorStop(
          0.78,
          "rgba(75,145,255,0.7)"
        );

        gradient.addColorStop(
          1,
          "rgba(105,170,255,0.95)"
        );
      } else {
        gradient.addColorStop(
          0,
          "rgba(150,60,255,0)"
        );

        gradient.addColorStop(
          0.2,
          "rgba(155,65,255,0.1)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(180,70,255,0.4)"
        );

        gradient.addColorStop(
          0.8,
          "rgba(195,80,255,0.68)"
        );

        gradient.addColorStop(
          1,
          "rgba(215,115,255,0.95)"
        );
      }

      const lineWidth =
        p.type === "purple"
          ? 0.65 +
            intensity *
              1.25
          : 0.55 +
            intensity *
              1.15;

      ctx.lineWidth =
        lineWidth *
        Math.min(
          scale,
          2.2
        );

      ctx.lineCap = "round";

      ctx.strokeStyle =
        gradient;

      ctx.shadowBlur =
        3 +
        intensity * 7;

      ctx.shadowColor =
        p.type === "blue"
          ? "rgba(45,110,255,0.45)"
          : "rgba(175,60,255,0.45)";

      ctx.beginPath();

      const midX =
        (startX + endX) *
        0.5;

      const midY =
        (startY + endY) *
        0.5;

      const curveAmount =
        Math.sin(p.seed) *
        Math.min(
          5,
          intensity * 5
        );

      ctx.moveTo(
        startX,
        startY
      );

      ctx.quadraticCurveTo(
        midX + curveAmount,
        midY + curveAmount,
        endX,
        endY
      );

      ctx.stroke();

      ctx.shadowBlur = 0;
    }

    function drawCenterGlow() {
      const cx =
        width * VANISH_X;

      const cy =
        height * VANISH_Y;

      const radius =
        Math.min(
          width,
          height
        ) * 0.16;

      const gradient =
        ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          radius
        );

      gradient.addColorStop(
        0,
        "rgba(20,30,65,0.045)"
      );

      gradient.addColorStop(
        0.45,
        "rgba(10,15,35,0.018)"
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        cx - radius,
        cy - radius,
        radius * 2,
        radius * 2
      );
    }

    function handlePointerMove(
      event: PointerEvent
    ) {
      mouseRef.current.targetX =
        event.clientX;

      mouseRef.current.targetY =
        event.clientY;

      mouseRef.current.active =
        true;

      cursor.style.left =
        `${event.clientX}px`;

      cursor.style.top =
        `${event.clientY}px`;

      cursor.style.opacity =
        "1";
    }

    function handlePointerLeave() {
      mouseRef.current.active =
        false;

      cursor.style.opacity =
        "0";
    }

    function pointerDown() {
      // Ignore duplicate pointer-down events while already held.
      if (pointerDownRef.current) {
        return;
      }

      pointerDownRef.current = true;
      pointerHoldStartRef.current = performance.now();
      accelerationActiveRef.current = false;

      cursorLabel.style.animation = "none";
      cursorLabel.style.opacity = "0";
    }

    function pointerUp() {
      const wasAccelerating =
        accelerationActiveRef.current;

      pointerDownRef.current = false;
      pointerHoldStartRef.current = 0;
      accelerationActiveRef.current = false;

      // Only the end of a real hold gets the short gather/return motion.
      // A rapid click is treated as a simple tap and does not disturb the
      // starfield state.
      if (wasAccelerating) {
        releaseReturnRef.current = 0.34;
      } else {
        releaseReturnRef.current = 0;
      }

      cursorLabel.style.opacity = "0.58";
      cursorLabel.style.animation =
        "cursorLabelPulse 1.6s ease-in-out infinite";
    }

    function draw(time: number) {
      const dt =
        Math.min(
          32,
          time - lastTime
        );

      lastTime = time;

      // Acceleration is HOLD-only.
      // Fast repeated clicks no longer push the speed upward.
      if (pointerDownRef.current) {
        const heldFor =
          performance.now() -
          pointerHoldStartRef.current;

        if (
          heldFor >=
          ACCELERATION_HOLD_DELAY
        ) {
          accelerationActiveRef.current =
            true;
        }
      }

      targetSpeedRef.current =
        accelerationActiveRef.current
          ? MAX_SPEED
          : BASE_SPEED;

      if (
        speedRef.current <
        targetSpeedRef.current
      ) {
        speedRef.current +=
          ACCELERATION *
          (dt / 16.67);
      } else {
        speedRef.current -=
          DECELERATION *
          (dt / 16.67);
      }

      speedRef.current =
        Math.max(
          BASE_SPEED,
          Math.min(
            MAX_SPEED,
            speedRef.current
          )
        );

      const speed =
        speedRef.current;

      if (
        mouseRef.current.active
      ) {
        mouseRef.current.x +=
          (mouseRef.current.targetX -
            mouseRef.current.x) *
          0.09;

        mouseRef.current.y +=
          (mouseRef.current.targetY -
            mouseRef.current.y) *
          0.09;
      }

      const normalizedX =
        mouseRef.current.active
          ? mouseRef.current.x /
              Math.max(
                width,
                1
              ) -
            0.5
          : 0;

      const normalizedY =
        mouseRef.current.active
          ? mouseRef.current.y /
              Math.max(
                height,
                1
              ) -
            0.5
          : 0;

      const moveX =
        -normalizedX *
        HOVER_MOVE_X;

      const moveY =
        -normalizedY *
        HOVER_MOVE_Y;

      const rotateX =
        normalizedY *
        HOVER_ROTATE_X;

      const rotateY =
        -normalizedX *
        HOVER_ROTATE_Y;

      scene.style.transform =
        `translate3d(
          ${moveX}px,
          ${moveY}px,
          0
        )
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.012)`;

      ctx.fillStyle =
        "#000000";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
      ============================================================
      STARFIELD APPEARANCE
      ============================================================

      Stars stay invisible during the early loading phase and
      fade in smoothly from 50% to 65% loading.
      ============================================================
      */

      const starfieldProgress =
        Math.max(
          0,
          Math.min(
            1,
            (
              loadingProgressRef.current -
              50
            ) /
              15
          )
        );

      const starfieldOpacity =
        starfieldProgress *
        starfieldProgress *
        (
          3 -
          2 *
            starfieldProgress
        );

      ctx.globalAlpha =
        starfieldOpacity;

      drawCenterGlow();

      /*
      Permanent powder / galaxy layer.
      It is intentionally behind the crisp foreground stars.
      */
      drawGalaxyDust(
        time,
        dt,
        speed,
        starfieldOpacity
      );

      for (
        const p of particles
      ) {
        const oldProjected =
          projectParticle(p);

        const movement =
          speed *
          0.018 *
          p.speedBias *
          (dt / 16.67);

        /*
        --------------------------------------------------------
        RELEASE RETURN / REVERSE — SAFE VERSION
        --------------------------------------------------------
        IMPORTANT:
        The previous version reversed p.z on release. Because z
        controls the perspective scale, repeated clicks could
        push the whole starfield backwards and create an unwanted
        zoom-out / "leaving the particle container" effect.

        We now keep depth (z) untouched during the return phase
        and pull the particle's normalized position slightly
        toward the vanishing point instead. This preserves the
        central re-gathering feeling without changing the camera
        distance or shrinking the whole field.

        White stars return strongest, warm stars moderately, and
        colored stars only subtly.
        --------------------------------------------------------
        */
        if (
          releaseReturnRef.current > 0
        ) {
          const returnStrength =
            Math.min(
              1,
              releaseReturnRef.current /
                0.34
            );

          const typeStrength =
            p.type === "white"
              ? 1.0
              : p.type === "warm"
                ? 0.62
                : 0.24;

          const gatherAmount =
            0.026 *
            returnStrength *
            typeStrength *
            (dt / 16.67);

          p.x +=
            (VANISH_X - p.x) *
            gatherAmount;

          p.y +=
            (VANISH_Y - p.y) *
            gatherAmount;

          /*
          Keep the actual depth movement running normally so
          repeated click/release cycles can never zoom the scene
          backwards.
          */
          p.z += movement;

        } else {
          p.z += movement;
        }

        const oldX =
          oldProjected.x;

        const oldY =
          oldProjected.y;

        if (
          p.z > 1.72
        ) {
          resetParticle(p);
          continue;
        }

        const projected =
          projectParticle(p);

        const x =
          projected.x;

        const y =
          projected.y;

        const scale =
          projected.scale;

        const margin =
          Math.max(
            width,
            height
          ) * 0.18;

        if (
          x < -margin ||
          x > width + margin ||
          y < -margin ||
          y > height + margin
        ) {
          resetParticle(p);
          continue;
        }

        const trailStrength =
          Math.max(
            0,
            (speed -
              BASE_SPEED) /
              (MAX_SPEED -
                BASE_SPEED)
          );

        if (
          p.type === "blue" ||
          p.type === "purple"
        ) {
          drawTrail(
            p,
            x,
            y,
            oldX,
            oldY,
            speed,
            scale
          );
        } else if (
          p.type === "warm" &&
          trailStrength > 0.12
        ) {
          const dx =
            x - oldX;

          const dy =
            y - oldY;

          const shortMultiplier =
            1.85;

          const shortX =
            x -
            dx *
              trailStrength *
              shortMultiplier;

          const shortY =
            y -
            dy *
              trailStrength *
              shortMultiplier;

          ctx.lineWidth =
            0.32 +
            trailStrength *
              0.42;

          ctx.lineCap =
            "round";

          const warmGradient =
            ctx.createLinearGradient(
              shortX,
              shortY,
              x,
              y
            );

          warmGradient.addColorStop(
            0,
            "rgba(255,244,220,0)"
          );

          warmGradient.addColorStop(
            0.55,
            "rgba(255,244,220,0.10)"
          );

          warmGradient.addColorStop(
            1,
            "rgba(255,244,220,0.38)"
          );

          ctx.strokeStyle =
            warmGradient;

          ctx.beginPath();

          ctx.moveTo(
            shortX,
            shortY
          );

          ctx.lineTo(
            x,
            y
          );

          ctx.stroke();
        }

        drawStar(
          p,
          x,
          y,
          scale,
          time
        );
      }

      if (
        releaseReturnRef.current > 0
      ) {
        releaseReturnRef.current =
          Math.max(
            0,
            releaseReturnRef.current -
              dt / 1000
          );
      }

      /*
      ============================================================
      SHOOTING LAYER
      ============================================================
      Drawn independently after the existing starfield.
      Existing particle behavior above remains unchanged.
      ============================================================
      */

      ctx.globalAlpha = 1;

      drawShootingStars(
        time,
        dt
      );

      animationFrame =
        requestAnimationFrame(
          draw
        );
    }

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    window.addEventListener(
      "pointerdown",
      pointerDown,
      { passive: true }
    );

    window.addEventListener(
      "pointerup",
      pointerUp,
      { passive: true }
    );

    window.addEventListener(
      "pointercancel",
      pointerUp,
      { passive: true }
    );

    window.addEventListener(
      "blur",
      pointerUp
    );

    let loadingTimeout: number | undefined;
    let loadingCancelled = false;
    let introCompleted = false;
    let discoverReady = false;
    let touchStartY = 0;

    const loadingDuration =
      3000;

    const loadingStart =
      performance.now();

    function updateLoading(
      currentTime: number
    ) {
      if (loadingCancelled) {
        return;
      }

      const elapsed =
        currentTime -
        loadingStart;

      const progress =
        Math.min(
          100,
          Math.floor(
            (elapsed /
              loadingDuration) *
              100
          )
        );

      loadingProgressRef.current =
        progress;

      loadingNumber.textContent =
        `${progress}%`;

      loadingBarFill.style.width =
        `${progress}%`;

      if (
        progress < 100
      ) {
        loadingTimeout =
          requestAnimationFrame(
            updateLoading
          );
        return;
      }

      loadingNumber.textContent =
        "100%";

      loadingBarFill.style.width =
        "100%";

      loadingMessage.textContent =
        TEXT_GROUPS.loading.label.readyText;

      discover.style.opacity =
        "1";

      discover.style.animation =
        TEXT_GROUPS.discover.glow.animation;

      discoverReady = true;
    }

    function completeIntro() {
      if (
        loadingCancelled ||
        introCompleted ||
        !discoverReady
      ) {
        return;
      }

      introCompleted = true;
      onComplete?.();
    }

    function handleWheel() {
      completeIntro();
    }

    function handleTouchStart(
      event: TouchEvent
    ) {
      if (
        event.touches.length > 0
      ) {
        touchStartY =
          event.touches[0].clientY;
      }
    }

    function handleTouchEnd(
      event: TouchEvent
    ) {
      if (
        event.changedTouches.length === 0
      ) {
        return;
      }

      const touchEndY =
        event.changedTouches[0].clientY;

      const swipeDistance =
        touchStartY - touchEndY;

      if (
        Math.abs(
          swipeDistance
        ) > 18
      ) {
        completeIntro();
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: true }
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      { passive: true }
    );

    loadingTimeout =
      requestAnimationFrame(
        updateLoading
      );

    resize();

    createParticles();

    speedRef.current =
      BASE_SPEED;

    targetSpeedRef.current =
      BASE_SPEED;

    releaseReturnRef.current =
      0;

    loadingProgressRef.current =
      0;

    shootingStars.length = 0;

    animationFrame =
      requestAnimationFrame(
        draw
      );

    return () => {
      loadingCancelled = true;

      shootingStars.length = 0;

      shootingCtx.clearRect(
        0,
        0,
        width,
        height
      );

      if (
        loadingTimeout !== undefined
      ) {
        cancelAnimationFrame(
          loadingTimeout
        );
      }

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      window.removeEventListener(
        "pointerdown",
        pointerDown
      );

      window.removeEventListener(
        "pointerup",
        pointerUp
      );

      window.removeEventListener(
        "pointercancel",
        pointerUp
      );

      window.removeEventListener(
        "blur",
        pointerUp
      );

      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );
    };
  }, []);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        cursor: "none",
        touchAction: "none",
        perspective: "900px",
      }}
    >
      <style>
        {`
          @keyframes introFadeIn {
            0% {
              opacity: 0;
              transform: translate3d(0, 6px, 0);
              filter: blur(4px);
            }

            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
              filter: blur(0);
            }
          }

          @keyframes cursorLabelPulse {
            0% {
              opacity: 0.42;
            }

            50% {
              opacity: 0.72;
            }

            100% {
              opacity: 0.42;
            }
          }

          @keyframes discoverGlowPulse {
            0%,
            100% {
              filter: brightness(0.86);
              text-shadow: 0 0 0 rgba(235,235,235,0);
            }

            50% {
              filter: brightness(1.28);
              text-shadow:
                0 0 4px rgba(235,235,235,0.18),
                0 0 10px rgba(235,235,235,0.08);
            }
          }
        `}
      </style>

      {/*
      ============================================================
      TEXT GROUP 01 — TOP LEFT
      ============================================================
      */}
      <div
        style={{
          position: "fixed",
          left: TEXT_GROUPS.topLeft.position.X,
          top: TEXT_GROUPS.topLeft.position.Y,
          transform: "translate3d(0, 0, 0)",
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div
        ref={studyTitleRef}
          style={{
            fontFamily:
              TEXT_GROUPS.topLeft.title.fontFamily,
            fontSize:
              TEXT_GROUPS.topLeft.title.fontSize,
            fontWeight:
              TEXT_GROUPS.topLeft.title.fontWeight,
            lineHeight:
              TEXT_GROUPS.topLeft.title.lineHeight,
            letterSpacing:
              TEXT_GROUPS.topLeft.title.letterSpacing,
            color:
              TEXT_GROUPS.topLeft.title.color,
            opacity:
              TEXT_GROUPS.topLeft.title.opacity,
            textTransform: "uppercase",
            whiteSpace: "pre-line",
          }}
        >
          {TEXT_GROUPS.topLeft.title.text}
        </div>

        <div
          style={{
            marginTop:
              TEXT_GROUPS.topLeft.code.Y,
            marginLeft:
              TEXT_GROUPS.topLeft.code.X,
            fontFamily:
              TEXT_GROUPS.topLeft.code.fontFamily,
            fontSize:
              TEXT_GROUPS.topLeft.code.fontSize,
            fontWeight:
              TEXT_GROUPS.topLeft.code.fontWeight,
            lineHeight:
              TEXT_GROUPS.topLeft.code.lineHeight,
            letterSpacing:
              TEXT_GROUPS.topLeft.code.letterSpacing,
            color:
              TEXT_GROUPS.topLeft.code.color,
            opacity:
              TEXT_GROUPS.topLeft.code.opacity,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {TEXT_GROUPS.topLeft.code.text}
        </div>
      </div>

      {/*
      ============================================================
      TEXT GROUP 02 — TOP RIGHT
      ============================================================
      */}
      <div
        style={{
          position: "fixed",
          top: TEXT_GROUPS.topRight.position.Y,
          right: "32px",
          transform:
            `translate3d(${TEXT_GROUPS.topRight.position.X}, 0, 0)`,
          zIndex: 90,
          pointerEvents: "none",
          textTransform: "uppercase",
          textAlign: "left",
          whiteSpace: "nowrap",
        }}
      >
        <div
          ref={topRightTitleRef}
          style={{
            minHeight: "9px",
            fontFamily:
              TEXT_GROUPS.topRight.title.fontFamily,
            fontSize:
              TEXT_GROUPS.topRight.title.fontSize,
            fontWeight:
              TEXT_GROUPS.topRight.title.fontWeight,
            lineHeight:
              TEXT_GROUPS.topRight.title.lineHeight,
            letterSpacing:
              TEXT_GROUPS.topRight.title.letterSpacing,
            color:
              TEXT_GROUPS.topRight.title.color,
            opacity:
              TEXT_GROUPS.topRight.title.opacity,
          }}
        >
          {TEXT_GROUPS.topRight.title.text}
        </div>

        <div
          ref={topRightSubtitleRef}
          style={{
            minHeight: "9px",
            marginTop:
              TEXT_GROUPS.topRight.subtitle.marginTop,
            fontFamily:
              TEXT_GROUPS.topRight.subtitle.fontFamily,
            fontSize:
              TEXT_GROUPS.topRight.subtitle.fontSize,
            fontWeight:
              TEXT_GROUPS.topRight.subtitle.fontWeight,
            lineHeight:
              TEXT_GROUPS.topRight.subtitle.lineHeight,
            letterSpacing:
              TEXT_GROUPS.topRight.subtitle.letterSpacing,
            color:
              TEXT_GROUPS.topRight.subtitle.color,
            opacity:
              TEXT_GROUPS.topRight.subtitle.opacity,
          }}
        >
          {TEXT_GROUPS.topRight.subtitle.text}
        </div>
      </div>

      {/*
      ============================================================
      TEXT GROUP 03 — LOADING
      ============================================================
      */}
      <div
        style={{
          position: "fixed",
          left: TEXT_GROUPS.loading.container.left,
          right: TEXT_GROUPS.loading.container.right,
          bottom: TEXT_GROUPS.loading.container.bottom,
          transform:
            `translate3d(${TEXT_GROUPS.loading.position.X}, ${TEXT_GROUPS.loading.position.Y}, 0)`,
          zIndex: 90,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom:
              TEXT_GROUPS.loading.spacing.labelToBar,
          }}
        >
          <div
            ref={loadingMessageRef}
            style={{
              transform:
                `translate3d(${TEXT_GROUPS.loading.label.X}, ${TEXT_GROUPS.loading.label.Y}, 0)`,
              fontFamily:
                TEXT_GROUPS.loading.label.fontFamily,
              fontSize:
                TEXT_GROUPS.loading.label.fontSize,
              fontWeight:
                TEXT_GROUPS.loading.label.fontWeight,
              lineHeight:
                TEXT_GROUPS.loading.label.lineHeight,
              letterSpacing:
                TEXT_GROUPS.loading.label.letterSpacing,
              color:
                TEXT_GROUPS.loading.label.color,
              opacity:
                TEXT_GROUPS.loading.label.opacity,
              textTransform: "uppercase",
            }}
          >
            {TEXT_GROUPS.loading.label.loadingText}
          </div>

          <div
            ref={loadingNumberRef}
            style={{
              transform:
                `translate3d(${TEXT_GROUPS.loading.percent.X}, ${TEXT_GROUPS.loading.percent.Y}, 0)`,
              fontFamily:
                TEXT_GROUPS.loading.percent.fontFamily,
              fontSize:
                TEXT_GROUPS.loading.percent.fontSize,
              fontWeight:
                TEXT_GROUPS.loading.percent.fontWeight,
              lineHeight:
                TEXT_GROUPS.loading.percent.lineHeight,
              letterSpacing:
                TEXT_GROUPS.loading.percent.letterSpacing,
              color:
                TEXT_GROUPS.loading.percent.color,
              opacity:
                TEXT_GROUPS.loading.percent.opacity,
            }}
          >
            0%
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: TEXT_GROUPS.loading.bar.height,
            background:
              TEXT_GROUPS.loading.bar.trackColor,
            opacity:
              TEXT_GROUPS.loading.bar.trackOpacity,
            overflow: "hidden",
          }}
        >
          <div
            ref={loadingBarFillRef}
            style={{
              width: "0%",
              height: "100%",
              background:
                TEXT_GROUPS.loading.bar.fillColor,
              opacity:
                TEXT_GROUPS.loading.bar.fillOpacity,
              transition:
                TEXT_GROUPS.loading.bar.fillTransition,
            }}
          />
        </div>
      </div>

      {/*
      ============================================================
      TEXT GROUP 04 — SCROLL TO DISCOVER
      ============================================================
      Hidden until loading reaches 100%, then begins a subtle glow pulse.
      */}
      <div
  ref={discoverRef}
  onClick={() => {
  console.log("DISCOVER CLICKED");
  setStatusPopupOpen(true);
}}
  style={{
    cursor: "pointer",
          position: "fixed",
          left: "50%",
          bottom:
            `calc(${TEXT_GROUPS.loading.container.bottom} - ${TEXT_GROUPS.discover.position.bottomOffset})`,
          transform:
            `translate3d(-50%, 0, 0) translate(${TEXT_GROUPS.discover.position.X}, ${TEXT_GROUPS.discover.position.Y})`,
          zIndex: 90,
          pointerEvents: "auto",
          fontFamily:
            TEXT_GROUPS.discover.text.fontFamily,
          fontSize:
            TEXT_GROUPS.discover.text.fontSize,
          fontWeight:
            TEXT_GROUPS.discover.text.fontWeight,
          lineHeight:
            TEXT_GROUPS.discover.text.lineHeight,
          letterSpacing:
            TEXT_GROUPS.discover.text.letterSpacing,
          color:
            TEXT_GROUPS.discover.text.color,
          opacity: 0,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          filter: "brightness(0.86)",
          textShadow:
            TEXT_GROUPS.discover.glow.textShadow,
        }}
      >
        {TEXT_GROUPS.discover.text.text}
      </div>

      <div
        ref={sceneRef}
        style={{
          position: "absolute",
          inset: "-1.2%",
          transform:
            "translate3d(0,0,0) scale(1.012)",
          transformStyle:
            "preserve-3d",
          willChange:
            "transform",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        <canvas
          ref={shootingCanvasRef}
          className="loading-shooting-layer"
        />
      </div>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          width: "58px",
          height: "58px",
          transform:
            "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 100,
          opacity: 0,
          transition:
            "opacity 160ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange:
            "left, top",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border:
              "1px solid rgba(255,255,255,0.78)",
            borderRadius:
              "50%",
            boxShadow:
              "0 0 18px rgba(255,255,255,0.10)",
            background:
              "rgba(255,255,255,0.015)",
          }}
        />

        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius:
              "50%",
            background:
              "#ffffff",
            boxShadow:
              "0 0 12px rgba(255,255,255,0.65)",
          }}
        />

        <div
          ref={cursorLabelRef}
          style={{
            position: "absolute",
            top: "78px",
            left: "50%",
            transform:
              "translateX(-50%)",
            fontFamily:
              "Arial, Helvetica, sans-serif",
            fontSize: "8px",
            fontWeight: 500,
            letterSpacing:
              "0.22em",
            color:
              "rgba(235,235,235,0.62)",
            whiteSpace:
              "nowrap",
            textTransform:
              "uppercase",
            opacity: 0.58,
            transition:
              "opacity 260ms ease",
            animation:
              "cursorLabelPulse 1.6s ease-in-out infinite",
          }}
        >
          HOLD TO ACCELERATE
        </div>
      </div>

<IntroStatusPopup
  isOpen={statusPopupOpen}
  onClose={() => setStatusPopupOpen(false)}
/>

    </main>
  );
}