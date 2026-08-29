import React from "react";
import { motion } from "framer-motion";

const Vestimenta = () => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className="
        w-full
        bg-[#7F8D7D]
        py-16
        sm:py-20
        px-5
        sm:px-8
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative
          max-w-6xl
          w-full
          bg-[#F4EFE4]
          overflow-hidden
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >
        {/* IMAGEN */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="
            relative
            h-[300px]
            sm:h-[420px]
            md:h-[500px]
            lg:h-full
            min-h-[360px]
          "
        >
          <img
            src="/dress-code2.png"
            alt="Código de vestimenta formal"
            className="
              w-full
              h-full
              object-cover
              object-center
            "
          />

          {/* Overlay suave */}
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* CONTENIDO */}
        <div
          className="
            relative
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-7
            py-14
            sm:px-12
            sm:py-16
            lg:px-16
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

          {/* SUBTÍTULO */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.35em" }}
            whileInView={{
              opacity: 1,
              letterSpacing: "0.22em",
            }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="
              uppercase
              text-[11px]
              sm:text-sm
              tracking-[0.22em]
              text-[#7F8D7D]
              font-medium
            "
          >
            Código de Vestimenta
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
            "
          >
          </motion.div>

          {/* TÍTULO */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="
              font-playfair
              text-3xl
              sm:text-4xl
              md:text-5xl
              text-black
              mt-7
              leading-tight
            "
          >
            Vestimenta Formal
          </motion.h1>

          {/* TEXTO */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="
              mt-7
              text-sm
              sm:text-base
              md:text-lg
              text-black/70
              leading-relaxed
              max-w-md
            "
          >
            Queremos compartir contigo una celebración elegante y especial.
            Te invitamos a acompañarnos con vestimenta formal para disfrutar
            juntos este momento inolvidable.
          </motion.p>



          {/* LÍNEA INFERIOR */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              -translate-x-1/2
              w-24
              h-px
              bg-[#7F8D7D]/70
            "
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;