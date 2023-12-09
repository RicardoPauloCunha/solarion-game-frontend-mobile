import { DimensionValue } from "react-native"
import Bold from "../Bold"
import Span from "../Span"
import { Container } from "./styles"

interface AttributeProps {
    field: string
    value: string
    width?: DimensionValue
}

const Attribute = ({
    field,
    value,
    width
}: AttributeProps) => {
    return (
        <Container
            style={{
                width: width ? width : '100%'
            }}
        >
            <Bold
                text={field}
            />

            <Span
                text={value}
            />
        </Container>
    )
}

export default Attribute