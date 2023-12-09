import React from 'react'
import { TouchableOpacity } from 'react-native'
import Subtitle from '../../Typographies/Subtitle'
import { Container, Content, Fade, Header, Icon, Scroll } from './styles'

interface ModalProps {
    title: string
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal = ({
    title,
    isOpen,
    onClose,
    children,
}: ModalProps) => {
    return (
        <Container
            animationType='fade'
            transparent={true}
            visible={isOpen}
        >
            <Fade>
                <Scroll
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center'
                    }}
                >
                    <Content>
                        <Header>
                            <Subtitle
                                text={title}
                            />

                            <TouchableOpacity
                                onPress={onClose}
                            >
                                <Icon
                                    name='times'
                                />
                            </TouchableOpacity>
                        </Header>

                        {children}
                    </Content>
                </Scroll>
            </Fade>
        </Container>
    )
}

export default Modal