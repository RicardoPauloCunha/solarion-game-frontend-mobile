import { BoldVariant, Container } from "./styles"

interface BoldProps {
    text: string
    variant?: BoldVariant
}

const Bold = ({
    text,
    variant = 'default'
}: BoldProps) => {
    return (
        <Container
            variant={variant}
        >
            {text}
        </Container>
    )
}

export default Bold