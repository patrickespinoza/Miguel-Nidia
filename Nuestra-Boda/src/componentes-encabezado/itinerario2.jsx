import React from "react";
import { motion } from "framer-motion";

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
    hidden: {
      opacity: 0,
      y: 30,
    },
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
      titulo: "Fotografías",
      imagen: "/camara-fotografica.png",
      hora: "4:00 pm - 4:30 pm",
    },
    {
      titulo: "Llegada de Novios",
      imagen: "/arco-de-la-boda.png",
      hora: "4:30 pm - 5:00 pm",
    },
    {
      titulo: "Comida",
      imagen: "/cena-romantica.png",
      hora: "5:00 pm - 6:00 pm",
    },
    {
      titulo: "Pastel",
      imagen: "/pastel.png",
      hora: "6:00 pm - 6:30 pm",
    },
    {
      titulo: "Baile",
      imagen: "/bola-de-disco.png",
      hora: "6:30 pm - 11:30 pm",
    },
  ];

  return (
    <section
      className="
        w-full
        bg-[#F4EFE4]
        py-20
        sm:py-24
        px-5
        sm:px-8
        overflow-hidden
      "
    >
      <motion.div
        variants={containerFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="
          max-w-5xl
          mx-auto
        "
      >
        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="
              uppercase
              tracking-[0.25em]
              text-[#7F8D7D]
              text-xs
              sm:text-sm
              font-medium
            "
          >
            Nuestro Día
          </p>

          {/* DECORACIÓN */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
            "
          >
            <span className="w-12 sm:w-16 h-px bg-[#7F8D7D]/50" />

            <span className="text-[#7F8D7D] text-lg">
              ❦
            </span>

            <span className="w-12 sm:w-16 h-px bg-[#7F8D7D]/50" />
          </div>

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-playfair
              text-black
              mt-6
            "
          >
            Itinerario
          </h1>

          <p
            className="
              mt-5
              max-w-xl
              mx-auto
              text-sm
              sm:text-base
              text-black/60
              leading-relaxed
            "
          >
            Cada momento ha sido pensado para compartir juntos
            una celebración inolvidable.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative mt-16 sm:mt-20">

          {/* LÍNEA CENTRAL DESKTOP */}
          <div
            className="
              hidden
              md:block
              absolute
              left-1/2
              top-0
              bottom-0
              w-px
              bg-[#7F8D7D]/35
              -translate-x-1/2
            "
          />

          {/* LÍNEA MÓVIL */}
          <div
            className="
              md:hidden
              absolute
              left-[29px]
              top-0
              bottom-0
              w-px
              bg-[#7F8D7D]/35
            "
          />

          <div className="flex flex-col gap-10 md:gap-14">

            {eventos.map((evento, index) => {
              const izquierda = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardFade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="
                    relative
                    grid
                    grid-cols-[60px_1fr]
                    md:grid-cols-2
                    items-center
                  "
                >
                  {/* PUNTO MÓVIL */}
                  <div
                    className="
                      md:hidden
                      relative
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        w-4
                        h-4
                        rounded-full
                        bg-[#7F8D7D]
                        border-[4px]
                        border-[#F4EFE4]
                        ring-1
                        ring-[#7F8D7D]/50
                        z-10
                      "
                    />
                  </div>

                  {/* DESKTOP IZQUIERDA */}
                  <div
                    className={`
                      hidden md:flex
                      ${
                        izquierda
                          ? "justify-end pr-12"
                          : "order-2 justify-start pl-12"
                      }
                    `}
                  >
                    <motion.div
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.25 },
                      }}
                      className="
                        w-full
                        max-w-sm
                        bg-white
                        border
                        border-[#7F8D7D]/20
                        px-7
                        py-8
                        text-center
                        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                        relative
                      "
                    >
                      <div
                        className="
                          absolute
                          top-0
                          left-1/2
                          -translate-x-1/2
                          w-20
                          h-px
                          bg-[#7F8D7D]/60
                        "
                      />

                      <img
                        src={evento.imagen}
                        alt={evento.titulo}
                        className="
                          h-16
                          w-16
                          mx-auto
                          object-contain
                          opacity-90
                        "
                      />

                      <h2
                        className="
                          mt-5
                          text-2xl
                          font-playfair
                          text-black
                        "
                      >
                        {evento.titulo}
                      </h2>

                      <p
                        className="
                          mt-3
                          text-[#7F8D7D]
                          text-sm
                          sm:text-base
                          tracking-[0.08em]
                        "
                      >
                        {evento.hora}
                      </p>
                    </motion.div>
                  </div>

                  {/* PUNTO CENTRAL DESKTOP */}
                  <div
                    className="
                      hidden
                      md:flex
                      absolute
                      left-1/2
                      -translate-x-1/2
                      items-center
                      justify-center
                      z-20
                    "
                  >
                    <div
                      className="
                        w-5
                        h-5
                        rounded-full
                        bg-[#7F8D7D]
                        border-[5px]
                        border-[#F4EFE4]
                        ring-1
                        ring-[#7F8D7D]/40
                      "
                    />
                  </div>

                  {/* MÓVIL */}
                  <div className="md:hidden pl-5">
                    <motion.div
                      whileHover={{
                        y: -3,
                        transition: { duration: 0.25 },
                      }}
                      className="
                        bg-white
                        border
                        border-[#7F8D7D]/20
                        px-6
                        py-7
                        text-center
                        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                      "
                    >
                      <img
                        src={evento.imagen}
                        alt={evento.titulo}
                        className="
                          h-14
                          w-14
                          mx-auto
                          object-contain
                          opacity-90
                        "
                      />

                      <h2
                        className="
                          mt-4
                          text-xl
                          sm:text-2xl
                          font-playfair
                          text-black
                        "
                      >
                        {evento.titulo}
                      </h2>

                      <p
                        className="
                          mt-3
                          text-[#7F8D7D]
                          text-sm
                          tracking-[0.08em]
                        "
                      >
                        {evento.hora}
                      </p>
                    </motion.div>
                  </div>

                  {/* ESPACIO DESKTOP */}
                  <div
                    className={`
                      hidden md:block
                      ${izquierda ? "" : "order-1"}
                    `}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CIERRE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          viewport={{ once: true }}
          className="
            mt-16
            sm:mt-20
            text-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Itinerario2;