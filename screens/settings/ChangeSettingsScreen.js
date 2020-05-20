import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import Card from '../../components/Card'

const ChangeSettingsScreen = props => {

    return(
        <ImageBackground style={{flex: 1}} source={require('../../assets/bgtest.png')}>
            <Card>
                <DefaultText>CHANGE SETTINGS</DefaultText>
            </Card>
        </ImageBackground>
    )

}

export const changeSettingsScreenOptions = navData => {
    return {
        title: "Change Settings"
    }
}

const styles = StyleSheet.create({

})

export default ChangeSettingsScreen