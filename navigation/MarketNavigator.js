import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MarketScreen from '../screens/MarketScreen'

const Stack = createStackNavigator()

const MarketNavigator = props => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Market"
                    component={MarketScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MarketNavigator