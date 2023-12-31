import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { View } from "react-native"
import CH1TableImg from '../../assets/images/ch1-table.png'
import AnimatedImage, { ImageAnimationEnum } from "../../components/AnimatedImage"
import DecisionButton from "../../components/Buttons/DecisionButton"
import NextIcon from "../../components/Icons/NextIcon"
import ScreenContainer from "../../components/ScreenContainer"
import AnimatedSection, { TextAnimationEnum } from "../../components/Sections/AnimatedSection"
import Paragraph from "../../components/Typographies/Paragraph"
import { DecisionViewModel } from "../../hooks/api/score"
import { getScenarioStorage, setScenarioStorage } from "../../hooks/storage/scenario"
import { DecisionTypeEnum } from "../../types/enums/decisionType"
import { ScenarioTypeEnum, getNextScenarioType, getScenarioTypeEnumValue, getScenarioTypeImage, listDecisionByScenario } from "../../types/enums/scenarioType"
import { delay } from "../../utils/timer"
import { SectionContent } from "./styles"

const Scenario = () => {
    const navigation = useNavigation()

    const [scenarioType, setScenarioType] = useState(ScenarioTypeEnum.None)
    const [selectedDecisionTypes, setSelectedDecisionTypes] = useState<DecisionTypeEnum[]>([])
    const [img, setImg] = useState(CH1TableImg)
    const [text, setText] = useState('')
    const [decisions, setDecisions] = useState<DecisionViewModel[]>([])
    const [hasDecisions, setHasDecisions] = useState(true)
    const [imageAnimation, setImageAnimation] = useState(ImageAnimationEnum.None)
    const [textAnimation, setTextAnimation] = useState(TextAnimationEnum.None)

    useEffect(() => {
        getLastScenario()
    }, [])

    useEffect(() => {
        setHasDecisions(decisions.length !== 0)
    }, [decisions])

    useEffect(() => {
        if (scenarioType !== ScenarioTypeEnum.None)
            saveScenario(scenarioType)
    }, [scenarioType])

    const getLastScenario = async () => {
        let last = await getScenarioStorage()

        if (last?.scenarioType === ScenarioTypeEnum.Finished) {
            navigation.navigate('DecisionsRating')
        }
        if (last) {
            setSelectedDecisionTypes(last.decisions)
            defineScene(last.scenarioType)
        }
        else {
            handleInitScene()
        }
    }

    const defineScene = async (scenarioType: ScenarioTypeEnum) => {
        setTextAnimation(TextAnimationEnum.Out)

        setScenarioType(scenarioType)

        let nextImg = getScenarioTypeImage(scenarioType)

        if (nextImg !== img) {
            await delay(500)
            setImageAnimation(ImageAnimationEnum.OutToIn)
            await delay(1000)

            setImg(nextImg)

            await delay(500)
        }

        await delay(500)
        setTextAnimation(TextAnimationEnum.In)
        setImageAnimation(ImageAnimationEnum.None)

        setText(getScenarioTypeEnumValue(scenarioType))
        setDecisions(listDecisionByScenario(scenarioType))
    }

    const saveScenario = async (type: ScenarioTypeEnum) => {
        await setScenarioStorage({
            scenarioType: type,
            decisions: selectedDecisionTypes,
            creationDate: new Date()
        })
    }

    const handleInitScene = () => {
        let type = ScenarioTypeEnum.CH1_ACT2_DEC

        defineScene(type)
    }

    const handleNextScene = async (decisionType?: DecisionTypeEnum) => {
        if (scenarioType === ScenarioTypeEnum.CH8_AC3)
            decisionType = selectedDecisionTypes[0]

        let nextType = getNextScenarioType(scenarioType, decisionType)

        if (nextType === ScenarioTypeEnum.Finished) {
            setTextAnimation(TextAnimationEnum.Out)

            await delay(500)
            setImageAnimation(ImageAnimationEnum.Out)
            await delay(1000)

            saveScenario(nextType)

            navigation.navigate('DecisionsRating')
        }
        else {
            defineScene(nextType)
        }
    }

    const handleSelectDecision = (decisionType: DecisionTypeEnum) => {
        setSelectedDecisionTypes([...selectedDecisionTypes, decisionType])

        handleNextScene(decisionType)
    }

    return (
        <ScreenContainer>
            <AnimatedImage
                imageAnimation={imageAnimation}
                source={img}
            />

            {text && <AnimatedSection
                textAnimation={textAnimation}
            >
                {hasDecisions
                    ? <>
                        <Paragraph
                            text={text}
                        />

                        <View
                            style={{ width: '100%' }}
                        >
                            {decisions.map(x => (
                                <DecisionButton
                                    key={x.decisionType}
                                    text={x.decisionTypeValue}
                                    onClick={() => handleSelectDecision(x.decisionType)}
                                />
                            ))}
                        </View>
                    </>
                    : <SectionContent
                        onPress={() => handleNextScene()}
                    >
                        <Paragraph
                            text={text}
                        />

                        <NextIcon />
                    </SectionContent>
                }
            </AnimatedSection>}
        </ScreenContainer>
    )
}

export default Scenario