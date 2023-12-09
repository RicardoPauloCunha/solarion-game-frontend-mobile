import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import DecisionsRating from '../../screens/DecisionsRating'
import Home from '../../screens/Home'
import Scenario from '../../screens/Scenario'

const { Navigator, Screen } = createStackNavigator()

const GameStack = () => {
    return (
        <Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name='Home' component={Home} />
            <Screen name='Scenario' component={Scenario} />
            <Screen name='DecisionsRating' component={DecisionsRating} />
        </Navigator>
    )
}

export default GameStack