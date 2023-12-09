import { Dimensions } from 'react-native'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup } from 'victory-native'
import { ChartViewModel } from '../../../hooks/api/score'

type BarChartProps = {
    colors: string[]
    charts: ChartViewModel[]
}

const BarChart = ({
    colors,
    charts
}: BarChartProps) => {
    const width = Dimensions.get('window').width - 24

    return (
        <VictoryChart
            width={width}
            padding={{
                top: 8,
                bottom: 32,
                right: 44,
                left: 44
            }}
        >
            <VictoryGroup
                colorScale={colors}
                offset={12}
            >
                {charts.map((x, index) => (
                    <VictoryBar
                        key={index}
                        data={x.values}
                        x="column"
                        y="value"
                    />
                ))}
            </VictoryGroup>

            <VictoryAxis
                dependentAxis={true}
            />

            <VictoryAxis
                fixLabelOverlap={true}
            />
        </VictoryChart>
    )
}

export default BarChart