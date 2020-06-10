import React from 'react'
import { StyleSheet, View, ImageBackground, Button, Image } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import Card from '../../components/Card'
import { useSelector } from 'react-redux'

const SettingsScreen = props => {

    const userData = useSelector(state => state.userData)

    return(
        <ImageBackground style={styles.container} source={require('../../assets/bgtest.png')}>
            <Card>
                <View>
                    <DefaultText>Username: {userData.username === '' ? "NO NAME SET" : userData.username}</DefaultText>
                    <DefaultText>Island Name: {userData.islandName === '' ? "NO ISLAND SET" : userData.islandName}</DefaultText>
                    <DefaultText>Avatar</DefaultText>
                    <Image style={{width: 50, height: 50, borderRadius: 100}} source={{uri: userData.avatar}}/>
                    <Button title="Change Settings" onPress={() => props.navigation.navigate('ChangeSettings')} />
                </View>
            </Card>
        </ImageBackground>
    )

}

export const settingsScreenOptions = navData => {
    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName="navicon" iconSize={30} onPress={() => navData.navigation.openDrawer()} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    }
})

export default SettingsScreen