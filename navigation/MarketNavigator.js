import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import MarketScreen, { marketScreenOptions } from '../screens/globalStack/MarketScreen'
import PostingDetailScreen, { postingDetailsOptions } from '../screens/globalStack/PostingDetailsScreen'
import { Platform, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { MainColors } from '../constants/MainColors'
import NewPostingScreen, { newPostingOptions } from '../screens/globalStack/NewPostingScreen'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import MyMarketScreen, { myMarketOptions } from '../screens/personalStackScreens/MyMarketScreen'
import AuthScreen, { authScreenOptions } from '../screens/startup/AuthScreen'
import DefaultText from '../components/DefaultText'
import { logout } from '../store/actions/authActions'
import { useDispatch } from 'react-redux'
import SettingsScreen, { settingsScreenOptions } from '../screens/settings/SettingsScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

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

export const AuthNavigator = props => {
    return(
        <Stack.Navigator
            screenOptions={baseHeader}
        >
                <Stack.Screen
                    name="Login"
                    component={AuthScreen}
                    options={authScreenOptions}
                />
        </Stack.Navigator>
    )
}

const MarketNavigator = props => {

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

    const settingsStack = () => {
        return(
            <Stack.Navigator
                screenOptions={baseHeader}
            >
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={settingsScreenOptions}
                />
            </Stack.Navigator>
        )
    }

    const dispatch = useDispatch()

    return(
            <Drawer.Navigator
                drawerStyle={{
                    backgroundColor: MainColors.cardBackground,
                }}
                drawerContentOptions={{
                    activeTintColor: MainColors.cardText
                }}
                drawerContent={props => {
                    return(
                        <ScrollView contentContainerStyle={{flex: 1, marginTop: 50, justifyContent: 'space-between'}}>
                            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                            <TouchableOpacity style={{padding: 10, flexDirection: 'row', backgroundColor: MainColors.cardHeaderText, alignItems: 'center'}} onPress={() => dispatch(logout())}>
                                    <Ionicons name={Platform.OS === 'android' ? 'md-exit' : 'ios-exit'} size={23} color='white' />
                                    <DefaultText style={{color: 'white', marginLeft: 30}}>LOGOUT</DefaultText>
                            </TouchableOpacity>
                        </ScrollView>
                    )
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
                <Drawer.Screen
                    name="Settings"
                    component={settingsStack}
                    options={{
                        drawerLabel: "Settings",
                        drawerIcon: props => <Fontisto name='player-settings' size={30} color={props.color} />
                    }}
                />
            </Drawer.Navigator>
    )
}

export default MarketNavigator