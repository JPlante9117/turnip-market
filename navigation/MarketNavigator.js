import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MarketScreen, { marketScreenOptions } from '../screens/MarketScreen'
import PostingDetailScreen, { postingDetailsOptions } from '../screens/PostingDetailsScreen'
import { Platform } from 'react-native'
import { MainColors } from '../constants/MainColors'
import NewPostingScreen, { newPostingOptions } from '../screens/NewPostingScreen'
import { Fontisto } from '@expo/vector-icons'
import MyMarketScreen, { myMarketOptions } from '../screens/personalStackScreens/MyMarketScreen'

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

    const personalStack = () => {
        return(
            <Stack.Navigator
                screenOptions={baseHeader}
            >
                <Stack.Screen
                    name="MyMarket"
                    component={MyMarketScreen}
                    options={myMarketOptions}
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
                    name="GlobalMarketStack"
                    component={marketStack}
                    options={{
                        drawerLabel: 'Global Market',
                        drawerIcon: props => <Fontisto name='earth' size={30} color={props.color} />
                    }}
                />
                <Drawer.Screen
                    name="MyMarketStack"
                    component={personalStack}
                    options={{
                        drawerLabel: 'My Island Market',
                        drawerIcon: props => <Fontisto name='island' size={30} color={props.color} />
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default MarketNavigator