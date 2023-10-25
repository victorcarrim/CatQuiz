import { Container, Question, Subtitle, Theme } from "./styles";

type Props = {
    question: string,
    subtitle?: string,
    points?: string,
    theme?: string
}

export function CardQuestion({ question, theme, subtitle, points } : Props){
    return(
        <Container>
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
            {theme && 
                <Theme>
                    Tema: {theme}
                </Theme>
            }
            
        </Container>
    )
}