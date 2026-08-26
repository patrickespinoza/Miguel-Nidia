import React from "react";

const Celebracion = ({
  dia,
  fecha,
  mesAnio,
  hora,
  lugar,
  direccion,
  ubicacion,
  titulo,
}) => {
  return (
    <div className="w-full bg-[#5E6650] py-20 px-6 flex flex-col items-center justify-center">

      {/* FECHA */}
      <div className="text-center mb-10">

        <p className="text-[#E7D7B1] tracking-[0.35em] uppercase text-sm sm:text-base font-semibold">
          {dia}
        </p>

        <h1 className="text-7xl sm:text-8xl font-playfair text-[#F7F4ED] leading-none mt-3 drop-shadow-lg">
          {fecha}
        </h1>

        <p className="text-[#E7D7B1] text-2xl sm:text-3xl tracking-[0.2em] mt-3">
          {mesAnio}
        </p>

      </div>

      {/* TARJETA */}
      <div
        className="
          relative bg-[#F7F4ED] max-w-xl w-full p-10 sm:p-14
          shadow-[0_15px_50px_rgba(0,0,0,0.25)]
          border border-[#d8cfbf]

          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[0.8rem]
          rounded-bl-[0.8rem]
        "
      >

        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-[#B89B5E]"></div>

        <div className="text-center space-y-3">

          <h2 className="text-3xl sm:text-4xl font-playfair text-black tracking-wide">
            {titulo}
          </h2>

          <div className="w-20 h-[2px] mx-auto bg-[#B89B5E]"></div>

        </div>

        <div className="mt-10 flex flex-col items-center text-center space-y-6">

          <div>
            <p className="text-[#B89B5E] uppercase tracking-[0.25em] text-sm">
              Hora
            </p>

            <p className="text-2xl font-cursiveDancing text-black mt-2">
              {hora}
            </p>
          </div>

          <div>

            <p className="text-[#B89B5E] uppercase tracking-[0.25em] text-sm">
              Lugar
            </p>

            <p className="text-2xl font-cursiveDancing text-black mt-2">
              {lugar}
            </p>

            <p className="text-black/70 mt-3 leading-relaxed text-sm sm:text-base max-w-md">
              {direccion}
            </p>

          </div>

          <a
            href={ubicacion}
            target="_blank"
            rel="noreferrer"
            className="
              mt-4 bg-[#B89B5E] hover:scale-105 transition duration-300
              text-white px-8 py-3 rounded-full shadow-lg tracking-wide
            "
          >
            Ver Ubicación
          </a>

        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-[#B89B5E]"></div>

      </div>
    </div>
  );
};

export default Celebracion;