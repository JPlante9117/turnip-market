import React, { useReducer, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { View, Button, Alert, Picker, StyleSheet, ImageBackground } from 'react-native'
import DefaultText from '../../components/DefaultText'
import Input from '../../components/Input'
import { MainColors } from '../../constants/MainColors'
import { updatePrices } from '../../store/actions/islandPricesActions'

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

const UpdateMarketScreen = props => {

    const initialState = {
        inputVals: {
            price: 0,
            day: 0
        },
        inputValidities: {
            price: false,
            day: true
        },
        formValid: true
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)
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
        }
        try {
            await dispatch(updatePrices(formState.inputVals))
            props.navigation.goBack()
        } catch(err) {
            throw err
        }
    }, [dispatch, formState])
    return (
        <ImageBackground style={styles.container} source={require('../../assets/bgtest.png')}>
        <View style={styles.wrapper}>
        <DefaultText style={styles.header}>Time of Price</DefaultText>
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
        />
        <Button title="Submit" color={MainColors.bellsBlue} onPress={() => submitHandler(formState.inputVals.day, formState.inputVals.price)}/>
    </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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

export default UpdateMarketScreen