import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import Intinerario2 from "./componentes-encabezado/itinerario2";
import Novios from "./componentes-encabezado/novios";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";

export default function Itinerario() {

  return (
    <div>

{/* SECCIÓN VESTIMENTA */}
      <Novios />
      {/* SECCIÓN CELEBRACIONES */}
      <div className=" overflow-hidden">

        <Celebracion
          titulo="Ceremonia"
          dia="Jueves"
          fecha="11"
          mesAnio="Junio 2026"
          hora="4:30 PM"
          lugar="Salón Event Center"
          direccion="Puebla, Puebla"
          ubicacion="https://maps.app.goo.gl/TsSDUBKAractwi8F8"
        />

        <Celebracion
          titulo="Recepción"
          hora="8:00 PM"
          lugar="Jardín Magnolia"
          direccion="Atlixco, Puebla"
          ubicacion="https://maps.app.goo.gl/TsSDUBKAractwi8F8"
        />

      </div>

      {/* SECCIÓN VESTIMENTA */}
      <Vestimenta />

      {/* SECCIÓN ITINERARIO */}
      <Intinerario2/>

      {/* CONFIRMACIÓN */}

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