import React, { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Musica = ({
  src = "/musica.mp3",
  titulo = "Miguel & Carolina",
}) => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(false);

  // Evita scroll mientras está abierta la ventana
  useEffect(() => {
    if (mostrarModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mostrarModal]);

  // REPRODUCIR DESDE EL MODAL
  const iniciarMusica = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();

      setReproduciendo(true);
      setMostrarModal(false);
      setMostrarBoton(true);
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);

      setMostrarModal(false);
      setMostrarBoton(true);
    }
  };

  // ENTRAR SIN MÚSICA
  const continuarSinMusica = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setReproduciendo(false);
    setMostrarModal(false);
    setMostrarBoton(true);
  };

  // BOTÓN FLOTANTE
  const toggleMusica = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setReproduciendo(true);
      } else {
        audioRef.current.pause();
        setReproduciendo(false);
      }
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);
    }
  };

  return (
    <>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
      />

      {/* =========================
          VENTANA EMERGENTE
      ========================== */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              px-5
              bg-black/60
              backdrop-blur-[4px]
            "
          >
            {/* TARJETA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                w-full
                max-w-[390px]
                bg-[#F4EFE4]
                px-7
                sm:px-10
                py-12
                sm:py-14
                text-center
                shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                overflow-hidden
              "
            >
              {/* LÍNEA SUPERIOR */}
              <div
                className="
                  absolute
                  top-0
                  left-1/2
                  -translate-x-1/2
                  w-28
                  h-[2px]
                  bg-[#7F8D7D]
                "
              />

              {/* ICONO */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  type: "spring",
                }}
                className="
                  mx-auto
                  w-16
                  h-16
                  rounded-full
                  bg-[#7F8D7D]
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                "
              >
                <Music
                  size={27}
                  strokeWidth={1.4}
                />
              </motion.div>

              {/* PEQUEÑO ENCABEZADO */}
              <p
                className="
                  mt-7
                  uppercase
                  tracking-[0.28em]
                  text-[10px]
                  sm:text-xs
                  text-[#7F8D7D]
                "
              >
                Nuestra Boda
              </p>

              {/* NOMBRES */}
              <h2
                className="
                  mt-4
                  font-playfair
                  text-3xl
                  sm:text-4xl
                  text-black
                "
              >
                {titulo}
              </h2>

              {/* DECORACIÓN */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  my-6
                "
              >
                <span className="w-10 h-px bg-[#7F8D7D]/50" />

                <span className="text-[#7F8D7D]">
                  ❦
                </span>

                <span className="w-10 h-px bg-[#7F8D7D]/50" />
              </div>

              {/* TEXTO */}
              <p
                className="
                  text-black/65
                  text-sm
                  sm:text-base
                  leading-relaxed
                  max-w-[290px]
                  mx-auto
                "
              >
                Hemos elegido una canción especial para acompañarte
                mientras recorres nuestra invitación.
              </p>

              {/* PREGUNTA */}
              <p
                className="
                  mt-6
                  font-playfair
                  italic
                  text-black
                  text-lg
                  sm:text-xl
                "
              >
                ¿Deseas escucharla?
              </p>

              {/* BOTÓN PRINCIPAL */}
              <button
                onClick={iniciarMusica}
                className="
                  mt-8
                  w-full
                  bg-[#7F8D7D]
                  text-white
                  py-3.5
                  px-6
                  uppercase
                  tracking-[0.18em]
                  text-xs
                  transition-all
                  duration-300
                  hover:bg-[#6F7C6D]
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <Play
                  size={16}
                  strokeWidth={1.6}
                />

                Escuchar música
              </button>

              {/* SIN MÚSICA */}
              <button
                onClick={continuarSinMusica}
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  mx-auto
                  text-black/50
                  hover:text-[#7F8D7D]
                  text-xs
                  uppercase
                  tracking-[0.12em]
                  transition-colors
                  duration-300
                "
              >
                <VolumeX
                  size={14}
                  strokeWidth={1.5}
                />

                Continuar sin música
              </button>

              {/* LÍNEA INFERIOR */}
              <div
                className="
                  absolute
                  bottom-0
                  left-1/2
                  -translate-x-1/2
                  w-28
                  h-[2px]
                  bg-[#7F8D7D]
                "
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          BOTÓN FLOTANTE
      ========================== */}
      <AnimatePresence>
        {mostrarBoton && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              duration: 0.4,
            }}
            onClick={toggleMusica}
            aria-label={
              reproduciendo
                ? "Pausar música"
                : "Reproducir música"
            }
            className="
              fixed
              bottom-5
              right-5
              sm:bottom-7
              sm:right-7
              z-[999]
              w-14
              h-14
              rounded-full
              bg-[#7F8D7D]
              text-white
              border
              border-white/40
              shadow-[0_10px_35px_rgba(0,0,0,0.22)]
              flex
              items-center
              justify-center
              transition-transform
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            {/* ANILLO */}
            {reproduciendo && (
              <span
                className="
                  absolute
                  inset-[-5px]
                  rounded-full
                  border
                  border-[#7F8D7D]/40
                  animate-pulse
                "
              />
            )}

            {reproduciendo ? (
              <Pause
                size={20}
                strokeWidth={1.6}
              />
            ) : (
              <Play
                size={20}
                strokeWidth={1.6}
                className="ml-[2px]"
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Musica;