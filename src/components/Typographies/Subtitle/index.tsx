import { Container } from "./styles"

interface SubtitleProps {
    text: string
}

const Subtitle = ({
    text
}: SubtitleProps) => {
    return (
        <Container>
            {text}
        </Container>
    )
}

export default Subtitle