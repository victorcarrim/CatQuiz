import { Container, Progress, Question, Subtitle, Theme } from "./styles";

type Props = {
    question: string,
    subtitle?: string,
    points?: any,
    acert?: any
    theme?: string,
    progress?: string
}

export function CardQuestion({ question, theme, subtitle, points, progress, acert } : Props){
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
                points &&
                <Subtitle>
                    Pontuação: {points}
                </Subtitle>
            }
            {
                acert &&
                <Subtitle>
                    Questões Acertadas: {acert}
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