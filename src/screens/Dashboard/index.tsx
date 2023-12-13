import { FormHandles, SubmitHandler } from "@unform/core"
import { useEffect, useRef, useState } from "react"
import * as Yup from 'yup'
import Button from "../../components/Buttons/Button"
import WarningCard, { WarningData } from "../../components/Cards/WarningCard"
import BarChart from "../../components/Charts/BarChart"
import LineChart from "../../components/Charts/LineChart"
import PieChart from "../../components/Charts/PieChart"
import { Form } from "../../components/Form/styles"
import VerticalGroup from "../../components/Groups/VerticalGroup"
import Input from "../../components/Inputs/Input"
import Select from "../../components/Inputs/Select"
import LoadingText from "../../components/Loadings/LoadingText"
import ScreenContainer from "../../components/ScreenContainer"
import Section from "../../components/Sections/Section"
import Toggle from "../../components/Toggle"
import Subtitle from "../../components/Typographies/Subtitle"
import Title from "../../components/Typographies/Title"
import { getSchemaError } from "../../config/validator/methods"
import { endDateSchema, startDateSchema } from "../../config/validator/schemas"
import { GetScoreIndicatorsApi, GetScoreIndicatorsParams, ScoreIndicatorsViewModel } from "../../hooks/api/score"
import Theme from "../../styles/theme"
import { LastMonthsTypeEnum, listLastMonthsTypeOptions } from "../../types/enums/lastMonthsType"

interface DashboardFilterFormData {
    lastMonths: number
    startDate: Date | null
    endDate: Date | null
}

const ADVENTURE_COLORS = [
    Theme.color.wine
]
const HERO_COLORS = [
    Theme.color.gray,
    Theme.color.lightWine,
    Theme.color.green,
]
const RATING_COLORS = [
    Theme.color.yellow,
    Theme.color.pink,
    Theme.color.blue,
    Theme.color.cyan,
]

const Dashboard = () => {
    const formRef = useRef<FormHandles>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [warning, setWarning] = useState<WarningData | undefined>(undefined)
    const [hasDateInput, setHasDateInput] = useState(false)
    const [hasData, setHasData] = useState(true)
    const [indicatorsFilter, setIndicatorsFilter] = useState<GetScoreIndicatorsParams>({})
    const [scoreIndicators, setScoreIndicators] = useState<ScoreIndicatorsViewModel | undefined>(undefined)

    const lastMonthsOptions = listLastMonthsTypeOptions()

    useEffect(() => {
        getIndicatorsData()
    }, [])

    const getIndicatorsData = async (filter?: GetScoreIndicatorsParams) => {
        setIsLoading(true)

        if (!filter)
            filter = indicatorsFilter

        if (filter.lastMonths === LastMonthsTypeEnum.Custom && !hasDateInput)
            filter.lastMonths = undefined

        await GetScoreIndicatorsApi(filter).then(response => {
            let hasValue = response.adventuresChart?.totalValue !== 0

            setScoreIndicators(response)

            setHasData(hasValue)
            setIndicatorsFilter(filter as GetScoreIndicatorsParams)
            setIsLoading(false)
        }).catch(() => { })
    }

    const submitFilterForm: SubmitHandler<DashboardFilterFormData> = async (data) => {
        try {
            setWarning(undefined)
            formRef.current?.setErrors({})

            const shema = Yup.object().shape({
                lastMonths: Yup.string()
            })

            await shema.validate(data, { abortEarly: false })

            if (hasDateInput) {
                const subShema = Yup.object().shape({
                    startDate: Yup.date()
                        .default(null)
                        .nullable()
                        .concat(startDateSchema())
                        .required(),
                    endDate: Yup.date()
                        .default(null)
                        .nullable()
                        .concat(endDateSchema(data.startDate))
                        .required(),
                })

                await subShema.validate(data, { abortEarly: false })
            }

            data.lastMonths = data.lastMonths ? Number(data.lastMonths) : 0

            await getIndicatorsData({
                lastMonths: data.lastMonths,
                startDate: data.startDate,
                endDate: data.endDate
            })
        } catch (error) {
            let schemaError = getSchemaError(error)

            formRef.current?.setErrors(schemaError.errors)
            setWarning(schemaError.warning)
            setIsLoading(false)
        }
    }

    const handleCleanFilter = () => {
        setHasDateInput(false)
        formRef.current?.reset()

        getIndicatorsData({})
    }

    const handleSelectLastMonths = (value: string) => {
        let hasDate = value === `${LastMonthsTypeEnum.Custom}`

        setHasDateInput(hasDate)
    }

    const handleOpenFilter = () => {
        setTimeout(() => {
            formRef.current?.setData({
                lastMonths: `${indicatorsFilter.lastMonths}`,
                startDate: indicatorsFilter.startDate,
                endDate: indicatorsFilter.endDate
            })
        }, 300)
    }

    return (
        <ScreenContainer>
            <Section>
                <Title
                    text="Dashboard"
                />

                <Toggle
                    text="Filtros"
                    onOpen={handleOpenFilter}
                >
                    <Form
                        ref={formRef}
                        onSubmit={submitFilterForm}
                    >
                        <Select
                            name="lastMonths"
                            label="Período"
                            placeholder="Escolha um período"
                            options={lastMonthsOptions}
                            onChangeValue={handleSelectLastMonths}
                        />

                        {hasDateInput && <>
                            <Input
                                name="startDate"
                                label="Data inicial"
                                placeholder="Coloque a data inicial"
                                mask="date"
                            />

                            <Input
                                name="endDate"
                                label="Data final"
                                placeholder="Coloque a data final"
                                mask="date"
                            />
                        </>}

                        {warning && <WarningCard {...warning} />}

                        {!isLoading && <VerticalGroup>
                            <Button
                                text="Filtrar"
                                isLoading={isLoading}
                                onClick={() => formRef.current?.submitForm()}
                            />

                            <Button
                                text="Limpar filtro"
                                variant="outline"
                                marginTop={0}
                                onClick={handleCleanFilter}
                            />
                        </VerticalGroup>}
                    </Form>
                </Toggle>

                <LoadingText
                    isLoading={isLoading}
                    loadingText="Carregando indicadores..."
                />
            </Section>

            {scoreIndicators && hasData
                ? <>
                    {scoreIndicators.adventuresChart && <Section>
                        <Subtitle
                            text="Quantidade de aventuras"
                        />

                        <LineChart
                            colors={ADVENTURE_COLORS}
                            chart={scoreIndicators.adventuresChart}
                        />
                    </Section>}

                    {scoreIndicators.heroCharts.length !== 0 && <Section>
                        <Subtitle
                            text="Seleção de classes"
                        />

                        <PieChart
                            colors={HERO_COLORS}
                            charts={scoreIndicators.heroCharts}
                        />
                    </Section>}

                    {scoreIndicators.ratingCharts.length !== 0 && <Section>
                        <Subtitle
                            text="Pontuações obtidas (%)"
                        />

                        <BarChart
                            colors={RATING_COLORS}
                            charts={scoreIndicators.ratingCharts}
                        />
                    </Section>}
                </>
                : <>
                    {!isLoading && <WarningCard
                        title="Nenhum dado encontrado"
                        message="Nenhum dado sobre as pontuações dos usuários foi encontrado."
                        variant="info"
                    />}
                </>
            }
        </ScreenContainer>
    )
}

export default Dashboard