import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'
import { defineValidatorErrorDictionary } from './src/config/validator/dictionary'
import { AuthContextProvider } from './src/hooks/contexts/auth'
import Routes from './src/routes'
import Theme from './src/styles/theme'

const App = () => {
    const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

    useEffect(() => {
        defineValidatorErrorDictionary()
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded)
            await SplashScreen.hideAsync()
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <AuthContextProvider>
            <ThemeProvider theme={Theme}>
                <NavigationContainer>
                    <StatusBar
                        style="light"
                        backgroundColor={Theme.color.darkGray}
                    />

                    <SafeAreaView onLayout={onLayoutRootView} />

                    <Routes />
                </NavigationContainer>
            </ThemeProvider>
        </AuthContextProvider>
    )
}

export default App