import React, { useState } from 'react'
import ToggleIcon from '../Icons/ToggleIcon'
import Bold from '../Typographies/Bold'
import { Container, Header } from './styles'

interface ToggleProps {
    text: string
    isOpenDefault?: boolean
    onOpen?: () => void
    preview?: React.ReactNode
    children: React.ReactNode
}

const Toggle = ({
    text,
    isOpenDefault = false,
    onOpen,
    preview,
    children,
}: ToggleProps) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault)

    const handleToggle = () => {
        let open = !isOpen

        setIsOpen(open)

        if (open && onOpen)
            onOpen()
    }

    return (
        <Container>
            <Header
                isOpen={isOpen || !!preview}
            >
                <Bold
                    text={text}
                />

                <ToggleIcon
                    isOpen={isOpen}
                    onToggle={handleToggle}
                />
            </Header>

            {preview && !isOpen && preview}

            {isOpen && children}
        </Container>
    )
}

export default Toggle