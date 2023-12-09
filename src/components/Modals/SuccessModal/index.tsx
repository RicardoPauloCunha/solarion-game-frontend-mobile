import Button from "../../Buttons/Button"
import Paragraph from "../../Typographies/Paragraph"
import Modal from "../Modal"
import { Icon } from "./styles"

export interface SuccessModalProps {
    title: string
    messages: string[]
    isOpen: boolean
    onClose: () => void
}

const SuccessModal = ({
    title,
    messages,
    isOpen,
    onClose
}: SuccessModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <Icon
                name='check-circle'
            />

            {messages.map((x, index) => (
                <Paragraph
                    key={index}
                    text={x}
                />
            ))}

            <Button
                text="Entendi"
                onClick={onClose}
            />
        </Modal>
    )
}

export default SuccessModal