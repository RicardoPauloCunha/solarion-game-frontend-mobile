import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import AnimatedRatingResult from "../../components/Animations/AnimatedRatingResult"
import AnimatedSection, { TextAnimationEnum } from "../../components/Animations/AnimatedSection"
import Button from "../../components/Buttons/Button"
import WarningCard, { WarningData } from "../../components/Cards/WarningCard"
import VerticalGroup from "../../components/Groups/VerticalGroup"
import SuccessModal from "../../components/Modals/SuccessModal"
import ScreenContainer from "../../components/ScreenContainer"
import Paragraph from "../../components/Typographies/Paragraph"
import { getAxiosError } from "../../config/axios/error"
import { createScoreApi } from "../../hooks/api/score"
import { useAuthContext } from "../../hooks/contexts/auth"
import { ScenarioData, getScenarioStorage, removeScenarioStorage } from "../../hooks/storage/scenario"
import { getHeroTypeByDecision } from "../../types/enums/heroType"
import { RatingTypeEnum, getRatingTypeByDecisions, getRatingTypeEnumValue } from "../../types/enums/ratingType"
import { ScenarioTypeEnum } from "../../types/enums/scenarioType"

const DecisionsRating = () => {
    const navigation = useNavigation()

    const {
        loggedUser
    } = useAuthContext()

    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [warning, setWarning] = useState<WarningData | undefined>(undefined)
    const [scenario, setScenario] = useState<ScenarioData | undefined>(undefined)
    const [ratingType, setRatingType] = useState(RatingTypeEnum.None)
    const [ratingTypeValue, setRatingTypeValue] = useState('FFF')
    const [textAnimation, setTextAnimation] = useState(TextAnimationEnum.None)

    useEffect(() => {
        getLastScenario()
    }, [])

    const getLastScenario = async () => {
        let last = await getScenarioStorage()

        if (!last || last.scenarioType !== ScenarioTypeEnum.Finished)
            return

        let rate = getRatingTypeByDecisions(last.decisions)

        setScenario(last)
        setRatingType(rate)
        setRatingTypeValue(getRatingTypeEnumValue(rate))

        setTimeout(() => {
            setTextAnimation(TextAnimationEnum.In)
        }, 2000);
    }

    const saveScore = async () => {
        if (!loggedUser)
            navigation.navigate('AuthStack', { screen: 'Login' })

        if (!scenario)
            return

        setIsLoading(true)
        setWarning(undefined)

        let hero = getHeroTypeByDecision(scenario.decisions[0])

        await createScoreApi({
            ratingType: ratingType,
            heroType: hero,
            decisionTypes: scenario.decisions
        }).then(async () => {
            await removeScenarioStorage()

            setShowModal(true)
        }).catch(baseError => {
            setWarning(getAxiosError(baseError))
        }).finally(() => setIsLoading(false))
    }

    const handleBackHome = () => {
        navigation.navigate('Home')
    }

    return (
        <ScreenContainer>
            {ratingType !== RatingTypeEnum.None && <>
                <AnimatedRatingResult
                    size="large"
                    ratingType={ratingType}
                    animate={true}
                />

                <AnimatedSection
                    textAnimation={textAnimation}
                >
                    <Paragraph
                        text={`Você terminou o Cenário com nota '${ratingTypeValue}'.`}
                    />

                    {warning && <WarningCard {...warning} />}

                    <VerticalGroup>
                        <Button
                            text="Salvar pontuação"
                            marginTop={0}
                            onClick={saveScore}
                            isLoading={isLoading}
                        />

                        <Button
                            text="Voltar ao início"
                            variant="outline"
                            marginTop={0}
                            onClick={handleBackHome}
                        />
                    </VerticalGroup>
                </AnimatedSection>
            </>}

            <SuccessModal
                isOpen={showModal}
                onClose={handleBackHome}
                title="Pontuação salva"
                messages={[
                    'A pontuação dessa aventura foi salva com sucesso.',
                    `Acesse 'Minhas pontuações' para visualizar suas aventuras anteriores ou inicie outra aventura.`,
                    'Até a próxima!!'
                ]}
            />
        </ScreenContainer>
    )
}

export default DecisionsRating