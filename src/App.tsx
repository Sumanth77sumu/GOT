import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import WesterosChronicles from "./components/WesterosChronicles";
import Characters from "./components/Characters";
import GreatHouses from "./components/GreatHouses";
import TheWorld from "./components/TheWorld";
import History from "./components/History";
import LocationPage from "./pages/LocationPage";
import { lenis } from "./lib/lenis";

type NavState = { openWorld?: boolean } | null;

function HomePage() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const openWorldOnLoad = Boolean((routerLocation.state as NavState)?.openWorld);

  const [showCharacters, setShowCharacters] = useState(false);
  const [showHouses, setShowHouses] = useState(false);
  const [showWorld, setShowWorld] = useState(openWorldOnLoad);
  const [showHistory, setShowHistory] = useState(false);

  // Coming back from a location detail page's "Back to Map" — scroll
  // straight to the map section instead of leaving the visitor at the top.
  useEffect(() => {
    if (!openWorldOnLoad) return;
    window.requestAnimationFrame(() => {
      lenis.resize();
      lenis.scrollTo("#world");
    });
    // Consume this one-shot navigation flag immediately. Browser history
    // state otherwise persists on the "/" entry indefinitely, so without
    // this, refreshing or revisiting "/" later would keep reopening the
    // map on its own even though nothing was clicked.
    navigate(".", { replace: true, state: null });
    // Only run once on the mount that actually carried this navigation state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WesterosChronicles
        showCharacters={showCharacters}
        setShowCharacters={setShowCharacters}
        showHouses={showHouses}
        setShowHouses={setShowHouses}
        showWorld={showWorld}
        setShowWorld={setShowWorld}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />

      {showWorld && <TheWorld />}

      {showCharacters && <Characters />}

      {showHouses && <GreatHouses />}

      {showHistory && <History />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations/:slug" element={<LocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
