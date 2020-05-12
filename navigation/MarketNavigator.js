import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MarketScreen, { marketScreenOptions } from '../screens/MarketScreen'
import PostingDetailScreen, { postingDetailsOptions } from '../screens/PostingDetailsScreen'
import { Platform } from 'react-native'
import { MainColors } from '../constants/MainColors'
import NewPostingScreen, { newPostingOptions } from '../screens/NewPostingScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

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

    const marketStack = () => {
        return(
            <Stack.Navigator
                screenOptions={baseHeader}
            >
                <Stack.Screen 
                    name="Market"
                    component={MarketScreen}
                    options={marketScreenOptions}
                />
                <Stack.Screen
                    name="PostingDetails"
                    component={PostingDetailScreen}
                    options={postingDetailsOptions}
                />
                <Stack.Screen
                    name="NewPosting"
                    component={NewPostingScreen}
                    options={newPostingOptions}
                />
            </Stack.Navigator>
        )
    }

    return(
        <NavigationContainer>
            <Drawer.Navigator
                drawerStyle={{
                    backgroundColor: MainColors.cardBackground,
                }}
                drawerContentOptions={{
                    activeTintColor: MainColors.cardText
                }}
            >
                <Drawer.Screen
                    name="MarketStack"
                    component={marketStack}
                    options={{
                        drawerLabel: 'Turnip Market',
                        drawerIcon: props => <MaterialCommunityIcons name='pig' size={35} color={props.color} />
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default MarketNavigator