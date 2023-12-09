import Bold from "../../Typographies/Bold"
import { Container } from "./styles"

interface DecisionButtonProps {
    text: string
    onClick?: () => void
}

const DecisionButton = ({
    text,
    onClick
}: DecisionButtonProps) => {
    return (
        <Container
            onPress={onClick}
        >
            <Bold
                text={text}
            />
        </Container>
    )
}

export default DecisionButton