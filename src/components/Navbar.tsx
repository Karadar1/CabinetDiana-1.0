"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";

/**
 * Update: Paint only AFTER the overlay fully covers the screen.
 * - We run router.push **after** the slide-in completes (awaited),
 *   so the new route can't flash beneath the animation.
 * - Then we wait for pathname to match and slide the overlay out.
 * - Durations are slightly longer for a more cinematic feel.
 */

const TABS = ["acasa", "servicii", "echipa", "contact"] as const;
type TabKey = (typeof TABS)[number];

function toHref(tab: string) {
  return tab.startsWith("/") ? tab : `/${tab}`;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [position, setPosition] = useState({ left: 0, opacity: 0 });
  const [selected, setSelected] = useState<string | null>(null);

  // Transition state
  const [overlayTitle, setOverlayTitle] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  // Refs
  const navRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const timeoutRef = useRef<number | null>(null);

  // Prefetch all tab routes once
  useEffect(() => {
    // @ts-ignore App Router exposes prefetch
    TABS.forEach((t) => router.prefetch?.(toHref(t)));
  }, [router]);

  // When the Next.js pathname updates to the pending path, play the overlay OUT
  useEffect(() => {
    if (!pendingPath) return;
    if (pathname === pendingPath) {
      // Clear fallback
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      playOverlayOut();
    }
  }, [pathname, pendingPath]);

  // Fallback in case route is unusually slow
  const armFallback = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      playOverlayOut();
    }, 1600); // a bit longer since slide-in is longer now
  };

  // Slide IN fully, then resolve (so we can push AFTER cover)
  const playOverlayIn = async (title: string) => {
    if (!overlayRef.current || !titleRef.current) return;

    setIsAnimating(true);
    setOverlayTitle(title);

    // Prevent body scroll during the full-screen cover (optional but nice)
    document.documentElement.classList.add("overflow-y-hidden");

    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.set(overlayRef.current, { xPercent: -100, display: "block" });
      tl.set(titleRef.current, { opacity: 0, yPercent: 20 });

      // Longer, smoother cover
      tl.to(overlayRef.current, { xPercent: 0, duration: 0.8 });
      tl.to(
        titleRef.current,
        { opacity: 1, yPercent: 0, duration: 0.4 },
        "-=0.2"
      );

      tl.eventCallback("onComplete", () => resolve());
    });
  };

  // Slide OUT and clean up
  const playOverlayOut = () => {
    if (!overlayRef.current) return;
    if (!isAnimating) return; // avoid double-out

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to({}, { duration: 0.2 }); // brief hold
    tl.to(overlayRef.current, { xPercent: 100, duration: 0.7 });
    tl.set(overlayRef.current, { display: "none" });
    tl.eventCallback("onComplete", () => {
      setIsAnimating(false);
      setPendingPath(null);
      document.documentElement.classList.remove("overflow-y-hidden");
    });
  };

  const doPageTransition = async (tab: string) => {
    if (isAnimating) return;
    const href = toHref(tab);

    // 1) Play IN and await until overlay fully covers screen
    await playOverlayIn(tab);

    // 2) Now navigate while fully covered — no mid-transition paint
    setPendingPath(href);
    router.push(href);

    // 3) Arm fallback; normal path = usePathname watcher triggers slide-out
    armFallback();
  };

  return (
    <>
      {/* NAV */}
      <ul
        ref={navRef}
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        className="sticky left-1/2 top-[10px] z-50 hidden w-[500px] -translate-x-1/2 justify-around md:flex"
      >
        {TABS.map((tab) => (
          <Tab
            key={tab}
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            setPosition={setPosition}
            onClick={() => {
              setSelected(tab);
              doPageTransition(tab);
            }}
            disabled={isAnimating}
          />
        ))}
        <Cursor position={position} />
      </ul>

      {/* FULLSCREEN TRANSITION OVERLAY */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[60] hidden select-none bg-black text-white"
      >
        <div className="flex h-full w-full items-center justify-center p-6">
          <h2
            ref={titleRef}
            className="text-center text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {overlayTitle}
          </h2>
        </div>
      </div>
    </>
  );
}

function Tab({
  selected,
  text,
  setSelected,
  setPosition,
  onClick,
  disabled,
}: {
  setSelected: (value: string) => void;
  selected: boolean;
  text: string;
  setPosition: (position: { left: number; opacity: number }) => void;
  onClick: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const parentRect = ref.current.parentElement?.getBoundingClientRect();
        if (!parentRect) return;
        const relativeLeft = rect.left - parentRect.left + rect.width / 2 - 5;
        setPosition({ left: relativeLeft, opacity: 1 });
      }}
      onClick={() => {
        if (disabled) return;
        setSelected(text);
        onClick();
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference transition-all duration-200 md:px-5 md:py-3 md:text-base ${
        selected ? "text-2xl font-bold" : ""
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      {text}
    </li>
  );
}

function Cursor({ position }: { position: { left: number; opacity: number } }) {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-10 z-0 h-[10px] w-[10px] rounded-full bg-blue-700"
    />
  );
}
