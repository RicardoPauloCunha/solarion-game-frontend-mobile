import { Dimensions } from 'react-native'
import { VictoryPie } from 'victory-native'
import { ChartViewModel } from '../../../hooks/api/score'
import Theme from '../../../styles/theme'
import { formatNumberToPercentage } from "../../../utils/number"
import Bold from '../../Typographies/Bold'
import { Aside, Container, Icon, Item, Text } from "./styles"

interface PieChartProps {
    colors: string[]
    charts: ChartViewModel[]
}

const PieChart = ({
    colors,
    charts
}: PieChartProps) => {
    const width = Dimensions.get('window').width - 24
    const total = charts.reduce((a, b) => a + b.totalValue, 0)

    const legends = charts.map(x => ({
        description: x.description,
        value: formatNumberToPercentage((x.totalValue / total) * 100)
    }))

    return (
        <Container>
            <VictoryPie
                width={width}
                colorScale={colors}
                data={charts}
                x="description"
                y="totalValue"
                padding={{
                    top: 0,
                    bottom: 32,
                    right: 44,
                    left: 44
                }}
                style={{
                    data: {
                        stroke: Theme.color.white,
                        strokeWidth: 1
                    }
                }}
                // labelPosition="centroid"
                labelPlacement="perpendicular"
            />

            <Aside>
                {legends.map((x, index) => (
                    <Item key={index}>
                        <Icon
                            style={{ backgroundColor: colors[index] }}
                        />

                        <Text>{x.description}:</Text>

                        <Bold
                            text={`(${charts[index].totalValue}) - ${x.value}`}
                        />
                    </Item>
                ))}
            </Aside>
        </Container>
    )
}

export default PieChart