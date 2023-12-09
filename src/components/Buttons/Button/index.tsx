import LoadingText from "../../Loadings/LoadingText"
import { ButtonVariant, Container } from "./styles"

interface ButtonProps {
    text: string
    variant?: ButtonVariant
    marginTop?: number
    isLoading?: boolean
    disabled?: boolean
    onClick?: () => void
}

const Button = ({
    text,
    variant = 'default',
    marginTop,
    isLoading,
    disabled,
    onClick
}: ButtonProps) => {
    return (
        <Container
            onPress={onClick}
            disabled={isLoading || disabled}
            variant={variant}
            isLoading={isLoading}
            isDisabled={disabled}
            style={{
                marginTop: marginTop !== undefined ? marginTop : 16
            }}
        >
            <LoadingText
                isLoading={!!isLoading}
                defaultText={text}
                variant={(variant === 'default' && !disabled) ? 'white' : 'default'}
            />
        </Container>
    )
}

export default Button