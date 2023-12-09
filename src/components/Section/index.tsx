import { Container } from "./styles"

interface SectionProps {
    children: React.ReactNode
}

const Section = ({
    children
}: SectionProps) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Section