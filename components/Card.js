import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MainColors } from '../constants/MainColors'

const Card = props => {
    return(
        <View style={{...styles.wrapper, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: MainColors.cardBackground,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    }
})

export default Card