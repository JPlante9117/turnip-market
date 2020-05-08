import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const MarketScreen = props => {
    return(
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.circle} />
                <View style={styles.column}>
                    <Text style={styles.header}>USER</Text>
                    <Text style={styles.text}>Jacques</Text>
                    <Text></Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>PRICE</Text>
                    <Text style={styles.text}>126 bells</Text>
                    <Text></Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>ASK</Text>
                    <Text style={styles.text}>10%</Text>
                    <Text></Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="More" color={'#00e6e6'}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#23ab6a'
    },
    card: {
        backgroundColor: '#fff7e6',
        height: 100,
        width: '90%',
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
        fontFamily: 'varela-round'
    },
    text: {
        fontFamily: 'varela-round'
    },
    circle: {
        height: 50,
        width: 50,
        backgroundColor: '#cfc1b0',
        borderRadius: 100
    }
})

export default MarketScreen