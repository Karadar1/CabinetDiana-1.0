import React from "react";
import ImageCard from "@/components/ImageCard";

const items = [
  {
    title: "Psihoterapie Individuală",
    blurb:
      "Abordări bazate pe dovezi pentru anxietate, depresie și managementul stresului.",
    src: "/hero.png",
  },
  {
    title: "Consultații Psihiatrice",
    blurb: "Evaluare clinică riguroasă și planuri terapeutice personalizate.",
    src: "/hero.png",
  },
  {
    title: "Psihoterapie de Grup",
    blurb: "Spațiu sigur de învățare și suport, facilitat de specialiști.",
    src: "/hero.png",
  },
];

export default function Echipa() {
  return (
    <main className="mx-auto max-w-9xl px-6 py-24 sm:px-8 lg:py-28">
      {/* Header */}
      <header className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
        <h1
          className="mt-3 text-[38px] leading-[1.05] font-[350] tracking-tight text-neutral-900 sm:text-[46px] lg:text-[56px]"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, 'Helvetica Neue', Arial, system-ui",
          }}
        >
          Îngrijire atentă.
          <br className="hidden sm:block" />
          Rezultate măsurabile.
        </h1>
        <p className="mt-5 text-[16px] leading-7 text-neutral-600 sm:text-[17px]">
          Programe clare, comunicare directă și protocoale bazate pe dovezi—
          într-un cadru calm, discret și predictibil.
        </p>
      </header>

      {/* Grid — bigger gaps */}
      <section className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 md:gap-16 lg:gap-20">
        {items.map((it) => (
          <div key={it.title} className="flex">
            {/* optional wrapper to keep vertical rhythm consistent */}
            <ImageCard {...it} />
          </div>
        ))}
      </section>
    </main>
  );
}
