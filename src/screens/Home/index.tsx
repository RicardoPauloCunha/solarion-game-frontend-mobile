import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import CH1TableImg from '../../assets/images/ch1-table.png'
import AnimatedImage, { ImageAnimationEnum } from "../../components/Animations/AnimatedImage"
import Button from "../../components/Buttons/Button"
import VerticalGroup from "../../components/Groups/VerticalGroup"
import Modal from "../../components/Modals/Modal"
import ScreenContainer from "../../components/ScreenContainer"
import Section from "../../components/Section"
import Toggle from "../../components/Toggle"
import Attribute from "../../components/Typographies/Attribute"
import BulletList from "../../components/Typographies/BulletList"
import Paragraph from "../../components/Typographies/Paragraph"
import Title from "../../components/Typographies/Title"
import { ScenarioData, getScenarioStorage, removeScenarioStorage } from "../../hooks/storage/scenario"
import { getDecisionTypeEnumValue } from "../../types/enums/decisionType"
import { getHeroTypeByDecision, getHeroTypeEnumValue } from "../../types/enums/heroType"
import { ScenarioTypeEnum } from "../../types/enums/scenarioType"
import { formatDateToView } from "../../utils/date"

const Home = () => {
    const navigation = useNavigation()

    const [showModal, setShowModal] = useState(false)
    const [scenario, setScenario] = useState<ScenarioData | undefined>(undefined)
    const [heroTypeValue, setHeroTypeValue] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const [decisionTypesValue, setDecisionTypesValue] = useState<string[]>([])

    useEffect(() => {
        getLastScenario()
    }, [])

    const getLastScenario = async () => {
        let last = await getScenarioStorage()

        if (!last || last.scenarioType === ScenarioTypeEnum.Finished)
            return

        let hero = getHeroTypeEnumValue(getHeroTypeByDecision(last.decisions[0]))
        let date = formatDateToView(last.creationDate)
        let values = last.decisions.map(x => getDecisionTypeEnumValue(x))

        setScenario(last)
        setHeroTypeValue(hero)
        setCreationDate(date)
        setDecisionTypesValue(values)
    }

    const handlePlay = () => {
        handleRemoveContinuation()

        navigation.navigate('Scenario')
    }

    const handleContinue = () => {
        setShowModal(true)
    }

    const handleConfirmContinue = () => {
        navigation.navigate('Scenario')
    }

    const handleRemoveContinuation = async () => {
        await removeScenarioStorage()

        setScenario(undefined)
        setHeroTypeValue('')
        setCreationDate('')
        setDecisionTypesValue([])
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <ScreenContainer>
            <AnimatedImage
                imageAnimation={ImageAnimationEnum.None}
                source={CH1TableImg}
            />

            <Section>
                <Title
                    text="Solarion Chronicles: The Game"
                />

                <Paragraph
                    text="Huum... Parece que a missão de hoje nos levará à Torre do Necromante... para tentar recuperar o Cajado de Solarion das garras de Xarth, o Senhor do Terror."
                />

                <VerticalGroup>
                    <Button
                        marginTop={0}
                        text='Novo jogo'
                        onClick={handlePlay}
                    />

                    <Button
                        marginTop={0}
                        text='Continuar jogando'
                        variant='outline'
                        onClick={handleContinue}
                    />
                </VerticalGroup>
            </Section>

            <Modal
                title="Continuar jogando"
                isOpen={showModal}
                onClose={handleCloseModal}
            >
                {scenario
                    ? <>
                        <Paragraph
                            text="O progresso da sua última aventura foi salvo."
                        />

                        <VerticalGroup>
                            <Attribute
                                field="Classe:"
                                value={heroTypeValue}
                            />

                            <Attribute
                                field="Data:"
                                value={creationDate}
                            />

                            <Toggle
                                text="Decisões:"
                                preview={<BulletList
                                    items={[decisionTypesValue[0] + '..']}
                                />}
                            >
                                <BulletList
                                    items={decisionTypesValue}
                                />
                            </Toggle>
                        </VerticalGroup>

                        <VerticalGroup>
                            <Button
                                text="Continuar"
                                onClick={handleConfirmContinue}
                            />

                            <Button
                                text="Remover"
                                variant="outline"
                                marginTop={0}
                                onClick={handleRemoveContinuation}
                            />
                        </VerticalGroup>
                    </>
                    : <>
                        <Paragraph
                            text="Nenhum registro da sua última aventura foi encontrado."
                        />

                        <Button
                            text='Novo jogo'
                            onClick={handlePlay}
                        />
                    </>}
            </Modal>
        </ScreenContainer>
    )
}

export default Home