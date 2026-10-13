
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
  ChevronDown,
} from "lucide-react";

/* =========================================
   CONFIGURACIÓN
========================================= */

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

const OPCIONES_PASES = [1, 2, 3, 4, 5, 6];

const INVITACION_URL =
  `${window.location.origin}/`;

/* =========================================
   CODIFICAR DATOS
   Compatible con ConfirmacionAsistencia
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

  const invertido = binario
    .split("")
    .reverse()
    .join("");

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

  const [linkCopiado, setLinkCopiado] =
    useState(false);

  const [mensajeCopiado, setMensajeCopiado] =
    useState(false);

  const [error, setError] = useState("");

  /* =========================================
     LIMPIAR RESULTADOS
  ========================================= */

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
      setError(
        "Escribe el nombre del invitado o familia."
      );
      return;
    }

    if (!OPCIONES_PASES.includes(numeroPases)) {
      setError(
        "Selecciona una cantidad válida de pases."
      );
      return;
    }

    setError("");

    const id = crearId(
      nombreLimpio,
      numeroPases
    );

    const url =
      `${INVITACION_URL}?id=${encodeURIComponent(id)}`;

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
        const area = document.createElement(
          "textarea"
        );

        area.value = texto;
        area.style.position = "fixed";
        area.style.opacity = "0";

        document.body.appendChild(area);
        area.select();

        const copiado =
          document.execCommand("copy");

        document.body.removeChild(area);

        if (!copiado) {
          throw new Error(
            "No se pudo copiar."
          );
        }
      }

      if (tipo === "link") {
        setLinkCopiado(true);
      } else {
        setMensajeCopiado(true);
      }

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        "No se pudo copiar. Intenta nuevamente."
      );
    }
  };

  /* =========================================
     ESTILOS RESPONSIVE
  ========================================= */

  const labelClass = `
    mb-2 block
    text-[10px] sm:text-xs
    uppercase tracking-[0.16em]
    font-medium
  `;

  const inputClass = `
    block w-full min-w-0
    border bg-white
    px-3 sm:px-4 py-4
    text-base sm:text-sm
    outline-none transition
    focus:ring-1 focus:ring-[#7F8D7D]
  `;

  const cardClass = `
    w-full min-w-0
    border bg-white
    p-4 sm:p-6 lg:p-8
    shadow-[0_18px_50px_rgba(0,0,0,0.06)]
  `;

  const buttonClass = `
    flex min-w-0 w-full
    items-center justify-center
    gap-2
    px-3 sm:px-5 py-4
    text-center
    text-[10px] sm:text-xs
    uppercase tracking-[0.08em] sm:tracking-[0.14em]
    leading-5
    transition
    active:scale-[0.99]
  `;

  return (
    <main
      className="
        min-h-screen
        w-full max-w-full
        overflow-x-hidden
        px-3 sm:px-6 lg:px-8
        py-8 sm:py-14 lg:py-16
      "
      style={{
        backgroundColor: palette.cream,
        color: palette.ink,
      }}
    >
      {/* =====================================
          ENCABEZADO
      ===================================== */}

      <motion.header
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          mx-auto mb-9 sm:mb-12
          w-full max-w-4xl
          px-1 text-center
        "
      >
        <p
          className="
            text-[10px] sm:text-xs
            uppercase
            tracking-[0.2em] sm:tracking-[0.35em]
          "
          style={{
            color: palette.oliveDark,
          }}
        >
          {NOVIOS}
        </p>

        <div
          className="
            mx-auto mt-5
            flex items-center justify-center
            gap-3 sm:gap-4
          "
        >
          <span
            className="h-px w-10 sm:w-12"
            style={{
              backgroundColor: palette.olive,
            }}
          />

          <span
            className="font-serif text-2xl"
            style={{
              color: palette.olive,
            }}
          >
            ❦
          </span>

          <span
            className="h-px w-10 sm:w-12"
            style={{
              backgroundColor: palette.olive,
            }}
          />
        </div>

        <h1
          className="
            mt-5 font-playfair
            text-[27px] leading-tight
            sm:text-4xl lg:text-5xl
            break-words
          "
        >
          Generador de invitaciones
        </h1>

        <p
          className="
            mx-auto mt-5
            max-w-lg
            text-xs sm:text-sm
            leading-6 sm:leading-7
          "
          style={{
            color: palette.muted,
          }}
        >
          Crea enlaces personalizados para tus
          invitados y comparte su invitación
          de una manera especial.
        </p>
      </motion.header>

      {/* =====================================
          CONTENIDO PRINCIPAL
      ===================================== */}

      <div
        className="
          mx-auto grid
          w-full max-w-6xl
          min-w-0
          grid-cols-1
          gap-8 lg:gap-10
          lg:grid-cols-2
          items-start
        "
      >
        {/* ===================================
            COLUMNA IZQUIERDA
        =================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className={cardClass}
          style={{
            borderColor: palette.border,
          }}
        >
          <p
            className="
              text-[10px]
              uppercase tracking-[0.2em]
            "
            style={{
              color: palette.oliveDark,
            }}
          >
            Personalización
          </p>

          <h2
            className="
              mt-3 font-playfair
              text-2xl sm:text-3xl
            "
          >
            Crear invitación
          </h2>

          <div
            className="mt-5 h-px w-full"
            style={{
              backgroundColor: palette.border,
            }}
          />

          {/* NOMBRE */}
          <div className="mt-7">
            <label
              htmlFor="nombre-invitado"
              className={labelClass}
              style={{
                color: palette.oliveDark,
              }}
            >
              <span
                className="
                  flex items-center gap-2
                "
              >
                <UserRound
                  size={15}
                  className="shrink-0"
                />

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
              style={{
                borderColor: palette.border,
              }}
            />
          </div>

          {/* ===================================
              DROPDOWN DE PASES
          =================================== */}

          <div className="mt-6">
            <label
              htmlFor="pases-invitado"
              className={labelClass}
              style={{
                color: palette.oliveDark,
              }}
            >
              <span
                className="
                  flex items-center gap-2
                "
              >
                <Users
                  size={15}
                  className="shrink-0"
                />

                Número de pases
              </span>
            </label>

            <div className="relative w-full min-w-0">
              <select
                id="pases-invitado"
                value={pases}
                onChange={(e) => {
                  setPases(e.target.value);
                  limpiarResultado();
                }}
                className={`
                  ${inputClass}
                  appearance-none
                  cursor-pointer
                  pr-12
                `}
                style={{
                  borderColor: palette.border,
                }}
              >
                {OPCIONES_PASES.map(
                  (cantidad) => (
                    <option
                      key={cantidad}
                      value={cantidad}
                    >
                      {cantidad}{" "}
                      {cantidad === 1
                        ? "pase"
                        : "pases"}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={18}
                className="
                  pointer-events-none
                  absolute right-4 top-1/2
                  -translate-y-1/2
                "
                style={{
                  color: palette.oliveDark,
                }}
              />
            </div>

            <p
              className="
                mt-2 text-xs leading-5
              "
              style={{
                color: palette.muted,
              }}
            >
              Lugares reservados para este
              invitado o familia.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              className="
                mt-5 break-words
                text-sm text-red-700
              "
            >
              {error}
            </p>
          )}

          {/* GENERAR LINK */}
          <button
            type="button"
            onClick={generarLink}
            className={`
              ${buttonClass}
              mt-8
              text-white
              hover:opacity-90
            `}
            style={{
              backgroundColor: palette.olive,
            }}
          >
            <Link2
              size={17}
              className="shrink-0"
            />

            <span>
              Generar invitación
            </span>
          </button>

          {/* ===================================
              ENLACE GENERADO
          =================================== */}

          {link && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                mt-8
                w-full min-w-0
              "
            >
              <p
                className={labelClass}
                style={{
                  color: palette.oliveDark,
                }}
              >
                Enlace personalizado
              </p>

              {/* CONTENEDOR RESPONSIVE */}
              <div
                className="
                  w-full min-w-0
                  max-w-full
                  overflow-hidden
                  border p-3 sm:p-4
                "
                style={{
                  backgroundColor: palette.cream,
                  borderColor: palette.border,
                }}
              >
                <p
                  className="
                    w-full max-w-full
                    min-w-0
                    break-all
                    whitespace-normal
                    text-[11px] sm:text-xs
                    leading-5 sm:leading-6
                    select-all
                  "
                  style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-all",
                  }}
                >
                  {link}
                </p>
              </div>

              {/* BOTONES RESPONSIVE */}
              <div
                className="
                  mt-3 grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    copiarTexto(link, "link")
                  }
                  className={`
                    ${buttonClass}
                    border
                    hover:bg-gray-50
                  `}
                  style={{
                    borderColor: palette.olive,
                  }}
                >
                  {linkCopiado ? (
                    <Check
                      size={16}
                      className="shrink-0"
                    />
                  ) : (
                    <Copy
                      size={16}
                      className="shrink-0"
                    />
                  )}

                  <span>
                    {linkCopiado
                      ? "Enlace copiado"
                      : "Copiar enlace"}
                  </span>
                </button>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${buttonClass}
                    text-white
                  `}
                  style={{
                    backgroundColor:
                      palette.oliveDark,
                  }}
                >
                  <ExternalLink
                    size={16}
                    className="shrink-0"
                  />

                  <span>
                    Ver invitación
                  </span>
                </a>
              </div>
            </motion.div>
          )}

          {/* ===================================
              MENSAJE PARA WHATSAPP
          =================================== */}

          {link && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.05,
              }}
              className="
                mt-9 w-full min-w-0
                max-w-full
                border-t pt-7
              "
              style={{
                borderColor: palette.border,
              }}
            >
              <p
                className={labelClass}
                style={{
                  color: palette.oliveDark,
                }}
              >
                <span
                  className="
                    flex items-center gap-2
                  "
                >
                  <MessageCircle
                    size={16}
                    className="shrink-0"
                  />

                  Mensaje para WhatsApp
                </span>
              </p>

              <p
                className="
                  mt-3 text-xs
                  leading-6
                "
                style={{
                  color: palette.muted,
                }}
              >
                Personaliza el mensaje que
                enviarás a tus invitados.
                La vista previa se actualizará
                automáticamente.
              </p>

              {/* EDITOR RESPONSIVE */}
              <textarea
                value={mensaje}
                onChange={(e) => {
                  setMensaje(e.target.value);
                  setMensajeCopiado(false);
                }}
                rows={12}
                className="
                  mt-5 block
                  w-full min-w-0
                  max-w-full
                  resize-y
                  border bg-white
                  p-3 sm:p-4
                  text-base sm:text-sm
                  leading-6
                  outline-none
                  focus:ring-1
                  focus:ring-[#7F8D7D]
                "
                style={{
                  borderColor: palette.border,
                  overflowWrap: "anywhere",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  copiarTexto(
                    mensaje,
                    "mensaje"
                  )
                }
                className={`
                  ${buttonClass}
                  mt-4 text-white
                  hover:opacity-90
                `}
                style={{
                  backgroundColor:
                    palette.oliveDark,
                }}
              >
                {mensajeCopiado ? (
                  <Check
                    size={17}
                    className="shrink-0"
                  />
                ) : (
                  <Copy
                    size={17}
                    className="shrink-0"
                  />
                )}

                <span className="break-words">
                  {mensajeCopiado
                    ? "Mensaje copiado"
                    : "Copiar mensaje para WhatsApp"}
                </span>
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* ===================================
            COLUMNA DERECHA
        =================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="
            flex w-full min-w-0
            max-w-full
            flex-col items-center
          "
        >
          <p
            className="
              text-[10px]
              uppercase tracking-[0.25em]
            "
            style={{
              color: palette.oliveDark,
            }}
          >
            Nuestra boda
          </p>

          <h2
            className="
              mt-3 text-center
              font-playfair
              text-2xl sm:text-3xl
            "
          >
            Miguel & Nidia
          </h2>

          {/* PORTADA */}
          <div
            className="
              mt-6 sm:mt-7
              w-full min-w-0
              max-w-[430px]
              border bg-white
              p-2 sm:p-3
              shadow-[0_25px_60px_rgba(0,0,0,0.12)]
            "
            style={{
              borderColor: palette.border,
            }}
          >
            <img
              src="/portada1.jpg"
              alt="Portada de Miguel y Nidia"
              className="
                block w-full
                h-auto max-w-full
                object-contain
              "
            />
          </div>

          {/* ===================================
              VISTA PREVIA WHATSAPP
          =================================== */}

          {link && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                mt-9 sm:mt-10
                w-full min-w-0
                max-w-[430px]
              "
            >
              <p
                className="
                  mb-4 text-center
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color: palette.oliveDark,
                }}
              >
                Vista previa del mensaje
              </p>

              {/* CONTENEDOR */}
              <div
                className="
                  w-full min-w-0
                  max-w-full
                  overflow-hidden
                  rounded-xl
                  border border-[#DADDD5]
                  shadow-[0_15px_40px_rgba(0,0,0,0.07)]
                "
              >
                {/* CABECERA */}
                <div
                  className="
                    flex min-w-0
                    items-center gap-3
                    bg-[#F6F6F3]
                    px-3 sm:px-4
                    py-3
                  "
                >
                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-full text-white
                    "
                    style={{
                      backgroundColor:
                        palette.olive,
                    }}
                  >
                    <UserRound size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        break-words
                        text-sm font-semibold
                      "
                    >
                      {nombre.trim()}
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-gray-500
                      "
                    >
                      Vista previa de WhatsApp
                    </p>
                  </div>
                </div>

                {/* BURBUJA */}
                <div
                  className="
                    w-full min-w-0
                    bg-[#EAE6DD]
                    p-2 sm:p-4
                  "
                >
                  <div
                    className="
                      ml-auto
                      w-full min-w-0
                      max-w-full
                      rounded-xl rounded-tr-sm
                      bg-[#D9FDD3]
                      px-3 sm:px-4
                      py-3 shadow-sm
                    "
                  >
                    <p
                      className="
                        w-full min-w-0
                        whitespace-pre-wrap
                        break-words
                        text-[12px] sm:text-[13px]
                        leading-5 sm:leading-6
                        text-[#26352B]
                      "
                      style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {mensaje}
                    </p>

                    <p
                      className="
                        mt-3 text-right
                        text-[10px]
                        text-gray-500
                      "
                    >
                      Vista previa ✓✓
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* NOTA INFORMATIVA */}
          <div
            className="
              mt-8
              w-full min-w-0
              max-w-[430px]
              border
              p-4 sm:p-5
              text-center
            "
            style={{
              borderColor: palette.border,
              backgroundColor:
                palette.oliveLight,
            }}
          >
            <p
              className="
                text-xs leading-6
                break-words
              "
            >
              Cada enlace incluye el nombre
              del invitado y los pases asignados.
              La confirmación se realizará
              directamente por WhatsApp.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
