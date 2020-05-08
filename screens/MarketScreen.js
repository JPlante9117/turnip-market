import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const MarketScreen = props => {
    return(
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.column}>
                    <Text style={styles.header}>USER</Text>
                    <Text>Jacques</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>PRICE</Text>
                    <Text>126 bells</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>ASK</Text>
                    <Text>10%</Text>
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
        justifyContent: 'space-around'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5
    },
    buttonContainer: {
        justifyContent: 'center'
    },
    header: {
        fontWeight: 'bold',
        color: '#8e7557',
        paddingBottom: 15
    }
})

export default MarketScreen