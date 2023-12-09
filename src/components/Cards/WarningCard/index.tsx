import Toggle from "../../Toggle"
import Bold from "../../Typographies/Bold"
import BulletList from "../../Typographies/BulletList"
import Span from "../../Typographies/Span"
import { Container, Header, Icon, WarningVariant } from "./styles"

export interface WarningData {
    title: string
    message: string
    variant?: WarningVariant
    submessages?: string[]
}

interface WarningCardProps extends WarningData {

}

const WarningCard = ({
    title,
    message,
    submessages,
    variant = 'error',
}: WarningCardProps) => {
    return (
        <Container
            variant={variant}
        >
            <Header>
                {variant === 'info' && <Icon
                    name='info-circle'
                    variant={variant}
                />}

                {variant === 'error' && <Icon
                    name='times-circle'
                    variant={variant}
                />}

                <Bold
                    text={title}
                />
            </Header>

            <Span
                text={message}
            />

            {submessages && submessages.length !== 0 && <Toggle
                text='Detalhes'
            >
                <BulletList
                    items={submessages}
                />
            </Toggle>}
        </Container>
    )
}

export default WarningCard