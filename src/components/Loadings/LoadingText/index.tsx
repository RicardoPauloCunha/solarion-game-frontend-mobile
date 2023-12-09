import { ActivityIndicator } from "react-native"
import Theme from "../../../styles/theme"
import Bold from "../../Typographies/Bold"
import { BoldVariant } from "../../Typographies/Bold/styles"
import { Container } from "./styles"

interface LoadingTextProps {
    isLoading: boolean
    defaultText?: string
    loadingText?: string
    variant?: BoldVariant
}

const LoadingText = ({
    isLoading,
    defaultText,
    loadingText = 'Carregando...',
    variant = 'default'
}: LoadingTextProps) => {
    return (
        <>
            {(defaultText || isLoading) && <Container>
                {isLoading
                    ? <>
                        <Bold
                            text={loadingText}
                            variant={variant}
                        />

                        <ActivityIndicator
                            size='small'
                            color={variant === "default"
                                ? Theme.color.wine
                                : Theme.color.white
                            }
                        />
                    </>
                    : <>
                        {defaultText && <Bold
                            text={defaultText}
                            variant={variant}
                        />}
                    </>
                }
            </Container>}
        </>
    )
}

export default LoadingText