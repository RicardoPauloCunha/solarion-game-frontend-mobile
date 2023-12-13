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
import Title from "../../components/Typographies/Title"
import { getAxiosError } from "../../config/axios/error"
import { getSchemaError } from "../../config/validator/methods"
import { confirmPasswordSchema, emailSchema, nameSchema, passwordSchema } from "../../config/validator/schemas"
import { createCommonUserApi } from "../../hooks/api/user"
import { useAuthContext } from "../../hooks/contexts/auth"
import { setTokenStorage } from "../../hooks/storage/token"

interface AccountFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const RegisterAccount = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const {
        defineLoggedUserByToken
    } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [warning, setWarning] = useState<WarningData | undefined>(undefined)
    const [token, setToken] = useState('')

    const submitAccountForm: SubmitHandler<AccountFormData> = async (data) => {
        try {
            setIsLoading(true)
            setWarning(undefined)
            formRef.current?.setErrors({})

            const shema = Yup.object().shape({
                name: Yup.string()
                    .concat(nameSchema()),
                email: Yup.string()
                    .concat(emailSchema()),
                password: Yup.string()
                    .concat(passwordSchema()),
                confirmPassword: Yup.string()
                    .concat(confirmPasswordSchema('password')),
            })

            await shema.validate(data, { abortEarly: false })

            await createCommonUserApi({
                name: data.name,
                email: data.email,
                password: data.password
            }).then(response => {
                let token = response.result

                setToken(token)
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

    const handleCloseModal = async () => {
        await setTokenStorage(token)

        defineLoggedUserByToken(token)

        navigation.navigate('MyScores')
    }

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <ScreenContainer>
            <Section>
                <Title
                    text="Registrar-se"
                />

                <Form
                    ref={formRef}
                    onSubmit={submitAccountForm}
                >
                    <Input
                        name="name"
                        label="Nome"
                        placeholder="Coloque seu nome"
                    />

                    <Input
                        name="email"
                        label="Email"
                        placeholder="Coloque seu email"
                        keyboardType='email-address'
                    />

                    <Input
                        name="password"
                        label="Senha"
                        placeholder="Coloque sua senha"
                        secureTextEntry={true}
                    />

                    <Input
                        name="confirmPassword"
                        label="Confirme sua senha"
                        placeholder="Coloque sua senha novamente"
                        secureTextEntry={true}
                    />

                    {warning && <WarningCard {...warning} />}

                    <Button
                        text="Criar conta"
                        isLoading={isLoading}
                        onClick={() => formRef.current?.submitForm()}
                    />
                </Form>

                <TextButton
                    text='Já tenho uma conta'
                    onClick={navigateToLogin}
                />
            </Section>

            <SuccessModal
                isOpen={showModal}
                onClose={handleCloseModal}
                title="Conta criada"
                messages={[
                    'Conta de usuário criada com sucesso.',
                    'Agora você pode salvar a pontuação das suas aventuras.'
                ]}
            />
        </ScreenContainer>
    )
}

export default RegisterAccount