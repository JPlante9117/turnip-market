import React from 'react'
import { View, Button, StyleSheet, Platform, Image } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import DefaultText from './DefaultText'
import { MainColors } from '../constants/MainColors'

const MarketCard = props => {

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity


    // IMAGE URI HARD CODED
    return(
        <View style={{...styles.card, overflow: 'hidden'}}>
        <Touchable onPress={props.handlePress}>
            <View style={styles.card}>
                <Image style={styles.circle} source={{uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}} />
                <View style={styles.column}>
                    <DefaultText style={styles.header}>USER</DefaultText>
                    <DefaultText>{props.username}</DefaultText>
                    <DefaultText></DefaultText>
                </View>
                <View style={styles.column}>
                    <DefaultText style={styles.header}>PRICE</DefaultText>
                    <DefaultText>{props.price} bells</DefaultText>
                    <DefaultText></DefaultText>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="More" color={'#ff9933'} onPress={props.handlePress}/>
                </View>
            </View>
        </Touchable>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: MainColors.cardBackground,
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
        color: MainColors.cardHeaderText,
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