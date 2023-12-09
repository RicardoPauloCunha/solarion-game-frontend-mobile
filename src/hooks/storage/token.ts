import AsyncStorage from '@react-native-async-storage/async-storage'

export const TOKEN_DATA_KEY = "@SolarionGame:token-data"

export const setTokenStorage = async (data: string) => {
    await AsyncStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(data))
}

export const getTokenStorage = async () => {
    let data = await AsyncStorage.getItem(TOKEN_DATA_KEY)

    if (data === null)
        return undefined

    try {
        return JSON.parse(data) as string
    } catch (error) {
        return undefined
    }
}

export const removeTokenStorage = async () => {
    await AsyncStorage.removeItem(TOKEN_DATA_KEY)
}