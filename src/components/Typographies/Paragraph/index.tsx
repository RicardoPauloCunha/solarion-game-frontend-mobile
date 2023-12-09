import { Container } from "./styles"

interface ParagraphProps {
    text: string
}

const Paragraph = ({
    text,
}: ParagraphProps) => {
    return (
        <Container>
            {text}
        </Container>
    )
}

export default Paragraph