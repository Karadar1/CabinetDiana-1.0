"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen lg:h-screen">
      {/* Success/Error Message */}
      {submitStatus && (
        <div
          className={`fixed top-4 left-4 right-4 z-50 rounded-lg border p-3 shadow ${
            submitStatus === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex items-center">
            {submitStatus === "success" ? (
              <Check className="mr-2 h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
            )}
            <p
              className={`text-sm ${
                submitStatus === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {submitStatus === "success"
                ? "Mesajul a fost trimis cu succes! Vă vom contacta în curând."
                : "A apărut o eroare. Vă rugăm să încercați din nou."}
            </p>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="mx-auto h-full max-w-7xl px-4 pt-24 pb-6 sm:px-6 sm:pt-28 lg:px-8 lg:py-6">
        <div className="grid h-full items-start gap-8 lg:grid-cols-2 lg:gap-8">
          {/* Form — FIRST on mobile */}
          <div className="order-1 lg:order-1">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Contactați-ne pentru o{" "}
                <span className="text-blue-600">consultație</span>
              </h1>
              <p className="text-sm text-gray-600 sm:text-[15px]">
                Completați formularul și vă contactăm în cel mai scurt timp.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Prenume *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-600 bg-white"
                    placeholder="Introduceți prenumele"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Nume *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-600 bg-white"
                    placeholder="Introduceți numele"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-600 bg-white"
                  placeholder="adresa@email.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-600 bg-white"
                    placeholder="+40 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Subiect *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="">Selectați subiectul</option>
                    <option value="consultation">Consultație generală</option>
                    <option value="emergency">Urgență</option>
                    <option value="therapy">Terapie</option>
                    <option value="other">Altceva</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Mesaj *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-600 bg-white"
                  placeholder="Descrieți pe scurt motivul contactării..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-lg bg-gray-900 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                    Se trimite...
                  </>
                ) : (
                  "Trimite mesajul →"
                )}
              </button>
            </div>
          </div>

          {/* Map + Info — SECOND on mobile */}
          <div className="order-2 lg:order-2">
            <div className="grid h-full grid-rows-[auto,auto,auto] gap-6">
              {/* Map */}
              <div className="relative h-48 overflow-hidden rounded-2xl bg-gray-200 sm:h-56 lg:h-52">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.955233126346!2d21.22804957664207!3d45.75204341418674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d811d534357%3A0x19d207034ceecfd5!2sPsihiatrie%20Timisoara%2C%20Cabinet%20Medical%20dr%20Diana%20Jivanescu!5e0!3m2!1sen!2sro!4v1751038513653!5m2!1sen!2sro"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact Info */}
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Informații de contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2.5">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 font-medium text-gray-900">Adresa</h4>
                      <p className="text-sm text-gray-600">
                        Strada Exemplu Nr. 123
                        <br />
                        Timișoara, Timiș 300001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2.5">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 font-medium text-gray-900">
                        Telefon
                      </h4>
                      <div className="space-y-0.5">
                        <Link
                          href="tel:+40256123456"
                          className="block text-sm text-gray-600 transition-colors hover:text-blue-600"
                        >
                          +40 256 XXX XXX
                        </Link>
                        <Link
                          href="tel:+40756123456"
                          className="block text-sm text-gray-600 transition-colors hover:text-blue-600"
                        >
                          +40 756 XXX XXX
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2.5">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 font-medium text-gray-900">Email</h4>
                      <div className="space-y-0.5">
                        <Link
                          href="mailto:contact@psihiatrie.ro"
                          className="block break-all text-sm text-gray-600 transition-colors hover:text-blue-600"
                        >
                          contact@psihiatrie.ro
                        </Link>
                        <Link
                          href="mailto:cabinet@psihiatrie.ro"
                          className="block break-all text-sm text-gray-600 transition-colors hover:text-blue-600"
                        >
                          cabinet@psihiatrie.ro
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2.5">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 font-medium text-gray-900">
                        Program
                      </h4>
                      <div className="space-y-0.5 text-sm text-gray-600">
                        <p>Luni - Vineri: 08:00 - 20:00</p>
                        <p>Sâmbătă: 09:00 - 14:00</p>
                        <p>Duminică: Închis</p>
                        <p className="mt-1 font-medium text-blue-600">
                          Urgențe: 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
