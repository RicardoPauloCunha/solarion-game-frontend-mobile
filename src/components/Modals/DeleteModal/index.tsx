import Button from "../../Buttons/Button"
import WarningCard, { WarningData } from "../../Cards/WarningCard"
import BulletList from "../../Typographies/BulletList"
import Paragraph from "../../Typographies/Paragraph"
import Modal from "../Modal"
import { SuccessModalProps } from "../SuccessModal"

interface DeleteModalProps extends SuccessModalProps {
    values: string[]
    warning: WarningData | undefined
    isLoading: boolean
    onConfirm: () => void
}

const DeleteModal = ({
    title,
    messages,
    isOpen,
    onClose,
    values,
    warning,
    isLoading,
    onConfirm
}: DeleteModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            {messages.map((x, index) => (
                <Paragraph
                    key={index}
                    text={x}
                />
            ))}

            <BulletList
                items={values}
                variant="bold"
            />

            {warning && <WarningCard {...warning} />}

            <Button
                text="Remover"
                onClick={onConfirm}
                isLoading={isLoading}
            />
        </Modal>
    )
}

export default DeleteModal