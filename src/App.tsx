import { useState } from "react";
import "./App.css";
import WesterosChronicles from "./components/WesterosChronicles";
import Characters from "./components/Characters";
import GreatHouses from "./components/GreatHouses";
import TheWorld from "./components/TheWorld";
import History from "./components/History";

function App() {
  const [showCharacters, setShowCharacters] = useState(false);
  const [showHouses, setShowHouses] = useState(false);
  const [showWorld, setShowWorld] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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

export default App;