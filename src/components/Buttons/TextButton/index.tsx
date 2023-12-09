import { Container, Text } from "./styles"

interface TextButtonProps {
    text: string
    onClick?: () => void
}

const TextButton = ({
    text,
    onClick,
}: TextButtonProps) => {
    return (
        <Container
            onPress={onClick}
        >
            <Text>
                {text}
            </Text>
        </Container>
    )
}

export default TextButton