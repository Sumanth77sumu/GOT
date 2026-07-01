import { useState } from "react";
import "./App.css";
import WesterosChronicles from "./components/WesterosChronicles";
import Characters from "./components/Characters";
import GreatHouses from "./components/GreatHouses";

function App() {
  const [showCharacters, setShowCharacters] = useState(false);

  return (
    <>
      <WesterosChronicles
        showCharacters={showCharacters}
        setShowCharacters={setShowCharacters}
      />

      {showCharacters && <Characters />}

      <GreatHouses />
    </>
  );
}

export default App;