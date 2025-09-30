"use client";

import React from "react";

import Button from "@/components/Button";
import Image from "next/image";

const MedicalClinicHero: React.FC = () => {
  return (
    <section className="min-h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Hero Content */}
        <div className="flex items-center justify-center px-6 sm:px-8 lg:px-12">
          <div className="w-full max-w-lg">
            {/* Title */}
            <h1 className="mb-4 text-center text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-left lg:text-6xl animate-slide-up">
              Psihiatrie cu <span className="text-blue-700">empatie</span>
            </h1>

            {/* Mobile-only quick reassurance */}
            <p className="md:hidden mt-2 text-center text-base text-gray-600 animate-fade-in">
              Confidențial, fără judecată. Programări rapide direct din telefon.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:justify-center lg:justify-start animate-slide-up-delay-2">
              <Button href="/servicii" mobile>
                Servicii
              </Button>
              <Button href="/contact" mobile>
                Contact
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 border-t border-gray-200 pt-6 animate-slide-up-delay-3">
              <div className="flex items-center justify-center space-x-8 lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">15+</div>
                  <div className="text-sm text-gray-500">Ani experiență</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">5000+</div>
                  <div className="text-sm text-gray-500">
                    Pacienți îngrijiți
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">24/7</div>
                  <div className="text-sm text-gray-500">Asistență</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden overflow-hidden md:block">
          <Image
            src="/hero.png" // in /public
            alt="Consultație într-un mediu calm"
            fill // make it cover the container
            priority // above-the-fold -> preloads
            sizes="(min-width: 1024px) 50vw, 100vw" // 50% grid on lg, full width on md
            className="object-cover"
          />
        </div>
      </div>

      <style jsx>{`
        /* Animations */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        .animate-slide-up-delay-3 {
          animation: slide-up 0.8s ease-out 0.6s both;
        }
      `}</style>
    </section>
  );
};

export default MedicalClinicHero;
