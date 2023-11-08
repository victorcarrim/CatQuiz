import { useEffect, useState } from "react";
import { CardQuestion } from "../../components/cardQuestion";
import { Container, ContainerButton } from "./styles";
import axios from "axios";
import Button from "../../components/button";

interface Alternativa {
    alternativa: string;
    correta: boolean;
}
  
interface Questao {
    alternativas: Alternativa[];
    dificuldade: number;
    id: number;
    questão: string;
    tema: string;
}

interface FimJogo {
    terminou: boolean;
}

interface GameProps {
    onGameEnd?: (result: FimJogo) => void;
}



export function Game({ onGameEnd }: GameProps){

    const [question, setQuestion] = useState<Questao>();
    const [progress, setProgress] = useState();
    const [responseQuestion, setResponseQuestion] = useState();
    const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);
    const [correctAlternativeIndex, setCorrectAlternativeIndex] = useState<number | null>(null);

    function getQuestion(){
        axios.get("http://127.0.0.1:5000/obter_questao")
        .then(response => {
            if(response.status === 204) {
                if(onGameEnd) {
                    onGameEnd({ terminou: true });
                }
                setResponseQuestion(undefined);
                setSelectedAlternative(null);
                return;
            }
            if(response.status === 200){
                setQuestion(response.data.questao);
                setProgress(response.data.pergunta_atual)
                const correctIndex = response.data.questao.alternativas.findIndex((alt: Alternativa) => alt.correta);
                setCorrectAlternativeIndex(correctIndex);
            }
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    }

    function sendResponseQuestion(alternativa: string){
        const response ={"resposta" : alternativa}
        axios.post("http://127.0.0.1:5000/verificar_resposta", response)
        .then(response => {
            if(response.status === 200){
                setResponseQuestion(undefined);
                setSelectedAlternative(null);
                getQuestion();
            }
        })
        .catch(error => {
            if(error.status != 404) {
                if(onGameEnd) {
                    onGameEnd({ terminou: true });
                }
                setResponseQuestion(undefined);
                setSelectedAlternative(null);
                return;
            }
            console.log(error.response.data.status)
            console.error("There was an error!", error);
        });
    }

    function handleQuestion(alternativa: Alternativa, index: number) {
        setResponseQuestion(alternativa.correta === true ? "certo" : "errado");
        setSelectedAlternative(index);

        setTimeout(() => {
            sendResponseQuestion(alternativa.alternativa);
        }, 1000);
    }
    

    useEffect(() => {
        getQuestion();
        }
    ,[])

    return(
        <Container>
            <CardQuestion question={question?.questão} theme={question?.tema} progress={progress} />
            <ContainerButton>
            {question?.alternativas.map((alternativa, index) => (
                <Button key={index} text={alternativa.alternativa} onClick={() => handleQuestion(alternativa, index)} status={index === selectedAlternative ? responseQuestion : undefined} isCorrect={responseQuestion === 'errado' && index === correctAlternativeIndex} shouldBlink={responseQuestion === 'errado' && index === correctAlternativeIndex} />
            ))}
            </ContainerButton>
        </Container>
    )
}