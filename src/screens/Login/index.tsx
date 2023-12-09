import { useNavigation } from "@react-navigation/native"
import { FormHandles, SubmitHandler } from "@unform/core"
import { useRef, useState } from "react"
import * as Yup from 'yup'
import Button from "../../components/Buttons/Button"
import TextButton from "../../components/Buttons/TextButton"
import WarningCard, { WarningData } from "../../components/Cards/WarningCard"
import { Form } from "../../components/Form/styles"
import Input from "../../components/Inputs/Input"
import ScreenContainer from "../../components/ScreenContainer"
import Section from "../../components/Section"
import Title from "../../components/Typographies/Title"
import { getAxiosError } from "../../config/axios/error"
import { getSchemaError } from "../../config/validator/methods"
import { emailSchema, passwordSchema } from "../../config/validator/schemas"
import { loginApi } from "../../hooks/api/user"
import { useAuthContext } from "../../hooks/contexts/auth"
import { setTokenStorage } from "../../hooks/storage/token"
import { UserTypeEnum } from "../../types/enums/userType"

interface LoginFormData {
    email: string
    password: string
}

const Login = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)

    const {
        defineLoggedUserByToken
    } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [warning, setWarning] = useState<WarningData | undefined>(undefined)

    const submitLoginForm: SubmitHandler<LoginFormData> = async (data) => {
        try {
            setIsLoading(true)
            setWarning(undefined)
            formRef.current?.setErrors({})

            const shema = Yup.object().shape({
                email: Yup.string()
                    .concat(emailSchema()),
                password: Yup.string()
                    .concat(passwordSchema())
            })

            await shema.validate(data, { abortEarly: false })

            await loginApi({
                email: data.email,
                password: data.password
            }).then(async (response) => {
                let token = response.result

                await setTokenStorage(token)

                let user = defineLoggedUserByToken(token)

                if (user.userType === UserTypeEnum.Admin)
                    navigation.navigate('Scores')
                else
                    navigation.navigate('MyScores')
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

    const navigateToRecoverPassword = () => {
        navigation.navigate('RecoverPassword')
    }

    const navigateToRegisterAccount = () => {
        navigation.navigate('RegisterAccount')
    }

    return (
        <ScreenContainer>
            <Section>
                <Title
                    text="Login"
                />

                <Form
                    ref={formRef}
                    onSubmit={submitLoginForm}
                >
                    <Input
                        name='email'
                        label='Email'
                        placeholder='Coloque seu email'
                        keyboardType='email-address'
                    />

                    <Input
                        name='password'
                        label='Senha'
                        placeholder='Coloque sua senha'
                        secureTextEntry={true}
                    />

                    {warning && <WarningCard {...warning} />}

                    <Button
                        text="Entrar"
                        isLoading={isLoading}
                        onClick={() => formRef.current?.submitForm()}
                    />
                </Form>

                <TextButton
                    text='Esqueci minha senha'
                    onClick={navigateToRecoverPassword}
                />

                <TextButton
                    text='Registrar-se'
                    onClick={navigateToRegisterAccount}
                />
            </Section>
        </ScreenContainer>
    )
}

export default Login