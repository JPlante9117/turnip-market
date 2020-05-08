import React from 'react'
import { View, StyleSheet } from 'react-native'
import MarketCard from '../components/MarketCard'
import { MainColors } from '../constants/MainColors'

const MarketScreen = props => {
    return(
        <View style={styles.screen}>
            <MarketCard user={'Jacques'} price={123} handlePress={() => props.navigation.navigate('PostingDetails')} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: MainColors.background,
        padding: '5%'
    }
})

export default MarketScreen