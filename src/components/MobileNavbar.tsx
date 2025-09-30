"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const CALL_NUMBER_DISPLAY = "+40 7xx xxx xxx"; // shown to users
const CALL_NUMBER_TEL = "+40700000000"; // tel: link; replace with your real number

const LINKS = [
  { title: "Acasă", href: "/acasa" },
  { title: "Servicii", href: "/servicii" },
  { title: "Echipă", href: "/echipa" },
  { title: "Contact", href: "/contact" },
];

function toHref(href: string) {
  return href.startsWith("/") ? href : `/${href}`;
}

export default function MobileNavSimplifiedBlue() {
  const [open, setOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // ✅ SSR-safe id for aria-controls / target
  const menuId = useId();

  // ---------- Fullscreen slide overlay transition (cover -> push -> uncover) ----------
  const [overlayTitle, setOverlayTitle] = useState<string>("");
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Prefetch routes once
  useEffect(() => {
    // @ts-ignore: next/app exposes prefetch in App Router
    LINKS.forEach((l) => router.prefetch?.(toHref(l.href)));
  }, [router]);

  // When navigation completes to the pending path, slide out the overlay
  useEffect(() => {
    if (!pendingPath) return;
    if (pathname === pendingPath) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      playOverlayOut();
    }
  }, [pathname, pendingPath]);

  const armFallback = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      playOverlayOut();
    }, 1600);
  };

  const playOverlayIn = async (title: string) => {
    if (!overlayRef.current || !titleRef.current) return;

    setIsTransitioning(true);
    setOverlayTitle(title);
    document.documentElement.classList.add("overflow-y-hidden");

    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.set(overlayRef.current, { xPercent: -100, display: "block" });
      tl.set(titleRef.current, { opacity: 0, yPercent: 20 });
      tl.to(overlayRef.current, { xPercent: 0, duration: 0.8 });
      tl.to(
        titleRef.current,
        { opacity: 1, yPercent: 0, duration: 0.4 },
        "-=0.2"
      );
      tl.eventCallback("onComplete", () => resolve());
    });
  };

  const playOverlayOut = () => {
    if (!overlayRef.current || !isTransitioning) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to({}, { duration: 0.2 }); // small hold
    tl.to(overlayRef.current, { xPercent: 100, duration: 0.7 });
    tl.set(overlayRef.current, { display: "none" });
    tl.eventCallback("onComplete", () => {
      setIsTransitioning(false);
      setPendingPath(null);
      document.documentElement.classList.remove("overflow-y-hidden");
    });
  };

  const doPageTransition = async (href: string, title: string) => {
    if (isTransitioning || pathname === href) {
      setOpen(false);
      return;
    }
    setOpen(false);
    await playOverlayIn(title);
    setPendingPath(href);
    router.push(href);
    armFallback();
  };

  // A11y: close menu with Escape; lock body scroll while menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="relative md:hidden">
      {/* Top bar */}
      <div className="fixed left-0 right-0 top-0 z-[60] border-b border-blue-700 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Brand -> navigate with transition to home */}
          <button
            type="button"
            onClick={() => doPageTransition("/", "Acasă")}
            className="flex items-center gap-3"
          >
            <div className="h-7 w-7 rounded-md bg-blue-700" />
            <div className="flex flex-col leading-none text-blue-700">
              <span className="text-[12px] font-extrabold uppercase tracking-[0.18em]">
                Andrei
              </span>
              <span className="mt-[2px] text-[10px] font-extrabold uppercase tracking-[0.24em]">
                Tudor
              </span>
            </div>
          </button>

          {/* Hamburger */}
          <button
            type="button"
            aria-controls={menuId}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-11 w-11 rounded-md border border-blue-700 text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/50"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`block h-[2px] w-6 bg-blue-700 transition-all duration-300 ${
                  open ? "rotate-45 translate-y-[2px]" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-blue-700 transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-blue-700 transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-[2px]" : "translate-y-[6px]"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Overlay + Panel (unscrollable) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] bg-blue-700/10"
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.25 } }}
              exit={{ y: -8, opacity: 0, transition: { duration: 0.2 } }}
              className="fixed left-0 top-14 h-[calc(100vh-56px)] w-full overflow-hidden border-t border-blue-700 bg-white"
            >
              <div id={menuId} className="flex h-full w-full flex-col">
                <ul className="grid flex-1 content-start gap-2 px-4 pt-4 pb-3">
                  {LINKS.map((l) => (
                    <li key={l.title}>
                      <button
                        type="button"
                        onClick={() =>
                          doPageTransition(toHref(l.href), l.title)
                        }
                        disabled={isTransitioning}
                        className={`w-full rounded-md border border-blue-700 px-4 py-4 text-left text-base font-semibold uppercase tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 ${
                          isActive(l.href)
                            ? "bg-blue-700 text-white"
                            : "bg-white text-blue-700 hover:bg-blue-50"
                        } ${
                          isTransitioning ? "cursor-not-allowed opacity-60" : ""
                        }`}
                      >
                        {l.title}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Bottom CTA */}
                <div className="border-blue-100 bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-2">
                  <Link
                    href={`tel:${CALL_NUMBER_TEL}`}
                    className="block w-full rounded-md bg-blue-700 px-4 py-4 text-center text-base font-bold uppercase tracking-wide text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 active:opacity-90"
                  >
                    Sună acum • {CALL_NUMBER_DISPLAY}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen transition overlay (white -> blue gradient possible if you like) */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[70] hidden select-none bg-blue-700 text-white"
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
    </nav>
  );
}
