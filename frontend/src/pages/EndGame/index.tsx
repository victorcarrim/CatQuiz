import { useEffect, useState } from "react";
import Button from "../../components/button";
import { CardQuestion } from "../../components/cardQuestion";
import { Container, ContainerTwo, } from "./styles";
import axios from "axios";

interface EndGameProps {
    onButtonClick: () => void;
}

export function EndGame({ onButtonClick }: EndGameProps){

    const [jsonGame, setJsonGame] = useState({
        nome : " ",
        pontuacao: 0,
        questoes_corretas: 0,
        "tema-dificuldade": "",
    });

    function endGame(){
        axios.get("http://127.0.0.1:5000/finalizar")
        .then(response => {
            if(response.status === 200){
                setJsonGame(response.data);
            }
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    }

    useEffect(() => {
        endGame();
    }
    , []);



    return(
        <Container>
            <ContainerTwo>
                <CardQuestion question="PyQuiz" subtitle="Fim de jogo" points={jsonGame.pontuacao} acert={jsonGame.questoes_corretas} name={jsonGame.nome}  nameBoolean={true} modeAndDificult={jsonGame["tema-dificuldade"]}/>
            </ContainerTwo>
            <ContainerTwo>
                <Button text="Iniciar um novo jogo" onClick={onButtonClick} />
            </ContainerTwo>
        </Container>
    )

}