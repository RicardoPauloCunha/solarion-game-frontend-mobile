import { Container } from "./styles"

interface TitleProps {
    text: string
}

const Title = ({
    text
}: TitleProps) => {
    return (
        <Container>
            {text}
        </Container>
    )
}

export default Title