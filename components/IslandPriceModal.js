import React, { useState } from 'react'
import { View, StyleSheet, Picker, Button, Modal } from 'react-native'
import DefaultText from './DefaultText'
import { MainColors } from '../constants/MainColors'
import Input from './Input'
import { TextInput } from 'react-native-gesture-handler'

const IslandPriceModal = props => {

    const [selectedValue, setSelectedValue] = useState(0)
    const [price, setPrice] = useState('')
    return (
        <View style={styles.wrapper}>
        <DefaultText style={styles.header}>Time of Price</DefaultText>
        <View style={styles.pickerWrapper}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(val) => setSelectedValue(val)}
                mode="dropdown"
            >
                <Picker.Item label='Sunday' value={0} />
                <Picker.Item label='Monday Morning' value={1} />
                <Picker.Item label='Monday Afternoon' value={2} />
                <Picker.Item label='Tuesday Morning' value={3} />
                <Picker.Item label='Tuesday Afternoon' value={4} />
                <Picker.Item label='Wednesday Morning' value={5} />
                <Picker.Item label='Wednesday Afternoon' value={6} />
                <Picker.Item label='Thursday Morning' value={7} />
                <Picker.Item label='Thursday Afternoon' value={8} />
                <Picker.Item label='Friday Morning' value={9} />
                <Picker.Item label='Friday Afternoon' value={10} />
                <Picker.Item label='Saturday Morning' value={11} />
                <Picker.Item label='Saturday Afternoon' value={12} />
            </Picker>
        </View>
        <TextInput value={price} onChange={(val) => setPrice(val)} keyboardType='numeric' />
        <Button title="Submit" color={MainColors.bellsBlue} onPress={props.submitModal(selectedValue, price)}/>
    </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: MainColors.cardBackground,
        padding: 10,
        borderRadius: 10,
        width: '90%'
    },
    picker: {
        width: '100%',
        color: 'black',
        height: 40
    },
    pickerWrapper: {
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: MainColors.paleBackground,
        width: '100%',
        marginVertical: 5
    },
    header: {
        color: MainColors.cardHeaderText,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    }
})

export default IslandPriceModal