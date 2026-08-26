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
      y: 35,
      scale: 0.96,
      filter: "blur(6px)",
    },
    show: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.75,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const eventosIzquierda = [
    {
      titulo: "Fotografías",
      imagen: "/camara-fotografica.png",
      hora: "4:00 pm - 4:30 pm",
    },
    {
      titulo: "Comida",
      imagen: "/cena-romantica.png",
      hora: "5:00 pm - 6:00 pm",
    },
    {
      titulo: "Baile",
      imagen: "/bola-de-disco.png",
      hora: "6:30 pm - 11:30 pm",
    },
  ];

  const eventosDerecha = [
    {
      titulo: "Llegada de Novios",
      imagen: "/arco-de-la-boda.png",
      hora: "4:30 pm - 5:00 pm",
    },
    {
      titulo: "Pastel",
      imagen: "/pastel.png",
      hora: "6:00 pm - 6:30 pm",
    },
  ];

  return (
    <div className="w-full bg-[#F7F4ED] py-0 px-0 flex items-center justify-center overflow-hidden">
      <motion.div
        variants={containerFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="
          max-w-6xl mx-auto
          bg-[#F7F4ED]
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
          shadow-[0_15px_50px_rgba(0,0,0,0.2)]
          p-10 sm:p-16
        "
      >
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
          <p className="uppercase tracking-[0.25em] text-[#B89B5E] text-sm font-semibold">
            Nuestro Día
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-black mt-4">
            Itinerario
          </h1>

          <div className="w-24 h-[2px] bg-[#B89B5E] mx-auto mt-6"></div>
        </motion.div>

        <div className="relative mt-20">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] bg-[#B89B5E]/40 -translate-x-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="flex flex-col gap-14">
              {eventosIzquierda.map((evento, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardFade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={{
                    y: -6,
                    scale: 1.015,
                    transition: { duration: 0.25 },
                  }}
                  className="
                    bg-white/70
                    backdrop-blur-md
                    rounded-3xl
                    p-6
                    shadow-lg
                    border border-[#E6DDCF]
                    text-center
                  "
                >
                  <img
                    src={evento.imagen}
                    alt={evento.titulo}
                    className="h-20 w-20 md:h-24 md:w-24 mx-auto"
                  />

                  <h2 className="mt-5 text-2xl font-playfair text-black">
                    {evento.titulo}
                  </h2>

                  <p className="mt-3 text-[#B89B5E] font-[DancingScript] text-xl">
                    {evento.hora}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-14 md:mt-20">
              {eventosDerecha.map((evento, index) => (
                <motion.div
                  key={index}
                  custom={index + eventosIzquierda.length}
                  variants={cardFade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={{
                    y: -6,
                    scale: 1.015,
                    transition: { duration: 0.25 },
                  }}
                  className="
                    bg-white/70
                    backdrop-blur-md
                    rounded-3xl
                    p-6
                    shadow-lg
                    border border-[#E6DDCF]
                    text-center
                  "
                >
                  <img
                    src={evento.imagen}
                    alt={evento.titulo}
                    className="h-20 w-20 md:h-24 md:w-24 mx-auto"
                  />

                  <h2 className="mt-5 text-2xl font-playfair text-black">
                    {evento.titulo}
                  </h2>

                  <p className="mt-3 text-[#B89B5E] font-[DancingScript] text-xl">
                    {evento.hora}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Itinerario2;