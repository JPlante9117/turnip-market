import React from 'react'
import { StyleSheet, View, ImageBackground, Button } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import Card from '../../components/Card'

const SettingsScreen = props => {

    return(
        <ImageBackground style={{flex: 1}} source={require('../../assets/bgtest.png')}>
            <Card>
                <DefaultText>SETTINGS!!</DefaultText>
                <Button title="Change" onPress={() => props.navigation.navigate("ChangeSettings")}/>
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

})

export default SettingsScreen