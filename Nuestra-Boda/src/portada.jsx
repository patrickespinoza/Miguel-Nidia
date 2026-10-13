import React, { useRef, useState } from "react";

export default function Portada() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error al intentar reproducir el audio:", error);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div>
      <section
        className="
          relative
          w-full
          h-[calc(110vh-160px)]
          md:h-screen
          overflow-hidden
          text-white
        "
      >
        {/* IMAGEN DE FONDO */}
        <img
          src="/portada1.jpg"
          alt="Miguel y Nidia"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* SOMBRA SUAVE INFERIOR PARA MEJORAR LA LECTURA */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[45%]
            bg-gradient-to-t
            from-black/60
            via-black/20
            to-transparent
          "
        />

        {/* NOMBRES Y FECHA */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-10
            flex
            flex-col
            items-center
            justify-end
            text-center
            px-6
            pb-10
            sm:pb-12
            md:pb-16
            lg:pb-20
          "
        >
          {/* NOMBRES */}
          <h1
            className="
              font-serif
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              tracking-wide
              leading-none
              drop-shadow-lg
          "
          >
            Miguel & Carolina
          </h1>

          {/* LÍNEA DECORATIVA */}
          <div
            className="
              w-16
              md:w-20
              h-px
              bg-white/80
              my-4
          "
          />

          {/* FECHA */}
          <p
            className="
              font-serif
              text-base
              sm:text-lg
              md:text-xl
              lg:text-2xl
              tracking-[0.35em]
              uppercase
              drop-shadow-md
          "
          >
            19 · 12 · 2026
          </p>
        </div>
      </section>
    </div>
  );
}