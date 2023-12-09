export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            GameStack: {
                screen: 'Home'
            }
            Home: undefined
            Scenario: undefined
            DecisionsRating: undefined

            AuthStack: {
                screen: 'Login'
            }
            Login: undefined
            RecoverPassword: undefined
            RegisterAccount: undefined

            Profile: undefined
            MyScores: undefined
            Scores: undefined
            Dashboard: undefined
        }
    }
}