
import React, { useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5218112283507";

export default function ConfirmacionAsistencia() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !asistencia) {
      setError(
        "Por favor escribe tu nombre y selecciona si asistirás."
      );
      return;
    }

    if (asistencia === "Sí asistiré") {
      const cantidad = Number(invitados);

      if (
        !invitados ||
        !Number.isInteger(cantidad) ||
        cantidad < 1
      ) {
        setError(
          "Por favor indica un número válido de asistentes."
        );
        return;
      }
    }

    const textoWhatsApp = [
      "💌 *CONFIRMACIÓN DE ASISTENCIA*",
      "💍 *Boda de Miguel & Nidia*",
      "",
      `👤 *Nombre:* ${nombre.trim()}`,
      `📋 *Asistencia:* ${asistencia}`,
      ...(asistencia === "Sí asistiré"
        ? [`👥 *Número de asistentes:* ${invitados}`]
        : []),
      ...(mensaje.trim()
        ? ["", `💬 *Mensaje:* ${mensaje.trim()}`]
        : []),
      "",
      "Muchas gracias. 🤍",
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(textoWhatsApp);

    // Abrir WhatsApp directamente.
    window.location.href = whatsappURL;
  };

  const inputClass = `
    w-full bg-white border border-[#7F8D7D]/25
    text-black px-5 py-4 outline-none transition
    focus:border-[#7F8D7D]
    placeholder:text-black/35
  `;

  const labelClass = `
    block mb-2 uppercase tracking-[0.18em]
    text-[10px] sm:text-xs text-[#7F8D7D]
  `;

  const optionClass = (selected) => `
    py-4 px-4 border uppercase tracking-[0.12em]
    text-xs transition-all duration-300
    ${
      selected
        ? "bg-[#7F8D7D] border-[#7F8D7D] text-white"
        : "bg-white border-[#7F8D7D]/30 text-black hover:border-[#7F8D7D]"
    }
  `;

  return (
    <section
      className="
        w-full bg-[#7F8D7D]
        px-5 sm:px-8 py-20 sm:py-24
        overflow-hidden
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        {/* ENCABEZADO */}
        <div className="text-center">
          <p
            className="
              uppercase tracking-[0.28em]
              text-white/70 text-[10px] sm:text-xs
            "
          >
            Miguel & Nidia
          </p>

          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="w-12 h-px bg-white/40" />
            <span className="text-white text-lg">❦</span>
            <span className="w-12 h-px bg-white/40" />
          </div>

          <h2
            className="
              mt-6 text-4xl sm:text-5xl md:text-6xl
              font-playfair text-white leading-tight
            "
          >
            Confirmación
            <br />
            de Asistencia
          </h2>

          <p
            className="
              mt-6 text-sm sm:text-base text-white/75
              leading-relaxed max-w-lg mx-auto
            "
          >
            Será muy especial compartir este día contigo.
            Por favor confírmanos si podremos contar
            con tu presencia.
          </p>
        </div>

        {/* FORMULARIO */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="
            mt-12 bg-[#F4EFE4]
            px-6 sm:px-10 py-10 sm:py-12
            shadow-[0_20px_60px_rgba(0,0,0,0.16)]
            relative
          "
        >
          {/* LÍNEA SUPERIOR */}
          <div
            className="
              absolute top-0 left-1/2
              -translate-x-1/2
              w-24 h-px bg-[#7F8D7D]
            "
          />

          {/* NOMBRE */}
          <div>
            <label htmlFor="nombre-invitado" className={labelClass}>
              Nombre
            </label>

            <input
              id="nombre-invitado"
              type="text"
              placeholder="Nombre y apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={100}
              className={inputClass}
            />
          </div>

          {/* ASISTENCIA */}
          <div className="mt-7">
            <p className={labelClass}>
              ¿Podrás acompañarnos?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setAsistencia("Sí asistiré");
                  setError("");
                }}
                aria-pressed={asistencia === "Sí asistiré"}
                className={optionClass(
                  asistencia === "Sí asistiré"
                )}
              >
                Sí asistiré
              </button>

              <button
                type="button"
                onClick={() => {
                  setAsistencia("No asistiré");
                  setInvitados("");
                  setError("");
                }}
                aria-pressed={asistencia === "No asistiré"}
                className={optionClass(
                  asistencia === "No asistiré"
                )}
              >
                No asistiré
              </button>
            </div>
          </div>

          {/* NÚMERO DE ASISTENTES */}
          {asistencia === "Sí asistiré" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.35 }}
              className="mt-7 overflow-hidden"
            >
              <label
                htmlFor="numero-asistentes"
                className={labelClass}
              >
                Número de asistentes
              </label>

              <input
                id="numero-asistentes"
                type="number"
                min="1"
                step="1"
                placeholder="Ej. 2"
                value={invitados}
                onChange={(e) =>
                  setInvitados(e.target.value)
                }
                className={inputClass}
              />
            </motion.div>
          )}

          {/* MENSAJE */}
          <div className="mt-7">
            <label
              htmlFor="mensaje-novios"
              className={labelClass}
            >
              Mensaje para los novios
            </label>

            <textarea
              id="mensaje-novios"
              placeholder="Escribe unas palabras para Miguel & Nidia..."
              value={mensaje}
              onChange={(e) =>
                setMensaje(e.target.value)
              }
              rows="4"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* ERROR */}
          {error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mt-6 text-center text-sm
                text-red-700 font-medium
              "
            >
              {error}
            </motion.p>
          )}

          {/* BOTÓN WHATSAPP */}
          <button
            type="submit"
            className="
              mt-8 w-full bg-[#7F8D7D]
              text-white py-4 px-6
              uppercase tracking-[0.18em]
              text-xs font-medium
              transition-all duration-300
              hover:bg-[#6F7C6D]
              hover:-translate-y-0.5
              active:scale-[0.99]
              flex items-center justify-center gap-3
            "
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            Confirmar por WhatsApp
          </button>

          <p
            className="
              mt-4 text-center text-xs
              text-[#7F8D7D] leading-relaxed
            "
          >
            Serás dirigido a WhatsApp para enviar
            tu confirmación.
          </p>

          {/* CIERRE */}
          <div
            className="
              mt-9 pt-7 border-t
              border-[#7F8D7D]/20 text-center
            "
          >
            <p
              className="
                font-[Cedarville_Cursive]
                text-[#7F8D7D]
                text-xl sm:text-2xl
              "
            >
              Gracias por ser parte de nuestra historia.
            </p>
          </div>

          {/* LÍNEA INFERIOR */}
          <div
            className="
              absolute bottom-0 left-1/2
              -translate-x-1/2
              w-24 h-px bg-[#7F8D7D]
            "
          />
        </motion.form>
      </motion.div>
    </section>
  );
}
