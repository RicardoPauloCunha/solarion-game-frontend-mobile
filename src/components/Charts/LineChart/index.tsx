import { Dimensions } from "react-native"
import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from "victory-native"
import { ChartViewModel } from '../../../hooks/api/score'

type LineChartProps = {
    colors: string[]
    chart: ChartViewModel
}

const LineChart = ({
    colors,
    chart
}: LineChartProps) => {
    const width = Dimensions.get('window').width - 24

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={width}
            padding={{
                top: 8,
                bottom: 32,
                right: 44,
                left: 44
            }}
        >
            <VictoryArea
                style={{ data: { fill: colors[0] } }}
                data={chart.values}
                x="column"
                y="value"
                interpolation="natural"
            />

            <VictoryAxis
                dependentAxis={true}
            />

            <VictoryAxis
                fixLabelOverlap={true}
            />
        </VictoryChart>
    )
}

export default LineChart