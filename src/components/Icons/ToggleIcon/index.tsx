import React from 'react'
import Span from '../../Typographies/Span'
import { Container, Icon } from './styles'

interface ToggleIconProps {
    isOpen: boolean
    onToggle: () => void
}

const ToggleIcon = ({
    isOpen,
    onToggle,
}: ToggleIconProps) => {
    return (
        <Container
            onPress={onToggle}
        >
            <Icon
                name={isOpen ? 'eye-slash' : 'eye'}
            />

            <Span
                text={isOpen ? 'Esconder' : 'Mostrar'}
            />
        </Container>
    )
}

export default ToggleIcon