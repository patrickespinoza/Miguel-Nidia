import React from "react";
import { motion } from "framer-motion";

const Novios = () => {
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="
          max-w-5xl
          mx-auto
          text-center
        "
      >
        {/* ENCABEZADO */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            uppercase
            text-[#7F8D7D]
            text-xs
            sm:text-sm
            font-medium
            tracking-[0.22em]
          "
        >
          Nuestra Boda
        </motion.p>

        {/* DECORACIÓN */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
          className="
            flex
            items-center
            justify-center
            gap-3
            mt-5
            mb-10
          "
        >
          <span className="w-12 sm:w-16 h-px bg-[#7F8D7D]/60"></span>

          <span className="text-[#7F8D7D] text-lg">
            ❦
          </span>

          <span className="w-12 sm:w-16 h-px bg-[#7F8D7D]/60"></span>
        </motion.div>

        {/* NOMBRES NOVIOS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h1
            className="
              font-playfair
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              text-black
              leading-tight
            "
          >
            Miguel Ángel
          </h1>

          <p
            className="
              mt-2
              font-playfair
              text-lg
              sm:text-xl
              md:text-2xl
              text-black/65
              tracking-wide
            "
          >
            López González
          </p>

          <p
            className="
              my-5
              sm:my-6
              text-4xl
              sm:text-5xl
              text-[#7F8D7D]
              font-[Cedarville_Cursive]
            "
          >
            &
          </p>

          <h1
            className="
              font-playfair
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              text-black
              leading-tight
            "
          >
            Nidia Carolina
          </h1>

          <p
            className="
              mt-2
              font-playfair
              text-lg
              sm:text-xl
              md:text-2xl
              text-black/65
              tracking-wide
            "
          >
            Guerrero Rodríguez
          </p>
        </motion.div>

        {/* FRASE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16"
        >
          <p
            className="
              text-[#7F8D7D]
              font-[Cedarville_Cursive]
              text-xl
              sm:text-2xl
              md:text-3xl
            "
          >
            Con la bendición de nuestros padres
          </p>
        </motion.div>

        {/* PADRES */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            md:gap-8
            mt-12
          "
        >
          {/* PADRES DEL NOVIO */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            viewport={{ once: true }}
            className="
              bg-[#7F8D7D]
              px-7
              sm:px-10
              py-10
              sm:py-12
              text-center
              relative
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                top-0
                left-1/2
                -translate-x-1/2
                w-24
                h-px
                bg-white/60
              "
            />

            <h2
              className="
                uppercase
                tracking-[0.25em]
                text-xs
                sm:text-sm
                text-white/80
                mb-7
              "
            >
              Padres del Novio
            </h2>

            <div className="text-white">
              <p
                className="
                  font-playfair
                  text-xl
                  sm:text-2xl
                  leading-relaxed
                "
              >
                Nombre del padre
              </p>

              <p
                className="
                  mt-3
                  font-playfair
                  text-xl
                  sm:text-2xl
                  leading-relaxed
                "
              >
                Nombre de la madre
              </p>
            </div>
          </motion.div>

          {/* PADRES DE LA NOVIA */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            viewport={{ once: true }}
            className="
              bg-white
              border
              border-[#7F8D7D]/30
              px-7
              sm:px-10
              py-10
              sm:py-12
              text-center
              relative
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                top-0
                left-1/2
                -translate-x-1/2
                w-24
                h-px
                bg-[#7F8D7D]/70
              "
            />

            <h2
              className="
                uppercase
                tracking-[0.25em]
                text-xs
                sm:text-sm
                text-[#7F8D7D]
                mb-7
              "
            >
              Padres de la Novia
            </h2>

            <div className="text-black">
              <p
                className="
                  font-playfair
                  text-xl
                  sm:text-2xl
                  leading-relaxed
                "
              >
                Ignacio Guerrero Guerrero
              </p>

              <p
                className="
                  mt-3
                  font-playfair
                  text-xl
                  sm:text-2xl
                  leading-relaxed
                "
              >
                Minerva Rodríguez Coronado
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Novios;