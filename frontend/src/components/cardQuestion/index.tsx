import { Container, Progress, Question, Subtitle, Theme } from "./styles";

type Props = {
    question: string,
    subtitle?: string,
    points?: any,
    acert?: any
    theme?: string,
    progress?: string
    modeAndDificult?: string
    name?: any,
    nameBoolean?: Boolean
}

function mapDifficulty(difficulty: string) {
    switch(difficulty) {
        case "10": return "Fácil";
        case "30": return "Médio";
        case "50": return "Difícil";
        default: return "Aleatório";
    }
}

function extractModeAndDifficulty(modeAndDificult: string) {
    let [mode, difficulty] = modeAndDificult.split('/');
    mode = mode || "Aleatório";
    difficulty = mapDifficulty(difficulty); 

    return { mode, difficulty };
}

export function CardQuestion({ question, theme, subtitle, points, progress, acert, modeAndDificult, name, nameBoolean } : Props){
    const { mode, difficulty } = modeAndDificult ? extractModeAndDifficulty(modeAndDificult) : { mode: "", difficulty: "" };


    return(
        <Container>
            {
                progress &&
                <Progress>
                    {progress}
                </Progress>
            }
            <Question>
                {question}
            </Question>
            {
                subtitle &&
                <Subtitle>
                    {subtitle}
                </Subtitle>
            }
            {
                nameBoolean &&
                <Subtitle>
                    Jogador: {name || "Não identificado"}
                </Subtitle>
            }
            {
                points &&
                <Subtitle>
                    Pontuação: {points}
                </Subtitle>
            }
            {
                modeAndDificult &&
                <Subtitle>
                    Tema: {mode}
                </Subtitle>
            }
            {
                modeAndDificult &&
                <Subtitle>
                    Dificuldade: {difficulty}
                </Subtitle>
            }
            {theme && 
                <Theme>
                    Tema: {theme}
                </Theme>
            }
            
        </Container>
    )
}