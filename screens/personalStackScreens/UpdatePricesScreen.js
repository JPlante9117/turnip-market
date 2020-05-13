import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import DefaultText from '../../components/DefaultText'

const UpdatePricesScreen = props => {
    return(
        <ImageBackground style={styles.container} source={require('../../assets/bgtest.png')}>
            <View>
                
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default UpdatePricesScreen