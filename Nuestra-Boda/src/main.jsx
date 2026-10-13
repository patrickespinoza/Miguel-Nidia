import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Portada from "./portada";
import Intinerario from "./intinerario";
import Generador from "./pages/Generador";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* INVITACIÓN PRINCIPAL */}
      <Route
        path="/"
        element={
          <main>
            <Portada />
            <Intinerario />
          </main>
        }
      />

      {/* GENERADOR DE INVITACIONES */}
      <Route
        path="/generador"
        element={<Generador />}
      />
    </Routes>
  </BrowserRouter>
);