
import React, { useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5218112283507";

// Debe coincidir con las opciones del generador.
const OPCIONES_PASES = [1, 2, 3, 4, 5, 6];

/* =========================================
   LEER DATOS DEL GENERADOR
   Formato: ?id=...
========================================= */

function obtenerDatosInvitado() {
  const vacio = {
    nombre: "",
    pases: null,
    personalizado: false,
    enlaceInvalido: false,
  };

  try {
    const params = new URLSearchParams(
      window.location.search
    );

    const id = params.get("id");

    if (!id) {
      return {
        ...vacio,
        enlaceInvalido: true,
      };
    }

    const base64 = id
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const relleno = base64.padEnd(
      Math.ceil(base64.length / 4) * 4,
      "="
    );

    const textoInvertido = atob(relleno)
      .split("")
      .reverse()
      .join("");

    const bytes = Uint8Array.from(
      textoInvertido,
      (caracter) => caracter.charCodeAt(0)
    );

    const textoOriginal = new TextDecoder().decode(bytes);
    const datos = JSON.parse(textoOriginal);

    const nombre =
      typeof datos.nombre === "string"
        ? datos.nombre.trim()
        : "";

    const pases = Number(datos.pases);

    if (
      !nombre ||
      nombre.length > 100 ||
      !Number.isSafeInteger(pases) ||
      !OPCIONES_PASES.includes(pases)
    ) {
      return {
        ...vacio,
        enlaceInvalido: true,
      };
    }

    return {
      nombre,
      pases,
      personalizado: true,
      enlaceInvalido: false,
    };
  } catch (error) {
    console.error(
      "Error al leer la invitación:",
      error
    );

    return {
      ...vacio,
      enlaceInvalido: true,
    };
  }
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function ConfirmacionAsistencia() {
  const [datosInvitado] = useState(obtenerDatosInvitado);

  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const nombre = datosInvitado.nombre;
  const pasesAsignados = datosInvitado.pases;
  const tieneInvitacion = datosInvitado.personalizado;

  // Generar únicamente opciones desde 1 hasta
  // el número de pases que indica el generador.
  const opcionesDisponibles = tieneInvitacion
    ? OPCIONES_PASES.filter(
        (cantidad) => cantidad <= pasesAsignados
      )
    : [];

  /* =========================================
     CONFIRMAR POR WHATSAPP
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!tieneInvitacion) {
      setError(
        "El enlace de invitación no es válido. Solicita uno nuevo a los novios."
      );
      return;
    }

    if (!asistencia) {
      setError(
        "Por favor selecciona si podrás acompañarnos."
      );
      return;
    }

    let cantidadConfirmada = 0;

    if (asistencia === "Sí asistiré") {
      if (invitados === "") {
        setError(
          "Por favor selecciona cuántas personas asistirán."
        );
        return;
      }

      cantidadConfirmada = Number(invitados);

      if (
        !Number.isInteger(cantidadConfirmada) ||
        !opcionesDisponibles.includes(cantidadConfirmada)
      ) {
        setError(
          "La cantidad seleccionada no corresponde a los pases asignados."
        );
        return;
      }
    }

    const textoWhatsApp = [
      "💌 *CONFIRMACIÓN DE ASISTENCIA*",
      "💍 *Boda de Miguel & Nidia*",
      "",
      `👤 *Nombre:* ${nombre}`,
      `📋 *Asistencia:* ${asistencia}`,
      `🎟️ *Pases asignados:* ${pasesAsignados}`,
      `👥 *Personas que asistirán:* ${cantidadConfirmada}`,
      ...(mensaje.trim()
        ? [
            "",
            `💬 *Mensaje:* ${mensaje.trim()}`,
          ]
        : []),
      "",
      "Muchas gracias. 🤍",
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(textoWhatsApp);

    window.location.href = whatsappURL;
  };

  /* =========================================
     ESTILOS
  ========================================= */

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

  const inputClass = `
    w-full bg-white border border-[#7F8D7D]/25
    text-black px-5 py-4 outline-none transition
    focus:border-[#7F8D7D]
    placeholder:text-black/35
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
          {/* DECORACIÓN SUPERIOR */}
          <div
            className="
              absolute top-0 left-1/2
              -translate-x-1/2
              w-24 h-px bg-[#7F8D7D]
            "
          />

          {/* INVITACIÓN INVÁLIDA */}
          {!tieneInvitacion && (
            <div
              role="alert"
              className="
                mb-8 border border-red-300
                bg-red-50 px-5 py-5
                text-center text-sm
                leading-relaxed text-red-700
              "
            >
              No pudimos reconocer los datos de tu
              invitación. Por favor solicita tu enlace
              personalizado a los novios.
            </div>
          )}

          {/* TARJETA PERSONALIZADA */}
          {tieneInvitacion && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="
                mb-9 border border-[#7F8D7D]/30
                bg-white px-5 py-7 text-center
              "
            >
              <p
                className="
                  uppercase tracking-[0.22em]
                  text-[10px] text-[#7F8D7D]
                "
              >
                Invitación especial para
              </p>

              <h3
                className="
                  mt-3 font-playfair
                  text-2xl sm:text-3xl
                  text-[#3D493A]
                  break-words
                "
              >
                {nombre}
              </h3>

              <div className="mx-auto mt-5 h-px w-16 bg-[#7F8D7D]/40" />

              <p
                className="
                  mt-5 text-[10px] uppercase
                  tracking-[0.2em] text-[#7F8D7D]
                "
              >
                Lugares reservados
              </p>

              <p
                className="
                  mt-2 font-playfair
                  text-4xl text-[#3D493A]
                "
              >
                {pasesAsignados}
              </p>

              <p className="mt-2 text-xs text-[#7F8D7D]">
                {pasesAsignados === 1
                  ? "Pase asignado"
                  : "Pases asignados"}
              </p>
            </motion.div>
          )}

          {/* NOMBRE */}
          <div>
            <label
              htmlFor="nombre-invitado"
              className={labelClass}
            >
              Nombre del invitado o familia
            </label>

            <input
              id="nombre-invitado"
              type="text"
              value={nombre}
              readOnly
              placeholder="Nombre asignado"
              className={`
                ${inputClass}
                bg-[#E8EBE5]
                cursor-default
              `}
            />

            <p
              className="
                mt-2 text-xs leading-5
                text-[#7F8D7D]
              "
            >
              Este nombre fue asignado desde
              tu invitación personalizada.
            </p>
          </div>

          {/* ASISTENCIA */}
          <div className="mt-7">
            <p className={labelClass}>
              ¿Podrás acompañarnos?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={!tieneInvitacion}
                onClick={() => {
                  setAsistencia("Sí asistiré");
                  setInvitados("");
                  setError("");
                }}
                aria-pressed={
                  asistencia === "Sí asistiré"
                }
                className={`
                  ${optionClass(
                    asistencia === "Sí asistiré"
                  )}
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                `}
              >
                Sí asistiré
              </button>

              <button
                type="button"
                disabled={!tieneInvitacion}
                onClick={() => {
                  setAsistencia("No asistiré");
                  setInvitados("");
                  setError("");
                }}
                aria-pressed={
                  asistencia === "No asistiré"
                }
                className={`
                  ${optionClass(
                    asistencia === "No asistiré"
                  )}
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                `}
              >
                No asistiré
              </button>
            </div>
          </div>

          {/* DROPDOWN DE ASISTENTES */}
          {asistencia === "Sí asistiré" && tieneInvitacion && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="mt-7 overflow-hidden"
            >
              <label
                htmlFor="numero-asistentes"
                className={labelClass}
              >
                Número de asistentes
              </label>

              <div className="relative">
                <select
                  id="numero-asistentes"
                  value={invitados}
                  onChange={(e) => {
                    setInvitados(e.target.value);
                    setError("");
                  }}
                  className="
                    w-full appearance-none
                    border border-[#7F8D7D]/25
                    bg-white px-5 py-4 pr-12
                    text-sm text-[#30382F]
                    outline-none transition
                    cursor-pointer
                    focus:border-[#7F8D7D]
                    focus:ring-1 focus:ring-[#7F8D7D]
                  "
                >
                  <option value="" disabled>
                    Selecciona cuántas personas asistirán
                  </option>

                  {opcionesDisponibles.map((cantidad) => (
                    <option
                      key={cantidad}
                      value={String(cantidad)}
                    >
                      {cantidad}{" "}
                      {cantidad === 1
                        ? "persona"
                        : "personas"}
                    </option>
                  ))}
                </select>

                {/* FLECHA DEL DROPDOWN */}
                <div
                  className="
                    pointer-events-none
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-[#7F8D7D]
                  "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <p
                className="
                  mt-3 text-xs leading-6
                  text-[#7F8D7D]
                "
              >
                Tu invitación incluye{" "}
                <strong>
                  {pasesAsignados}{" "}
                  {pasesAsignados === 1
                    ? "pase"
                    : "pases"}
                </strong>
                . Puedes confirmar hasta esa cantidad
                de personas.
              </p>
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
              rows={4}
              disabled={!tieneInvitacion}
              className={`
                ${inputClass}
                resize-none
                disabled:opacity-60
              `}
            />
          </div>

          {/* MENSAJE DE ERROR */}
          {error && (
            <motion.p
              role="alert"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-6 text-center text-sm
                text-red-700 font-medium
              "
            >
              {error}
            </motion.p>
          )}

          {/* BOTÓN DE CONFIRMACIÓN */}
          <button
            type="submit"
            disabled={!tieneInvitacion}
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
              disabled:opacity-50
              disabled:cursor-not-allowed
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

          {/* DECORACIÓN INFERIOR */}
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
