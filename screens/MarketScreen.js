import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import MarketCard from '../components/MarketCard'
import { MainColors } from '../constants/MainColors'

const MarketScreen = props => {
    return(
            <ImageBackground style={styles.screen} source={require('../assets/bgtest.png')}>
                <MarketCard user={'Jacques'} price={123} handlePress={() => props.navigation.navigate('PostingDetails', {user: 'Jacques'})} />
            </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: '5%'
    }
})

export default MarketScreen