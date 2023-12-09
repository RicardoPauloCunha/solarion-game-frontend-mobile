import { Container, SpanVariant } from "./styles"

interface SpanProps {
    text: string
    variant?: SpanVariant
}

const Span = ({
    text,
    variant = 'default'
}: SpanProps) => {
    return (
        <Container
            variant={variant}
        >
            {text}
        </Container>
    )
}

export default Span