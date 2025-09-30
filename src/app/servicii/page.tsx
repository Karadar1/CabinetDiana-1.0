"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import Link from "next/link";

// Register GSAP plugins safely on the client
gsap.registerPlugin(ScrollTrigger);

// ---------- Data ----------
const services = [
  {
    id: "psihiatrie",
    title: "Consultații Psihiatrice",
    blurb:
      "Evaluare clinică riguroasă și planuri terapeutice personalizate pentru tulburări emoționale și comportamentale.",
    points: [
      "Anamneză completă și diagnostic diferențial",
      "Terapie medicamentoasă modernă, doze minime eficiente",
      "Monitorizare atentă și ajustări progresive",
    ],
  },
  {
    id: "psihoterapie",
    title: "Psihoterapie Individuală",
    blurb:
      "Abordări bazate pe dovezi (CBT, ACT) pentru anxietate, depresie și managementul stresului.",
    points: [
      "Programe structurate pe obiective",
      "Jurnal de progres și homework ghidat",
      "Instrumente digitale pentru follow‑up",
    ],
  },
  {
    id: "grup",
    title: "Psihoterapie de Grup",
    blurb:
      "Spațiu sigur de învățare și sprijin, facilitat de specialiști, pentru consolidarea resurselor personale.",
    points: [
      "Grupuri tematice cu număr redus",
      "Protocol clar și cadru confidențial",
      "Feedback ghidat și exerciții practice",
    ],
  },
  {
    id: "adictii",
    title: "Suport pentru Adicții",
    blurb:
      "Intervenții integrate medical‑psihologice orientate pe prevenirea recăderii și reintegrare.",
    points: [
      "Screening validat și plan multimodal",
      "Managementul craving‑ului și coping skills",
      "Rețea de sprijin familial și social",
    ],
  },
];

// ---------- Helpers ----------
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ---------- Page ----------
export default function ServicesPage() {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Initial page entrance + sticky progress bar
  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // Hero intro
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });

      // Card reveal on scroll
      ScrollTrigger.batch("[data-card]", {
        start: "top 80%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          }),
      });

      // Progress bar
      const bar = document.querySelector("[data-progress]");
      if (bar) {
        gsap.to(bar, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-white text-black">
      {/* Top progress indicator */}
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 w-0 bg-blue-700"
        data-progress
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative isolate px-6 pt-28 pb-16 sm:px-8"
      >
        <div className="mx-auto max-w-[700px] text-center">
          <p
            data-hero-fade
            className="mb-3 text-[11px] tracking-[0.2em] uppercase text-blue-700"
          >
            Servicii
          </p>
          <h1
            data-hero-fade
            className="text-[36px] leading-[1.05] font-[350] tracking-tight sm:text-[48px]"
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, 'Helvetica Neue', Arial, system-ui",
            }}
          >
            Îngrijire medicală modernă, concentrată pe rezultate.
          </h1>
          <p
            data-hero-fade
            className="mt-4 text-[15px] leading-7 text-neutral-600"
          >
            O experiență curată, previzibilă, cu protocoale bazate pe dovezi și
            o echipă atentă la detalii.
          </p>
          <div
            data-hero-fade
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link
              href="#book"
              className="inline-flex items-center rounded-full bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-900 transition-colors"
            >
              Programați o consultație <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Soft gradient accessory */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-gradient-to-b from-blue-50 to-transparent"
        />
      </section>

      {/* Sticky sub‑nav */}
      <nav className=" top-10 z-40 mx-auto mb-10 hidden w-full max-w-3xl rounded-full border border-neutral-200/70 bg-white/70 px-3 py-2 backdrop-blur md:flex">
        <ul className="flex w-full items-center justify-between text-sm text-neutral-600">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                className="rounded-full px-3 py-1.5 hover:text-blue-700"
                href={`#${s.id}`}
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Services grid */}
      <section
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-16 sm:px-8 md:grid-cols-2"
      >
        {services.map((s, i) => (
          <article
            id={s.id}
            key={s.id}
            data-card
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 opacity-0 will-change-transform"
            style={{ transform: "translateY(20px)" }}
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-blue-50 to-white" />
            {/* Slide overlay */}
            <div className="absolute inset-0 z-10 translate-x-[-100%] bg-blue-700 text-white transition-transform duration-500 ease-out group-hover:translate-x-0 group-focus-within:translate-x-0 will-change-transform">
              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <h3 className="text-[20px] font-[500] leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-white/90">
                    {s.blurb}
                  </p>
                  <ul className="mt-4 space-y-1 text-[14px] text-white/90">
                    {s.points.slice(0, 3).map((p, idx) => (
                      <li key={idx} className="relative pl-5">
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white/80" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-[14px]">
                  <Link
                    href="#book"
                    className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 font-medium backdrop-blur hover:bg-white/20 transition-colors"
                  >
                    Programează
                  </Link>
                </div>
              </div>
            </div>
            <header className="mb-2">
              <h2 className="text-[22px] font-[450] leading-tight tracking-tight">
                {s.title}
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-neutral-600">
                {s.blurb}
              </p>
            </header>
            <ul className="mt-4 space-y-2">
              {s.points.map((p, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[15px] leading-6 text-neutral-700"
                >
                  <span className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-700 text-blue-700">
                    <FiCheck className="h-3.5 w-3.5" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <Link
                href="#book"
                className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 font-medium hover:bg-neutral-50"
              >
                Programează
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:items-center">
          <div className="md:col-span-2">
            <h3 className="text-[28px] font-[450] leading-[1.1] tracking-tight">
              De ce pacienții aleg clinica noastră
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-neutral-600">
              Procese transparente, comunicare clară și standarde clinice la
              nivel înalt, într‑un cadru calm și discret.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Acces rapid la specialiști",
              "Planuri personalizate, măsurabile",
              "Confidențialitate și etică",
              "Follow‑up digital și suport continuu",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-blue-700 text-blue-700">
                    <FiCheck className="h-4 w-4" />
                  </span>
                  <p className="text-[15px] leading-6 text-neutral-800">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="book"
        className="relative mx-auto max-w-70 md:max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-white px-6 py-10"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_300px_at_50%_-50%,#0000000D,transparent)]" />
        <h4 className="text-[24px] font-[450] tracking-tight">
          Gata să începem?
        </h4>
        <p className="mt-2 text-[15px] leading-7 text-neutral-600">
          Programați o consultație și primiți un plan clar încă de la prima
          vizită.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full border border-blue-700 text-blue-700 px-5 py-3 text-sm font-medium hover:bg-blue-50"
          >
            Contact
          </Link>
        </div>
      </section>

      <footer className="py-16" />
    </div>
  );
}
