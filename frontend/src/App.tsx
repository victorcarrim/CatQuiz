import { useState } from 'react'
import './App.css'
import { InitialGame } from './pages/InitialGame';
import axios from 'axios';
import { Game } from './pages/Game';
import { EndGame } from './pages/EndGame';
import Swal from 'sweetalert2';

interface JsonGameType {
  nome: string;
  modo_jogo: string;
}

interface FimJogo {
  terminou: boolean;
}

function App() {
  const [showInitialGame, setShowInitialGame] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);
  const [gameJson, setGameJson] = useState<JsonGameType>();


  async function sendJsonGame(game?: JsonGameType) {
    if(game){
      await setGameJson(game)
      console.log(gameJson)
    }

    const dataToSend = game || gameJson;

    try {
        const response = await axios.post("http://127.0.0.1:5000/iniciar", dataToSend);
        
        if (response.status === 200) {
            setShowInitialGame(false);
            setShowGame(true);
        }
    } catch (error) {
        modalContinueGame();
        console.error("There was an error!", error);
    }
}


  function handleContinueGame(){
    setShowInitialGame(false);
    setShowGame(true);
  }

  function handleGameEnd(result: FimJogo) {
    if(result.terminou) {
        setShowGame(false);
        setShowEndGame(true);
        setGameJson(undefined)
    }
}

async function endGame(){
  try {
    await axios.get("http://127.0.0.1:5000/finalizar");
    sendJsonGame();
  } catch (error) {
    console.error("There was an error!", error);
  }
}

function modalContinueGame(){
  Swal.fire({
    title: 'Existe um jogo em andamento, deseja continuar?',
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Continuar jogo em andamento',
    denyButtonText: 'Iniciar novo jogo',
  }).then((result) => {
    if (result.isConfirmed) {
      handleContinueGame();
    } else if (result.isDenied) {
      endGame();
    }
  })
}



  return (
    <div style={{width: "100%"}}>
      {showInitialGame && 
        <InitialGame onJsonGameUpdate={(game) => {sendJsonGame(game)}} />
      }
      {showGame &&
        <Game onGameEnd={handleGameEnd} />
      }
      {showEndGame &&
        <EndGame onButtonClick={() => {setShowEndGame(false); setShowInitialGame(true)}} />
      }
    </div>
  )
}

export default App
