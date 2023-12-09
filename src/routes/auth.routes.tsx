import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Sidebar from '../components/Menu/Sidebar'
import { useAuthContext } from '../hooks/contexts/auth'
import Dashboard from '../screens/Dashboard'
import MyScores from '../screens/MyScores'
import Profile from '../screens/Profile'
import Scores from '../screens/Scores'
import Theme from '../styles/theme'
import { UserTypeEnum } from '../types/enums/userType'
import GameStack from './stacks/gameStack'

const { Navigator, Screen } = createDrawerNavigator()

const AuthRoutes = () => {
    const {
        loggedUser
    } = useAuthContext()

    return (
        <Navigator
            initialRouteName={loggedUser?.userType === UserTypeEnum.Admin
                ? 'Scores'
                : 'MyScores'
            }
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
                name='Profile'
                component={Profile}
                options={{
                    drawerLabel: 'Perfil'
                }}
            />

            {loggedUser?.userType === UserTypeEnum.Admin
                ? <>
                    <Screen
                        name='Scores'
                        component={Scores}
                        options={{
                            drawerLabel: 'Pontuações'
                        }}
                    />

                    <Screen
                        name='Dashboard'
                        component={Dashboard}
                        options={{
                            drawerLabel: 'Dashboard'
                        }}
                    />
                </>
                : <>
                    <Screen
                        name='MyScores'
                        component={MyScores}
                        options={{
                            drawerLabel: 'Minhas pontuações'
                        }}
                    />
                </>
            }
        </Navigator>
    )
}

export default AuthRoutes