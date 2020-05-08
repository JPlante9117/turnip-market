import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MarketScreen from '../screens/MarketScreen'
import PostingDetailScreen, { postingDetailsOptions } from '../screens/PostingDetailsScreen'
import { Platform } from 'react-native'
import { MainColors } from '../constants/MainColors'

const Stack = createStackNavigator()

const MarketNavigator = props => {

    const baseHeader = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? MainColors.cardBackground : ''
        },
        headerTitleStyle: {
            width: '100%',
            fontFamily: 'varela-round'
        },
        headerBackTitleStyle: {
            fontFamily: 'varela-round'
        },
        headerTintColor: MainColors.cardText,
        headerTitleAlign: 'center'
    }

    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={baseHeader}
            >
                <Stack.Screen 
                    name="Market"
                    component={MarketScreen}
                />
                <Stack.Screen
                    name="PostingDetails"
                    component={PostingDetailScreen}
                    options={postingDetailsOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MarketNavigator