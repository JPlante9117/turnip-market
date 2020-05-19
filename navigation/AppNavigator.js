import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import MarketNavigator, { AuthNavigator } from './MarketNavigator'
import StartupScreen from '../screens/StartupScreen'

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.authentication.token)
    const didTryAutoLogin = useSelector(state => state.authentication.didTryAutoLogin)

    return(
        <NavigationContainer>
            {isAuth && <MarketNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator