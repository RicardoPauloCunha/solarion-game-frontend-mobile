import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from '../../screens/Login'
import RecoverPassword from '../../screens/RecoverPassword'
import RegisterAccount from '../../screens/RegisterAccount'

const { Navigator, Screen } = createStackNavigator()

const AuthStack = () => {
    return (
        <Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name='Login' component={Login} />
            <Screen name='RecoverPassword' component={RecoverPassword} />
            <Screen name='RegisterAccount' component={RegisterAccount} />
        </Navigator>
    )
}

export default AuthStack