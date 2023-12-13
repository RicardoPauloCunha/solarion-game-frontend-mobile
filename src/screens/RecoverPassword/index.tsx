import { useNavigation } from "@react-navigation/native"
import { FormHandles, SubmitHandler } from "@unform/core"
import { useRef, useState } from "react"
import * as Yup from 'yup'
import Button from "../../components/Buttons/Button"
import TextButton from "../../components/Buttons/TextButton"
import WarningCard, { WarningData } from "../../components/Cards/WarningCard"
import { Form } from "../../components/Form/styles"
import Input from "../../components/Inputs/Input"
import SuccessModal from "../../components/Modals/SuccessModal"
import ScreenContainer from "../../components/ScreenContainer"
import Section from "../../components/Sections/Section"
import Paragraph from "../../components/Typographies/Paragraph"
import Title from "../../components/Typographies/Title"
import { getAxiosError } from "../../config/axios/error"
import { getSchemaError } from "../../config/validator/methods"
import { confirmPasswordSchema, emailSchema, passwordSchema } from "../../config/validator/schemas"
import { replyPasswordRecoveryApi, solicitPasswordRecoveryApi } from "../../hooks/api/passwordRecovery"

interface SolicitRecoverFormData {
    email: string
}

interface RecoverPasswordFormData {
    verificationCode: string
    password: string
    confirmPassword: string
}

const RecoverPassword = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [warning, setWarning] = useState<WarningData | undefined>(undefined)
    const [email, setEmail] = useState('')

    const submitSolicitRecoverForm: SubmitHandler<SolicitRecoverFormData> = async (data) => {
        try {
            setIsLoading(true)
            setWarning(undefined)
            formRef.current?.setErrors({})

            const shema = Yup.object().shape({
                email: Yup.string()
                    .concat(emailSchema()),
            })

            await shema.validate(data, { abortEarly: false })

            await solicitPasswordRecoveryApi({
                email: data.email,
            }).then(() => {
                setEmail(data.email)
            }).catch(baseError => {
                setWarning(getAxiosError(baseError))
            }).finally(() => setIsLoading(false))
        } catch (error) {
            let schemaError = getSchemaError(error)

            formRef.current?.setErrors(schemaError.errors)
            setWarning(schemaError.warning)
            setIsLoading(false)
        }
    }

    const submitRecoverPasswordForm: SubmitHandler<RecoverPasswordFormData> = async (data) => {
        try {
            setIsLoading(true)
            setWarning(undefined)
            formRef.current?.setErrors({})

            const shema = Yup.object().shape({
                verificationCode: Yup.string().trim()
                    .length(6)
                    .required(),
                password: Yup.string()
                    .concat(passwordSchema()),
                confirmPassword: Yup.string()
                    .concat(confirmPasswordSchema('password')),
            })

            await shema.validate(data, { abortEarly: false })

            await replyPasswordRecoveryApi({
                verificationCode: data.verificationCode,
                email,
                password: data.password
            }).then(() => {
                setShowModal(true)
            }).catch(baseError => {
                setWarning(getAxiosError(baseError))
            }).finally(() => setIsLoading(false))
        } catch (error) {
            let schemaError = getSchemaError(error)

            formRef.current?.setErrors(schemaError.errors)
            setWarning(schemaError.warning)
            setIsLoading(false)
        }
    }

    const handleCloseModal = () => {
        navigation.navigate('Login')
        setShowModal(false)
    }

    const handleBack = () => {
        let mail = email

        setEmail('')
        setWarning(undefined)

        setTimeout(() => {
            formRef.current?.setFieldValue('email', mail)
        }, 300)
    }

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <ScreenContainer>
            {!email
                ? <Section>
                    <Title
                        text="Recuperar senha"
                    />

                    <Form
                        ref={formRef}
                        onSubmit={submitSolicitRecoverForm}
                    >
                        <Input
                            name="email"
                            label="Email"
                            placeholder="Coloque o email da sua conta"
                            keyboardType='email-address'
                        />

                        {warning && <WarningCard {...warning} />}

                        <Button
                            text="Avançar"
                            isLoading={isLoading}
                            onClick={() => formRef.current?.submitForm()}
                        />
                    </Form>

                    <TextButton
                        text='Entrar'
                        onClick={navigateToLogin}
                    />
                </Section>
                : <Section>
                    <Title
                        text="Recuperar senha"
                    />

                    <Paragraph
                        text={`Foi enviado para o email (${email}) o código de verificação para a recuperação de senha.`}
                    />

                    <Form
                        ref={formRef}
                        onSubmit={submitRecoverPasswordForm}
                    >
                        <Input
                            name="verificationCode"
                            label="Código de verificação"
                            placeholder="Coloque o código de verificação"
                        />

                        <Input
                            name="password"
                            label="Nova senha"
                            placeholder="Coloque sua nova senha"
                            secureTextEntry={true}
                        />

                        <Input
                            name="confirmPassword"
                            label="Confirme sua nova senha"
                            placeholder="Coloque sua nova senha novamente"
                            secureTextEntry={true}
                        />

                        {warning && <WarningCard {...warning} />}

                        <Button
                            text="Alterar senha"
                            isLoading={isLoading}
                            onClick={() => formRef.current?.submitForm()}
                        />
                    </Form>

                    <TextButton
                        text="Voltar"
                        onClick={handleBack}
                    />
                </Section>
            }

            <SuccessModal
                isOpen={showModal}
                onClose={handleCloseModal}
                title="Senha alterada"
                messages={[
                    'Senha da conta alterada com sucesso.',
                    'Faça login usando o email e a nova senha para continuar a registrar a pontuação das suas aventuras.'
                ]}
            />
        </ScreenContainer>
    )
}

export default RecoverPassword