import React, { useState } from "react";

export default function ConfirmacionAsistencia() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxklU9PTlqxkcu9pBUfWYhByQZ_7kJWuFENeeQhlEW-C6eh2cVbTK3z2AbMJiWVL1ME/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !asistencia) {
      setConfirmacion("Por favor completa tu nombre y selecciona si asistirás.");
      return;
    }

    setEnviando(true);
    setConfirmacion("");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          asistencia,
          invitados,
          mensaje,
          fecha: new Date().toLocaleString(),
        }),
      });

      setConfirmacion("Confirmación enviada correctamente.");

      setNombre("");
      setAsistencia("");
      setInvitados("");
      setMensaje("");
    } catch (error) {
      setConfirmacion("Ocurrió un error. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="w-full bg-[#5E6650] text-white px-5 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-serif mb-4">
          Confirmación de Asistencia
        </h2>

        <p className="text-white/80 mb-10">
          Nos encantará saber si podremos contar con tu presencia.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nombre y apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="
              w-full px-5 py-4 rounded-xl
              bg-white/95 text-[#5E6650]
              placeholder:text-[#5E6650]/60
              outline-none
            "
          />

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAsistencia("Sí asistiré")}
              className={`
                py-4 rounded-xl border transition-all duration-300
                ${
                  asistencia === "Sí asistiré"
                    ? "bg-white text-[#5E6650]"
                    : "border-white text-white hover:bg-white/10"
                }
              `}
            >
              Sí asistiré
            </button>

            <button
              type="button"
              onClick={() => setAsistencia("No asistiré")}
              className={`
                py-4 rounded-xl border transition-all duration-300
                ${
                  asistencia === "No asistiré"
                    ? "bg-white text-[#5E6650]"
                    : "border-white text-white hover:bg-white/10"
                }
              `}
            >
              No asistiré
            </button>
          </div>

          <input
            type="number"
            min="1"
            placeholder="Número de invitados"
            value={invitados}
            onChange={(e) => setInvitados(e.target.value)}
            className="
              w-full px-5 py-4 rounded-xl
              bg-white/95 text-[#5E6650]
              placeholder:text-[#5E6650]/60
              outline-none
            "
          />

          <textarea
            placeholder="Mensaje para los novios"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows="4"
            className="
              w-full px-5 py-4 rounded-xl
              bg-white/95 text-[#5E6650]
              placeholder:text-[#5E6650]/60
              outline-none resize-none
            "
          />

          <button
            type="submit"
            disabled={enviando}
            className="
              w-full py-4 rounded-xl
              bg-white text-[#5E6650]
              font-semibold tracking-wide
              transition-all duration-300
              hover:bg-white/90
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {enviando ? "Enviando..." : "Enviar confirmación"}
          </button>

          {confirmacion && (
            <p className="mt-5 text-white font-medium">
              {confirmacion}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}