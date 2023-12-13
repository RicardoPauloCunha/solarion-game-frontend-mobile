import { FormHandles, SubmitHandler } from "@unform/core"
import { useEffect, useRef, useState } from "react"
import * as Yup from 'yup'
import Button from "../../components/Buttons/Button"
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
import { editUserDataApi, editUserPasswordApi, getLoggedUserApi } from "../../hooks/api/user"
import { useAuthContext } from "../../hooks/contexts/auth"
import { setTokenStorage } from "../../hooks/storage/token"

enum LoadingEnum {
    None = 0,
    Get = 1,
    Save = 2
}

enum SectionEnum {
    None = 0,
    Data = 1,
    Password = 2
}

interface AccountFormData {
    name: string
    email: string
}

interface PasswordFormData {
    password: string
    newPassword: string
    confirmNewPassword: string
}

const Profile = () => {
    const formAccountRef = useRef<FormHandles>(null)
    const formPasswordRef = useRef<FormHandles>(null)

    const {
        defineLoggedUserByToken
    } = useAuthContext()

    const [isLoading, setIsLoading] = useState(LoadingEnum.None)
    const [showModal, setShowModal] = useState(false)
    const [warning, setWarning] = useState<WarningData | undefined>(undefined)
    const [currentSection, setCurrentSection] = useState(SectionEnum.None)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        setIsLoading(LoadingEnum.Get)

        await getLoggedUserApi().then(response => {
            formAccountRef.current?.setData({
                name: response.name,
                email: response.email,
            })

            setIsLoading(LoadingEnum.None)
        }).catch(() => { })
    }

    const submitAccountForm: SubmitHandler<AccountFormData> = async (data) => {
        try {
            setIsLoading(LoadingEnum.Save)
            setCurrentSection(SectionEnum.Data)
            setWarning(undefined)
            formAccountRef.current?.setErrors({})

            const shema = Yup.object().shape({
                name: Yup.string()
                    .concat(nameSchema()),
                email: Yup.string()
                    .concat(emailSchema())
            })

            await shema.validate(data, { abortEarly: false })

            await editUserDataApi({
                name: data.name,
                email: data.email
            }).then(async (response) => {
                let token = response.result

                await setTokenStorage(token)

                defineLoggedUserByToken(token)

                setShowModal(true)
            }).catch(baseError => {
                setWarning(getAxiosError(baseError))
            }).finally(() => setIsLoading(LoadingEnum.None))
        } catch (error) {
            let schemaError = getSchemaError(error)

            formAccountRef.current?.setErrors(schemaError.errors)
            setWarning(schemaError.warning)
            setIsLoading(LoadingEnum.None)
        }
    }

    const submitPasswordForm: SubmitHandler<PasswordFormData> = async (data) => {
        try {
            setIsLoading(LoadingEnum.Save)
            setCurrentSection(SectionEnum.Password)
            setWarning(undefined)
            formPasswordRef.current?.setErrors({})

            const shema = Yup.object().shape({
                password: Yup.string()
                    .concat(passwordSchema()),
                newPassword: Yup.string()
                    .concat(passwordSchema()),
                confirmNewPassword: Yup.string()
                    .concat(confirmPasswordSchema('newPassword')),
            })

            await shema.validate(data, { abortEarly: false })

            await editUserPasswordApi({
                password: data.password,
                newPassword: data.newPassword
            }).then(() => {
                formPasswordRef.current?.reset()

                setShowModal(true)
            }).catch(baseError => {
                setWarning(getAxiosError(baseError))
            }).finally(() => setIsLoading(LoadingEnum.None))
        } catch (error) {
            let schemaError = getSchemaError(error)

            formPasswordRef.current?.setErrors(schemaError.errors)
            setWarning(schemaError.warning)
            setIsLoading(LoadingEnum.None)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <ScreenContainer>
            <Section>
                <Title
                    text="Minhas informações"
                />

                <Form
                    ref={formAccountRef}
                    onSubmit={submitAccountForm}
                >
                    <Input
                        name="name"
                        label="Nome"
                        placeholder="Coloque seu nome"
                        disabled={isLoading === LoadingEnum.Get}
                    />

                    <Input
                        name="email"
                        label="Email"
                        placeholder="Coloque seu email"
                        keyboardType="email-address"
                        disabled={isLoading === LoadingEnum.Get}
                    />

                    {warning && currentSection === SectionEnum.Data && <WarningCard {...warning} />}

                    <Button
                        text="Alterar informações"
                        isLoading={isLoading === LoadingEnum.Get
                            || (isLoading === LoadingEnum.Save && currentSection === SectionEnum.Data)}
                        onClick={() => formAccountRef.current?.submitForm()}
                    />
                </Form>
            </Section>

            <Section>
                <Title
                    text="Senha de acesso"
                />

                <Form
                    ref={formPasswordRef}
                    onSubmit={submitPasswordForm}
                >
                    <Input
                        name="password"
                        label="Senha"
                        placeholder="Coloque sua senha"
                        secureTextEntry={true}
                    />

                    <Input
                        name="newPassword"
                        label="Nova senha"
                        placeholder="Coloque sua nova senha"
                        secureTextEntry={true}
                    />

                    <Input
                        name="confirmNewPassword"
                        label="Confirme sua nova senha"
                        placeholder="Coloque sua nova senha novamente"
                        secureTextEntry={true}
                    />

                    {warning && currentSection === SectionEnum.Password && <WarningCard {...warning} />}

                    <Button
                        text="Alterar senha"
                        isLoading={currentSection === SectionEnum.Password && isLoading === LoadingEnum.Get}
                        onClick={() => formPasswordRef.current?.submitForm()}
                    />
                </Form>
            </Section>

            <SuccessModal
                isOpen={showModal}
                onClose={handleCloseModal}
                title="Dados alterados"
                messages={[
                    'Os dados da sua conta foram alterados com sucesso.'
                ]}
            />
        </ScreenContainer>
    )
}

export default Profile