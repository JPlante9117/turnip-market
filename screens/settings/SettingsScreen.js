import React from 'react'
import { StyleSheet, View } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'

const SettingsScreen = props => {

    return(
        <View>
            <DefaultText>SETTINGS!</DefaultText>
        </View>
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