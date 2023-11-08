import { useState } from "react";
import Button from "../../components/button";
import { CardQuestion } from "../../components/cardQuestion";
import { Container, ContainerTheme, ContainerTwo, Row } from "./styles";
import { Input } from "antd";

interface JsonGameType {
    nome: string;
    modo_jogo: string;
}

interface Props {
    onJsonGameUpdate: (data: JsonGameType) => void;
}

export function InitialGame(props : Props){

    const [jsonGame, setJsonGame] = useState({
        nome : "",
        modo_jogo: "/"
    });

    const [gameNon, setGameNon] = useState(false);
    const [name, setName] = useState(false);
    const [theme, setTheme] = useState(false);
    const [mode, setMode] = useState(false);
    const [startGame, setStartGame] = useState(false)

    function updateJsonGame(){
        props.onJsonGameUpdate(jsonGame); // Informa o componente pai da atualização
    }



    return(
        <Container>
            <ContainerTwo>
                {!gameNon &&
                    <CardQuestion question="PyQuiz" subtitle="Para começar a jogar clique em iniciar"  />
                }
                {name &&
                    <CardQuestion question="PyQuiz" subtitle="Digite seu nome"  />
                }
                {theme &&
                    <CardQuestion question="PyQuiz" subtitle="Escolha o tema do jogo"  />
                }
                {mode &&
                    <CardQuestion question="PyQuiz" subtitle="Escolha o modo do jogo"  />
                }
                {startGame &&
                    <CardQuestion question="PyQuiz" subtitle="Pronto para aventura?"  />
                }
            </ContainerTwo>
            {!gameNon &&
                <ContainerTwo>
                    <Button text="Iniciar" onClick={() => {setGameNon(true), setName(true)}} />
                </ContainerTwo>
            }
            {name &&
                <Container>
                    <ContainerTwo>
                        <Input placeholder="Digite seu nome"  onChange={(event) => setJsonGame(prevState => ({ ...prevState, nome: event.target.value }))}/>
                    </ContainerTwo>
                    <ContainerTwo>
                        <Button text="Próximo" onClick={() => {setName(false), setTheme(true)}} />
                    </ContainerTwo>
                </Container>
            }
            {
                theme &&
                <ContainerTheme>
                    <Row>
                        <ContainerTwo>
                            <Button text="Git" onClick={() => {setJsonGame(prevState => ({ ...prevState, modo_jogo: "Git/" })), setTheme(false), setMode(true)}} />
                        </ContainerTwo>
                        <ContainerTwo>
                            <Button text="Front-End" onClick={() => {setJsonGame(prevState => ({ ...prevState, modo_jogo: "FrontEnd/" })), setTheme(false), setMode(true)}} />
                        </ContainerTwo>
                    </Row>
                    
                    <Row>
                        <ContainerTwo>
                            <Button text="Desenvolvimento Ágil" onClick={() => {setJsonGame(prevState => ({ ...prevState, modo_jogo: "Desenvolvimento Ágil/" })), setTheme(false), setMode(true)}} />
                        </ContainerTwo>
                        <ContainerTwo>
                            <Button text="Banck-End" onClick={() => {setJsonGame(prevState => ({ ...prevState, modo_jogo: "BackEnd/" })), setTheme(false), setMode(true)}} />
                        </ContainerTwo>
                    </Row>
                    
                    <ContainerTwo>
                        <Button text="Aleatório" onClick={() => { setTheme(false), setMode(true) }} />
                    </ContainerTwo>
                </ContainerTheme>
            }

            {
                mode &&
                <ContainerTheme>
                    <Row>
                        <ContainerTwo>
                            <Button text="Fácil" onClick={() => { const leftPart = jsonGame.modo_jogo.split('/')[0]; setJsonGame(prevState => ({ ...prevState, modo_jogo: leftPart + "/10" })); setStartGame(true); setMode(false)}} />
                        </ContainerTwo>
                        <ContainerTwo>
                            <Button text="Médio" onClick={() => { const leftPart = jsonGame.modo_jogo.split('/')[0]; setJsonGame(prevState => ({ ...prevState, modo_jogo: leftPart + "/30" }));setStartGame(true); setMode(false)}} />
                        </ContainerTwo>
                    </Row>
                    
                    <Row>
                        <ContainerTwo>
                            <Button text="Dificil" onClick={() => { const leftPart = jsonGame.modo_jogo.split('/')[0]; setJsonGame(prevState => ({ ...prevState, modo_jogo: leftPart + "/50" }));setStartGame(true); setMode(false)}} />
                        </ContainerTwo>
                        <ContainerTwo>
                            <Button text="Aleatório" onClick={() => {setStartGame(true); setMode(false)}} />
                        </ContainerTwo>
                    </Row>
                </ContainerTheme>
            }
            {
                startGame &&
                <ContainerTwo>
                    <Button text="Iniciar" onClick={() => updateJsonGame()} />
                </ContainerTwo>
            }

            
        </Container>
    )

}