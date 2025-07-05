import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Páginas
import HomeIntroPage from "./pages/HomeIntroPage";
import LoginScreen from "./pages/LoginPage";
import CadastroScreen from "./pages/CadastroPage";
import HomeScreen from "./pages/HomeScreen";
import NumerologiaFormPage from "./pages/NumerologiaFormPage";
import NumerologiaResultadoPage from "./pages/NumerologiaResultadoPage";
import ArquetipoFormPage from "./pages/ArquetipoFormPage";
import ArquetipoResultadoPage from "./pages/ArquetipoResultadoPage";
import TarotIntroPage from "./pages/TarotTiragemPage";
import TarotTiragemPage from "./pages/TarotIntroPage";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
    return () => unsubscribe();
  }, []);

  if (carregando) {
    return <div className="p-10 text-white">Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Rota raiz redireciona baseado no login */}
        <Route
          path="/"
          element={usuario ? <Navigate to="/home" /> : <Navigate to="/intro" />}
        />

        {/* Páginas públicas */}
        <Route path="/intro" element={<HomeIntroPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<CadastroScreen />} />

        {/* Páginas protegidas */}
        <Route
          path="/home"
          element={usuario ? <HomeScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/numerologia"
          element={usuario ? <NumerologiaFormPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/numerologia/resultado"
          element={usuario ? <NumerologiaResultadoPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/arquetipo"
          element={usuario ? <ArquetipoFormPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/arquetipo/resultado"
          element={usuario ? <ArquetipoResultadoPage /> : <Navigate to="/login" />}
        />
        <Route path="/tarot" element={<TarotTiragemPage />} />
<Route path="/tiragem" element={<TarotIntroPage />} />
      </Routes>
    </Router>
  );
}