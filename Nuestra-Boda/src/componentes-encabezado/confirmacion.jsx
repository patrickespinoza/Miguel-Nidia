import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ConfirmacionAsistencia() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby8O1AqCbvgKt-4_gh2WEcXJAzfrWFPYFJq730vPDrct_Ya0dpXSshhYXAhy8vnDzsQVA/exec";

  // CAMBIA AQUÍ EL NÚMERO DE WHATSAPP
  // Ejemplo México: 5219611234567
  const WHATSAPP_NUMBER = "5210000000000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !asistencia) {
      setConfirmacion(
        "Por favor completa tu nombre y selecciona si asistirás."
      );
      return;
    }

    if (asistencia === "Sí asistiré" && !invitados) {
      setConfirmacion(
        "Por favor indica el número de personas que asistirán."
      );
      return;
    }

    setEnviando(true);
    setConfirmacion("");

    const fechaConfirmacion = new Date().toLocaleString("es-MX");

    const datos = {
      nombre: nombre.trim(),
      asistencia,
      invitados:
        asistencia === "Sí asistiré"
          ? invitados
          : "0",
      mensaje: mensaje.trim(),
      fecha: fechaConfirmacion,
    };

    try {
      /*
        ===============================
        GUARDAR EN GOOGLE SHEETS / EXCEL
        ===============================
      */
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      setConfirmacion("Confirmación registrada correctamente.");

      /*
        ===============================
        MENSAJE DE WHATSAPP
        ===============================
      */
      const textoWhatsApp = `
Hola, soy ${datos.nombre}.

Confirmación para la boda de Miguel & Nidia.

Asistencia: ${datos.asistencia}
${
  datos.asistencia === "Sí asistiré"
    ? `Número de asistentes: ${datos.invitados}`
    : ""
}

${
  datos.mensaje
    ? `Mensaje: ${datos.mensaje}`
    : ""
}
      `.trim();

      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        textoWhatsApp
      )}`;

      /*
        Pequeña pausa para que el usuario alcance
        a ver que la confirmación fue registrada.
      */
      setTimeout(() => {
        window.location.href = whatsappURL;
      }, 700);
    } catch (error) {
      console.error(error);

      setConfirmacion(
        "Ocurrió un error al enviar la confirmación. Intenta nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      className="
        w-full
        bg-[#7F8D7D]
        px-5
        sm:px-8
        py-20
        sm:py-24
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
        className="
          max-w-2xl
          mx-auto
        "
      >
        {/* ENCABEZADO */}
        <div className="text-center">
          <p
            className="
              uppercase
              tracking-[0.28em]
              text-white/70
              text-[10px]
              sm:text-xs
            "
          >
            Miguel & Nidia
          </p>

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
            "
          >
            <span className="w-12 h-px bg-white/40" />

            <span className="text-white text-lg">
              ❦
            </span>

            <span className="w-12 h-px bg-white/40" />
          </div>

          <h2
            className="
              mt-6
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-playfair
              text-white
              leading-tight
            "
          >
            Confirmación
            <br />
            de Asistencia
          </h2>

          <p
            className="
              mt-6
              text-sm
              sm:text-base
              text-white/75
              leading-relaxed
              max-w-lg
              mx-auto
            "
          >
            Será muy especial compartir este día contigo.
            Por favor confírmanos si podremos contar con tu presencia.
          </p>
        </div>

        {/* FORMULARIO */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mt-12
            bg-[#F4EFE4]
            px-6
            sm:px-10
            py-10
            sm:py-12
            shadow-[0_20px_60px_rgba(0,0,0,0.16)]
            relative
          "
        >
          {/* LÍNEA SUPERIOR */}
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-24
              h-px
              bg-[#7F8D7D]
            "
          />

          {/* NOMBRE */}
          <div>
            <label
              className="
                block
                mb-2
                uppercase
                tracking-[0.18em]
                text-[10px]
                sm:text-xs
                text-[#7F8D7D]
              "
            >
              Nombre
            </label>

            <input
              type="text"
              placeholder="Nombre y apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={enviando}
              className="
                w-full
                bg-white
                border
                border-[#7F8D7D]/25
                text-black
                px-5
                py-4
                outline-none
                transition
                focus:border-[#7F8D7D]
                placeholder:text-black/35
                disabled:opacity-60
              "
            />
          </div>

          {/* ASISTENCIA */}
          <div className="mt-7">
            <p
              className="
                mb-3
                uppercase
                tracking-[0.18em]
                text-[10px]
                sm:text-xs
                text-[#7F8D7D]
              "
            >
              ¿Podrás acompañarnos?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={enviando}
                onClick={() => setAsistencia("Sí asistiré")}
                className={`
                  py-4
                  px-4
                  border
                  uppercase
                  tracking-[0.12em]
                  text-xs
                  transition-all
                  duration-300
                  disabled:opacity-60

                  ${
                    asistencia === "Sí asistiré"
                      ? "bg-[#7F8D7D] border-[#7F8D7D] text-white"
                      : "bg-white border-[#7F8D7D]/30 text-black hover:border-[#7F8D7D]"
                  }
                `}
              >
                Sí asistiré
              </button>

              <button
                type="button"
                disabled={enviando}
                onClick={() => {
                  setAsistencia("No asistiré");
                  setInvitados("");
                }}
                className={`
                  py-4
                  px-4
                  border
                  uppercase
                  tracking-[0.12em]
                  text-xs
                  transition-all
                  duration-300
                  disabled:opacity-60

                  ${
                    asistencia === "No asistiré"
                      ? "bg-[#7F8D7D] border-[#7F8D7D] text-white"
                      : "bg-white border-[#7F8D7D]/30 text-black hover:border-[#7F8D7D]"
                  }
                `}
              >
                No asistiré
              </button>
            </div>
          </div>

          {/* INVITADOS */}
          {asistencia === "Sí asistiré" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              transition={{ duration: 0.35 }}
              className="mt-7"
            >
              <label
                className="
                  block
                  mb-2
                  uppercase
                  tracking-[0.18em]
                  text-[10px]
                  sm:text-xs
                  text-[#7F8D7D]
                "
              >
                Número de asistentes
              </label>

              <input
                type="number"
                min="1"
                placeholder="Ej. 2"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                disabled={enviando}
                className="
                  w-full
                  bg-white
                  border
                  border-[#7F8D7D]/25
                  text-black
                  px-5
                  py-4
                  outline-none
                  transition
                  focus:border-[#7F8D7D]
                  placeholder:text-black/35
                  disabled:opacity-60
                "
              />
            </motion.div>
          )}

          {/* MENSAJE */}
          <div className="mt-7">
            <label
              className="
                block
                mb-2
                uppercase
                tracking-[0.18em]
                text-[10px]
                sm:text-xs
                text-[#7F8D7D]
              "
            >
              Mensaje para los novios
            </label>

            <textarea
              placeholder="Escribe unas palabras para Miguel & Nidia..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              disabled={enviando}
              rows="4"
              className="
                w-full
                bg-white
                border
                border-[#7F8D7D]/25
                text-black
                px-5
                py-4
                outline-none
                resize-none
                transition
                focus:border-[#7F8D7D]
                placeholder:text-black/35
                disabled:opacity-60
              "
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={enviando}
            className="
              mt-8
              w-full
              bg-[#7F8D7D]
              text-white
              py-4
              px-6
              uppercase
              tracking-[0.18em]
              text-xs
              font-medium
              transition-all
              duration-300
              hover:bg-[#6F7C6D]
              hover:-translate-y-0.5
              active:scale-[0.99]
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:translate-y-0
            "
          >
            {enviando
              ? "Enviando..."
              : "Confirmar Asistencia"}
          </button>

          {/* MENSAJE DE ESTADO */}
          {confirmacion && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mt-6
                text-center
                text-sm
                text-[#7F8D7D]
                font-medium
              "
            >
              {confirmacion}
            </motion.p>
          )}

          {/* CIERRE */}
          <div
            className="
              mt-9
              pt-7
              border-t
              border-[#7F8D7D]/20
              text-center
            "
          >
            <p
              className="
                font-[Cedarville_Cursive]
                text-[#7F8D7D]
                text-xl
                sm:text-2xl
              "
            >
              Gracias por ser parte de nuestra historia.
            </p>
          </div>

          {/* LÍNEA INFERIOR */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              -translate-x-1/2
              w-24
              h-px
              bg-[#7F8D7D]
            "
          />
        </motion.form>
      </motion.div>
    </section>
  );
}