import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MarketScreen from '../screens/MarketScreen'
import PostingDetailScreen from '../screens/PostingDetailsScreen'

const Stack = createStackNavigator()

const MarketNavigator = props => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Market"
                    component={MarketScreen}
                />
                <Stack.Screen
                    name="PostingDetails"
                    component={PostingDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MarketNavigator