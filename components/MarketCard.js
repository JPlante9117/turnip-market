import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DefaultText from './DefaultText'

const MarketCard = props => {
    return(
        <TouchableOpacity>
            <View style={styles.card}>
                <View style={styles.circle} />
                <View style={styles.column}>
                    <DefaultText style={styles.header}>USER</DefaultText>
                    <DefaultText>Jacques</DefaultText>
                    <DefaultText></DefaultText>
                </View>
                <View style={styles.column}>
                    <DefaultText style={styles.header}>PRICE</DefaultText>
                    <DefaultText>126 bells</DefaultText>
                    <DefaultText></DefaultText>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="More" color={'#00e6e6'}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff7e6',
        height: 100,
        width: '100%',
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        height: '100%',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        justifyContent: 'center'
    },
    header: {
        fontWeight: 'bold',
        color: '#8e7557',
        fontFamily: 'varela-round',
        fontSize: 15
    },
    circle: {
        height: 50,
        width: 50,
        backgroundColor: '#cfc1b0',
        borderRadius: 100
    }
})

export default MarketCard