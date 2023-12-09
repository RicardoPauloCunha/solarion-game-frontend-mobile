import AsyncStorage from '@react-native-async-storage/async-storage'
import { DecisionTypeEnum } from "../../types/enums/decisionType"
import { ScenarioTypeEnum } from "../../types/enums/scenarioType"

export const SCENARIO_DATA_KEY = "@SolarionGame:scenario-data"

export interface ScenarioData {
    scenarioType: ScenarioTypeEnum
    decisions: DecisionTypeEnum[]
    creationDate: Date
}

export const setScenarioStorage = async (data: ScenarioData) => {
    await AsyncStorage.setItem(SCENARIO_DATA_KEY, JSON.stringify(data))
}

export const getScenarioStorage = async () => {
    let data = await AsyncStorage.getItem(SCENARIO_DATA_KEY)

    if (data === null)
        return undefined

    try {
        return JSON.parse(data) as ScenarioData
    } catch (error) {
        return undefined
    }
}

export const removeScenarioStorage = async () => {
    await AsyncStorage.removeItem(SCENARIO_DATA_KEY)
}