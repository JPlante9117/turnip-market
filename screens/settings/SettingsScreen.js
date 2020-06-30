import React from 'react'
import { StyleSheet, View, ImageBackground, Button, Image } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import Card from '../../components/Card'
import { useSelector } from 'react-redux'
import { MainColors } from '../../constants/MainColors'

const SettingsScreen = props => {

    const userData = useSelector(state => state.userData)

    return(
        <ImageBackground style={styles.container} source={require('../../assets/bgtest.png')}>
            <Card style={styles.textWrapper}>
                <View style={styles.textWrapper}>
                    <DefaultText style={styles.label}>Username:</DefaultText>
                    <DefaultText style={styles.text}>{userData.username === '' ? "NO NAME SET" : userData.username}</DefaultText>
                    <DefaultText style={styles.label}>Island Name:</DefaultText>
                    <DefaultText style={styles.text}>{userData.islandName === '' ? "NO ISLAND SET" : userData.islandName}</DefaultText>
                    <DefaultText style={styles.label}>Avatar</DefaultText>
                    <Image style={styles.avatar} source={{uri: userData.avatar}}/>
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
    },
    label: {
        color: MainColors.cardHeaderText,
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10
    },
    textWrapper: {
        justifyContent: 'center',
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 10
    },
    text: {
        color: MainColors.cardText,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    }
})

export default SettingsScreen