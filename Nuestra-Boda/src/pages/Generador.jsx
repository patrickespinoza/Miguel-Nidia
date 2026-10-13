
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Link2,
  MessageCircle,
  Users,
  UserRound,
  ExternalLink,
} from "lucide-react";

const palette = {
  olive: "#7F8D7D",
  oliveDark: "#596956",
  oliveLight: "#E4E9E0",
  cream: "#F4EFE4",
  white: "#FFFFFF",
  ink: "#30382F",
  muted: "#777C70",
  border: "#C9D0C3",
};

const NOVIOS = "Miguel & Nidia";

// Debe ser la dirección de la invitación publicada.
// Si el generador está en /generador, se utilizará
// automáticamente el dominio principal.
const INVITACION_URL = `${window.location.origin}/`;

/* =========================================
   CODIFICAR DATOS PARA LA URL
   Compatible con formato ?id=
========================================= */

function crearId(nombre, pases) {
  const datos = JSON.stringify({
    nombre,
    pases,
  });

  const bytes = new TextEncoder().encode(datos);

  let binario = "";

  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });

  const invertido = binario.split("").reverse().join("");

  return btoa(invertido)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");

  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [linkCopiado, setLinkCopiado] = useState(false);
  const [mensajeCopiado, setMensajeCopiado] =
    useState(false);

  const [error, setError] = useState("");

  const limpiarResultado = () => {
    setLink("");
    setMensaje("");
    setLinkCopiado(false);
    setMensajeCopiado(false);
    setError("");
  };

  /* =========================================
     GENERAR INVITACIÓN
  ========================================= */

  const generarLink = () => {
    const nombreLimpio = nombre.trim();
    const numeroPases = Number(pases);

    if (!nombreLimpio) {
      setError("Escribe el nombre del invitado o familia.");
      return;
    }

    if (
      !Number.isInteger(numeroPases) ||
      numeroPases < 1
    ) {
      setError("Ingresa un número válido de pases.");
      return;
    }

    setError("");

    const id = crearId(nombreLimpio, numeroPases);

    const url = `${INVITACION_URL}?id=${encodeURIComponent(
      id
    )}`;

    const textoPases =
      numeroPases === 1
        ? "1 lugar reservado"
        : `${numeroPases} lugares reservados`;

    const mensajeWhatsApp = `💌 *INVITACIÓN ESPECIAL*

Hola, ${nombreLimpio} 🤍

Con mucha alegría queremos compartir contigo uno de los momentos más importantes de nuestras vidas.

*¡Nos casamos!* 💍

Hemos reservado especialmente para ti:

🎟️ *${textoPases}*

Nos encantaría contar con tu presencia y compartir juntos este día tan especial.

Puedes consultar todos los detalles de nuestra boda en el siguiente enlace:

${url}

Te pedimos confirmar tu asistencia desde la invitación.

Con cariño,
*Miguel & Nidia* 🤍`;

    setLink(url);
    setMensaje(mensajeWhatsApp);
    setLinkCopiado(false);
    setMensajeCopiado(false);
  };

  /* =========================================
     COPIAR TEXTO
  ========================================= */

  const copiarTexto = async (texto, tipo) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(texto);
      } else {
        const area = document.createElement("textarea");
        area.value = texto;
        area.style.position = "fixed";
        area.style.opacity = "0";

        document.body.appendChild(area);
        area.select();

        const copiado = document.execCommand("copy");
        document.body.removeChild(area);

        if (!copiado) {
          throw new Error("No se pudo copiar.");
        }
      }

      if (tipo === "link") {
        setLinkCopiado(true);
      } else {
        setMensajeCopiado(true);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo copiar. Intenta nuevamente.");
    }
  };

  /* =========================================
     ESTILOS
  ========================================= */

  const labelClass =
    "mb-2 block text-[10px] uppercase tracking-[0.2em] font-medium";

  const inputClass =
    "w-full border bg-white px-4 py-4 text-sm outline-none transition focus:ring-1 focus:ring-[#7F8D7D]";

  const cardClass =
    "border bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)]";

  return (
    <main
      className="min-h-screen w-full px-4 py-10 sm:px-8 sm:py-16"
      style={{
        backgroundColor: palette.cream,
        color: palette.ink,
      }}
    >
      {/* ENCABEZADO */}
      <motion.header
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-12 max-w-4xl text-center"
      >
        <p
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ color: palette.oliveDark }}
        >
          {NOVIOS}
        </p>

        <div className="mx-auto mt-5 flex items-center justify-center gap-4">
          <span
            className="h-px w-12"
            style={{ backgroundColor: palette.olive }}
          />
          <span
            className="font-serif text-2xl"
            style={{ color: palette.olive }}
          >
            ❦
          </span>
          <span
            className="h-px w-12"
            style={{ backgroundColor: palette.olive }}
          />
        </div>

        <h1 className="mt-5 font-playfair text-3xl sm:text-5xl">
          Generador de invitaciones
        </h1>

        <p
          className="mx-auto mt-5 max-w-lg text-sm leading-7"
          style={{ color: palette.muted }}
        >
          Crea enlaces personalizados para tus invitados
          y comparte su invitación de una manera especial.
        </p>
      </motion.header>

      {/* CONTENIDO */}
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        {/* COLUMNA FORMULARIO */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={cardClass}
          style={{ borderColor: palette.border }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: palette.oliveDark }}
          >
            Personalización
          </p>

          <h2 className="mt-3 font-playfair text-2xl">
            Crear invitación
          </h2>

          <div
            className="mt-5 h-px w-full"
            style={{ backgroundColor: palette.border }}
          />

          {/* NOMBRE */}
          <div className="mt-8">
            <label
              htmlFor="nombre-invitado"
              className={labelClass}
              style={{ color: palette.oliveDark }}
            >
              <span className="flex items-center gap-2">
                <UserRound size={15} />
                Nombre o familia
              </span>
            </label>

            <input
              id="nombre-invitado"
              type="text"
              placeholder="Ej. Familia Hernández"
              value={nombre}
              maxLength={100}
              onChange={(e) => {
                setNombre(e.target.value);
                limpiarResultado();
              }}
              className={inputClass}
              style={{ borderColor: palette.border }}
            />
          </div>

          {/* PASES */}
          <div className="mt-6">
            <label
              htmlFor="pases-invitado"
              className={labelClass}
              style={{ color: palette.oliveDark }}
            >
              <span className="flex items-center gap-2">
                <Users size={15} />
                Número de pases
              </span>
            </label>

            <input
              id="pases-invitado"
              type="number"
              min="1"
              step="1"
              value={pases}
              onChange={(e) => {
                setPases(e.target.value);
                limpiarResultado();
              }}
              className={inputClass}
              style={{ borderColor: palette.border }}
            />

            <p
              className="mt-2 text-xs"
              style={{ color: palette.muted }}
            >
              Lugares reservados para este invitado o familia.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-5 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* GENERAR */}
          <button
            type="button"
            onClick={generarLink}
            className="mt-8 flex w-full items-center justify-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: palette.olive }}
          >
            <Link2 size={17} />
            Generar invitación
          </button>

          {/* LINK GENERADO */}
          {link && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-9"
            >
              <p
                className={labelClass}
                style={{ color: palette.oliveDark }}
              >
                Enlace personalizado
              </p>

              <div
                className="break-all border p-4 text-xs leading-6"
                style={{
                  backgroundColor: palette.cream,
                  borderColor: palette.border,
                }}
              >
                {link}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => copiarTexto(link, "link")}
                  className="flex items-center justify-center gap-2 border px-3 py-3 text-[10px] uppercase tracking-wider transition hover:bg-gray-50"
                  style={{ borderColor: palette.olive }}
                >
                  {linkCopiado ? (
                    <Check size={15} />
                  ) : (
                    <Copy size={15} />
                  )}
                  {linkCopiado ? "Copiado" : "Copiar link"}
                </button>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-3 text-[10px] uppercase tracking-wider text-white"
                  style={{ backgroundColor: palette.oliveDark }}
                >
                  <ExternalLink size={15} />
                  Ver invitación
                </a>
              </div>
            </motion.div>
          )}

          {/* MENSAJE WHATSAPP */}
          {link && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 border-t pt-8"
              style={{ borderColor: palette.border }}
            >
              <p
                className={labelClass}
                style={{ color: palette.oliveDark }}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  Mensaje para WhatsApp
                </span>
              </p>

              <p
                className="mt-3 text-xs leading-6"
                style={{ color: palette.muted }}
              >
                Personaliza el mensaje que enviarás a tus
                invitados. La vista previa se actualizará
                automáticamente.
              </p>

              <textarea
                value={mensaje}
                onChange={(e) => {
                  setMensaje(e.target.value);
                  setMensajeCopiado(false);
                }}
                rows={15}
                className="mt-5 w-full resize-y border bg-white p-4 text-sm leading-6 outline-none focus:ring-1 focus:ring-[#7F8D7D]"
                style={{ borderColor: palette.border }}
              />

              <button
                type="button"
                onClick={() => copiarTexto(mensaje, "mensaje")}
                className="mt-4 flex w-full items-center justify-center gap-3 px-5 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:opacity-90"
                style={{ backgroundColor: palette.oliveDark }}
              >
                {mensajeCopiado ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}
                {mensajeCopiado
                  ? "Mensaje copiado"
                  : "Copiar mensaje para WhatsApp"}
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* COLUMNA DERECHA */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: palette.oliveDark }}
          >
            Nuestra boda
          </p>

          <h2 className="mt-3 text-center font-playfair text-3xl">
            Miguel & Nidia
          </h2>

          {/* PORTADA */}
          <div
            className="mt-7 w-full max-w-[430px] border bg-white p-2 shadow-[0_25px_60px_rgba(0,0,0,0.12)] sm:p-3"
            style={{ borderColor: palette.border }}
          >
            <img
              src="/portada1.jpg"
              alt="Portada de Miguel y Nidia"
              className="block h-auto w-full object-contain"
            />
          </div>

          {/* VISTA PREVIA WHATSAPP */}
          {link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 w-full max-w-[430px]"
            >
              <p
                className="mb-4 text-center text-[10px] uppercase tracking-[0.25em]"
                style={{ color: palette.oliveDark }}
              >
                Vista previa del mensaje
              </p>

              <div className="overflow-hidden rounded-xl border border-[#DADDD5] shadow-[0_15px_40px_rgba(0,0,0,0.07)]">
                {/* CABECERA */}
                <div className="flex items-center gap-3 bg-[#F6F6F3] px-4 py-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: palette.olive }}
                  >
                    <UserRound size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {nombre.trim()}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Vista previa de WhatsApp
                    </p>
                  </div>
                </div>

                {/* BURBUJA */}
                <div className="bg-[#EAE6DD] p-4 sm:p-5">
                  <div className="ml-auto max-w-[95%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-4 py-3 shadow-sm">
                    <p className="whitespace-pre-wrap break-words text-[13px] leading-6 text-[#26352B]">
                      {mensaje}
                    </p>

                    <p className="mt-2 text-right text-[10px] text-gray-500">
                      Vista previa ✓✓
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* NOTA */}
          <div
            className="mt-8 w-full max-w-[430px] border p-5 text-center"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.oliveLight,
            }}
          >
            <p className="text-xs leading-6">
              Cada enlace incluye el nombre del invitado
              y los pases asignados. La confirmación
              se realizará directamente por WhatsApp.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
