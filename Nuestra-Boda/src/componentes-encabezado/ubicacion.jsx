import React from "react";
import { motion } from "framer-motion";

const Celebracion = ({
  dia = "Sábado",
  fecha = "19",
  mesAnio = "Diciembre 2026",

  titulo1 = "Ceremonia Religiosa",
  hora1 = "4:30 PM",
  lugar1 = "Nombre de la Iglesia",
  direccion1 = "Dirección de la ceremonia",
  ubicacion1 = "#",

  titulo2 = "Recepción",
  hora2 = "6:00 PM",
  lugar2 = "Nombre del Salón",
  direccion2 = "Dirección de la recepción",
  ubicacion2 = "#",
}) => {
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
      <div className="max-w-6xl mx-auto">

        {/* FECHA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-16"
        >
          <p
            className="
              uppercase
              text-[#7F8D7D]
              tracking-[0.3em]
              text-xs
              sm:text-sm
              font-medium
            "
          >
            Nuestro Gran Día
          </p>

          {/* DECORACIÓN */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
              mb-8
            "
          >

          </div>

          <p
            className="
              uppercase
              tracking-[0.25em]
              text-black/70
              text-sm
              sm:text-base
            "
          >
            {dia}
          </p>

          <h1
            className="
              font-playfair
              text-7xl
              sm:text-8xl
              md:text-9xl
              text-[#7F8D7D]
              leading-none
              mt-4
            "
          >
            {fecha}
          </h1>

          <p
            className="
              font-playfair
              text-xl
              sm:text-2xl
              md:text-3xl
              text-black
              tracking-[0.12em]
              mt-5
            "
          >
            {mesAnio}
          </p>
        </motion.div>

        {/* EVENTOS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-7
            md:gap-8
          "
        >
          {/* EVENTO 1 */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="
              bg-white
              border
              border-[#7F8D7D]/25
              px-7
              sm:px-10
              py-10
              sm:py-12
              text-center
              relative
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
                w-24
                h-px
                bg-[#7F8D7D]/70
              "
            />

            <p
              className="
                uppercase
                tracking-[0.25em]
                text-[#7F8D7D]
                text-xs
                sm:text-sm
              "
            >
              {titulo1}
            </p>

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                my-6
              "
            >
              <span className="w-9 h-px bg-[#7F8D7D]/50" />

              <span className="text-[#7F8D7D]">
                ♡
              </span>

              <span className="w-9 h-px bg-[#7F8D7D]/50" />
            </div>

            <p
              className="
                font-playfair
                text-3xl
                sm:text-4xl
                text-black
              "
            >
              {hora1}
            </p>

            <div className="mt-8">
              <p
                className="
                  font-playfair
                  text-xl
                  sm:text-2xl
                  text-black
                  leading-snug
                "
              >
                {lugar1}
              </p>

              <p
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  text-black/65
                  leading-relaxed
                  max-w-md
                  mx-auto
                "
              >
                {direccion1}
              </p>
            </div>

            <a
              href={ubicacion1}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                mt-8
                bg-[#7F8D7D]
                text-white
                uppercase
                tracking-[0.18em]
                text-xs
                sm:text-sm
                px-7
                py-3
                transition
                duration-300
                hover:bg-[#6F7C6D]
                hover:-translate-y-0.5
              "
            >
              Ver Ubicación
            </a>
          </motion.div>

          {/* EVENTO 2 */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
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
            {/* LÍNEA SUPERIOR */}
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

            <p
              className="
                uppercase
                tracking-[0.25em]
                text-white/85
                text-xs
                sm:text-sm
              "
            >
              {titulo2}
            </p>

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                my-6
              "
            >
              <span className="w-9 h-px bg-white/40" />

              <span className="text-white">
                ♡
              </span>

              <span className="w-9 h-px bg-white/40" />
            </div>

            <p
              className="
                font-playfair
                text-3xl
                sm:text-4xl
                text-white
              "
            >
              {hora2}
            </p>

            <div className="mt-8">
              <p
                className="
                  font-playfair
                  text-xl
                  sm:text-2xl
                  text-white
                  leading-snug
                "
              >
                {lugar2}
              </p>

              <p
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  text-white/75
                  leading-relaxed
                  max-w-md
                  mx-auto
                "
              >
                {direccion2}
              </p>
            </div>

            <a
              href={ubicacion2}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                mt-8
                bg-[#F4EFE4]
                text-black
                uppercase
                tracking-[0.18em]
                text-xs
                sm:text-sm
                px-7
                py-3
                transition
                duration-300
                hover:bg-white
                hover:-translate-y-0.5
              "
            >
              Ver Ubicación
            </a>
          </motion.div>
        </div>

        {/* DECORACIÓN INFERIOR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="
            flex
            items-center
            justify-center
            gap-3
            mt-14
          "
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Celebracion;