import React from "react";
import { motion } from "framer-motion";
import {
  DoorOpen,
  Heart,
  ScrollText,
  Gift,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

const Itinerario2 = () => {
  const containerFade = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardFade = {
    hidden: { opacity: 0, y: 30 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const eventos = [
    {
      titulo: "Acceso a invitados",
      hora: "8:00 PM",
      Icono: DoorOpen,
    },
    {
      titulo: "Entrada de los novios",
      hora: "8:15 PM",
      Icono: Heart,
    },
    {
      titulo: "Ceremonia Civil",
      hora: "8:30 PM",
      Icono: ScrollText,
    },
    {
      titulo: "Regalo sorpresa de los papás",
      hora: "9:30 PM",
      Icono: Gift,
    },
    {
      titulo: "Cena",
      hora: "10:00 PM",
      Icono: UtensilsCrossed,
    },
    {
      titulo: "Despedida",
      hora: "11:30 PM",
      Icono: Sparkles,
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-[#F4EFE4] px-5 py-20 sm:px-8 sm:py-24">
      <motion.div
        variants={containerFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-5xl"
      >
        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#7F8D7D] sm:text-sm">
            Nuestro Día
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#7F8D7D]/50 sm:w-16" />
            <span className="text-lg text-[#7F8D7D]">❦</span>
            <span className="h-px w-12 bg-[#7F8D7D]/50 sm:w-16" />
          </div>

          <h1 className="mt-6 font-playfair text-4xl text-black sm:text-5xl md:text-6xl">
            Itinerario
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-black/60 sm:text-base">
            Cada momento ha sido pensado para compartir juntos una celebración
            inolvidable.
          </p>
        </motion.div>

        {/* LÍNEA DE TIEMPO */}
        <div className="relative mt-16 sm:mt-20">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#7F8D7D]/35 md:block" />
          <div className="absolute bottom-0 left-[29px] top-0 w-px bg-[#7F8D7D]/35 md:hidden" />

          <div className="flex flex-col gap-10 md:gap-14">
            {eventos.map((evento, index) => {
              const izquierda = index % 2 === 0;
              const tarjetaVerde = index % 2 !== 0;
              const Icono = evento.Icono;

              const cardColors = tarjetaVerde
                ? "border-[#7F8D7D] bg-[#7F8D7D] text-white"
                : "border-[#7F8D7D]/20 bg-white text-black";

              const iconColors = tarjetaVerde
                ? "border-white/35 text-white"
                : "border-[#7F8D7D]/30 text-[#7F8D7D]";

              return (
                <motion.div
                  key={evento.titulo}
                  custom={index}
                  variants={cardFade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative grid grid-cols-[60px_1fr] items-center md:grid-cols-2"
                >
                  {/* PUNTO MÓVIL */}
                  <div className="relative flex items-center justify-center md:hidden">
                    <div className="z-10 h-4 w-4 rounded-full border-[4px] border-[#F4EFE4] bg-[#7F8D7D] ring-1 ring-[#7F8D7D]/50" />
                  </div>

                  {/* TARJETA DESKTOP */}
                  <div
                    className={`hidden md:flex ${
                      izquierda
                        ? "justify-end pr-12"
                        : "order-2 justify-start pl-12"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                      className={`relative w-full max-w-sm border px-7 py-9 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${cardColors}`}
                    >
                      <div
                        className={`absolute left-1/2 top-0 h-px w-20 -translate-x-1/2 ${
                          tarjetaVerde ? "bg-white/60" : "bg-[#7F8D7D]/60"
                        }`}
                      />

                      <div
                        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border ${iconColors}`}
                      >
                        <Icono aria-hidden="true" strokeWidth={1.25} size={58} />
                      </div>

                      <p
                        className={`mt-6 text-sm font-medium tracking-[0.16em] ${
                          tarjetaVerde ? "text-white/85" : "text-[#7F8D7D]"
                        }`}
                      >
                        {evento.hora}
                      </p>

                      <h2 className="mt-3 font-playfair text-2xl leading-snug">
                        {evento.titulo}
                      </h2>
                    </motion.div>
                  </div>

                  {/* PUNTO CENTRAL DESKTOP */}
                  <div className="absolute left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center md:flex">
                    <div className="h-5 w-5 rounded-full border-[5px] border-[#F4EFE4] bg-[#7F8D7D] ring-1 ring-[#7F8D7D]/40" />
                  </div>

                  {/* TARJETA MÓVIL */}
                  <div className="pl-5 md:hidden">
                    <motion.div
                      whileHover={{ y: -3, transition: { duration: 0.25 } }}
                      className={`border px-6 py-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] ${cardColors}`}
                    >
                      <div
                        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${iconColors}`}
                      >
                        <Icono aria-hidden="true" strokeWidth={1.3} size={48} />
                      </div>

                      <p
                        className={`mt-5 text-sm font-medium tracking-[0.14em] ${
                          tarjetaVerde ? "text-white/85" : "text-[#7F8D7D]"
                        }`}
                      >
                        {evento.hora}
                      </p>

                      <h2 className="mt-3 font-playfair text-xl leading-snug sm:text-2xl">
                        {evento.titulo}
                      </h2>
                    </motion.div>
                  </div>

                  {/* ESPACIO DESKTOP */}
                  <div className={`hidden md:block ${izquierda ? "" : "order-1"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CIERRE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center sm:mt-20"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#7F8D7D]/40 sm:w-16" />
            <span className="text-lg text-[#7F8D7D]">❦</span>
            <span className="h-px w-12 bg-[#7F8D7D]/40 sm:w-16" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Itinerario2;