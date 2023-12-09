import Bold from '../Bold'
import Span from '../Span'
import { Container } from './styles'

interface BulletListProps {
    items: string[]
    variant?: 'default' | 'bold'
}

const BulletList = ({
    items,
    variant = 'default'
}: BulletListProps) => {
    return (
        <Container>
            {items.map((x, index) => variant === 'default'
                ? <Span
                    key={index}
                    text={`\u2022 ${x}`}
                />
                : <Bold
                    key={index}
                    text={`\u2022 ${x}`}
                />
            )}
        </Container>
    )
}

export default BulletList