import React from 'react'
import { View, StyleSheet } from 'react-native'
import MarketCard from '../components/MarketCard'

const MarketScreen = props => {
    return(
        <View style={styles.screen}>
            <MarketCard />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#23ab6a',
        padding: '5%'
    }
})

export default MarketScreen