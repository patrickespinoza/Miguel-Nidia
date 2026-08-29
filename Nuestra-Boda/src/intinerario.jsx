import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import Intinerario2 from "./componentes-encabezado/itinerario2";
import Novios from "./componentes-encabezado/novios";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";
import Musica from "./componentes-encabezado/Musica";

export default function Itinerario() {

  return (
    <div>

      <Musica/>

      <Novios />

      <Celebracion />

      <Vestimenta />

      <Intinerario2/>


      {/* IMAGEN FINAL */}
      <div className="flex flex-col items-center justify-center bg-[#F7F4ED]">

        <img
          src="/finalboda.webp"
          alt="acepto"
          className="w-full max-w-5xl object-cover"
        />

      </div>
      <ConfirmacionAsistencia/>
    </div>
  );
}