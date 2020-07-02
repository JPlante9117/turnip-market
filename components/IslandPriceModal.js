import React, { useReducer, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button, Alert, Picker, StyleSheet, ImageBackground, ActivityIndicator, CheckBox } from 'react-native'
import DefaultText from './DefaultText'
import Input from './Input'
import { MainColors } from '../constants/MainColors'
import { updatePrices } from '../store/actions/islandPricesActions'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

const formReducer = (state, action) => {
    switch(action.type){
        case 'UPDATE':
            const updatedValues = {
                ...state.inputVals,
                [action.input]: action.value
            }
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.validity
            }
            let updatedFormValid = true
            for (const key in updatedValidities) {
                updatedFormValid = updatedFormValid && updatedValidities[key]
              }
            return {
                inputVals: updatedValues,
                inputValidities: updatedValidities,
                formValid: updatedFormValid
            }
        default:
            return state
    }
}

const IslandPriceModal = props => {

    const initialState = {
        inputVals: {
            price: 0,
            day: 0,
            checkbox: false
        },
        inputValidities: {
            price: false,
            day: true,
            checkbox: true
        },
        formValid: true
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: 'UPDATE',
            value: inputValue,
            validity: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    const submitHandler = useCallback(async () => {
        if(!formState.formValid){
            Alert.alert(
                'Incomplete Form',
                'Please make sure all parts of the form have been filled out.',
                [{text: 'Okay'}]
            )
            return
        }
        try {
            setIsLoading(true)
            await dispatch(updatePrices(formState.inputVals))
            if(formState.inputVals.checkbox){
                props.checkboxChecked(formState.inputVals.price)
            }
            setIsLoading(false)
            props.closeModal()
        } catch(err) {
            throw err
        }
    }, [dispatch, formState])

    return (
        <View style={styles.wrapper}>
            <DefaultText style={styles.header}>Time of Price:</DefaultText>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={formState.inputVals.day}
                    style={styles.picker}
                    onValueChange={(val) => formDispatch({
                        type: 'UPDATE',
                        value: val,
                        validity: true,
                        input: 'day'
                    })}
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
            <Input
                id='price'
                label='Turnip Price'
                errorText='Please Enter a Price'
                returnKeyType='next'
                keyboardType='numeric'
                placeholder='Enter a Price'
                onInputChange={inputChangeHandler}
                initialValue={0}
                initialValid={false}
                required
                numbersOnly
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <DefaultText style={styles.checkboxText}>Also Create Posting?</DefaultText>
                <CheckBox 
                    value={formState.inputVals.checkbox}
                    onValueChange={(val) => formDispatch({
                        type: 'UPDATE',
                        value: val,
                        validity: true,
                        input: 'checkbox'
                    })}
                />
            </View>

            {isLoading ? <ActivityIndicator size="small" color={MainColors.cardText} /> :
            <View style={styles.buttonContainer}>
                <Button title="Submit" color={MainColors.bellsBlue} onPress={() => submitHandler(formState.inputVals.day, formState.inputVals.price)}/>
                <Button title="Cancel" onPress={props.closeModal} color={MainColors.cardHeaderText} />
            </View>}
            </ScrollView>
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
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    checkboxText: {
        color: MainColors.cardText
    }
})

export default IslandPriceModal