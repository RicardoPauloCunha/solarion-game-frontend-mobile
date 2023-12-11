import { TouchableOpacity } from "react-native"
import { ScoreViewModel } from "../../../hooks/api/score"
import AnimatedRatingResult from "../../Animations/AnimatedRatingResult"
import Button from "../../Buttons/Button"
import Toggle from "../../Toggle"
import Attribute from "../../Typographies/Attribute"
import BulletList from "../../Typographies/BulletList"
import Subtitle from "../../Typographies/Subtitle"
import { Container, Header, Icon } from "./styles"

interface ScoreCardProps {
    data: ScoreViewModel,
    isLoading?: boolean,
    onDelete?: () => void
    onSave?: () => void
}

const ScoreCard = ({
    data,
    isLoading,
    onDelete,
    onSave
}: ScoreCardProps) => {
    return (
        <Container>
            {onSave && <Subtitle
                text="Pontuação da última aventura"
            />}

            {data.userName && <Subtitle
                text={data.userName}
            />}

            <AnimatedRatingResult
                size="small"
                ratingType={data.ratingType}
            />

            <Header>
                <Attribute
                    field="Classe:"
                    value={data.heroTypeValue}
                    width={'90%'}
                />

                {onDelete && <TouchableOpacity
                    onPress={onDelete}
                >
                    <Icon
                        name='times'
                    />
                </TouchableOpacity>}
            </Header>

            <Attribute
                field="Data:"
                value={data.creationDate}
            />

            <Toggle
                text="Decisões:"
                preview={data.decisions[0]
                    ? (<BulletList
                        items={[data.decisions[0].decisionTypeValue + '..']}
                    />)
                    : undefined
                }
            >
                <BulletList
                    items={data.decisions.map(x => x.decisionTypeValue)}
                />
            </Toggle>

            {onSave && <Button
                text="Salvar"
                onClick={onSave}
                isLoading={isLoading}
            />}
        </Container>
    )
}

export default ScoreCard