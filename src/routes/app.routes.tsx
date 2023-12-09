import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Sidebar from '../components/Menu/Sidebar'
import Theme from '../styles/theme'
import AuthStack from './stacks/authStack'
import GameStack from './stacks/gameStack'

const { Navigator, Screen } = createDrawerNavigator()

const AppRoutes = () => {
    return (
        <Navigator
            initialRouteName='GameStack'
            screenOptions={{
                headerShown: false,
                drawerInactiveTintColor: Theme.color.darkGray,
                drawerActiveTintColor: Theme.color.white,
                drawerActiveBackgroundColor: Theme.color.wine,
                drawerLabelStyle: {
                    paddingLeft: 8,
                    fontFamily: Theme.font.interRegular,
                    fontSize: Theme.size.text
                }
            }}
            drawerContent={props => <Sidebar {...props} />}
        >
            <Screen
                name='GameStack'
                component={GameStack}
                options={{
                    drawerLabel: 'Jogar'
                }}
            />

            <Screen
                name='AuthStack'
                component={AuthStack}
                options={{
                    drawerLabel: 'Entrar'
                }}
            />
        </Navigator>
    )
}

export default AppRoutes