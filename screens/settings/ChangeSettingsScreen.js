import React, { useReducer, useState, useCallback } from 'react'
import { StyleSheet, ImageBackground, Button, KeyboardAvoidingView, View } from 'react-native'
import DefaultText from '../../components/DefaultText'
import Card from '../../components/Card'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../../components/Input'
import { MainColors } from '../../constants/MainColors'
import { setUserData } from '../../store/actions/userActions'

const formReducer = (state, action) => {
    switch(action.type){
        case 'UPDATE':
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            }
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.validity
            }
            let updatedFormIsValid = true
            for (const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            return {
                ...state,
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                formIsValid: updatedFormIsValid
            }
        default:
            return state
    }
}

const ChangeSettingsScreen = props => {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)

    const initialState = {
        inputValues: {
            username: userData.username,
            islandName: userData.islandName,
            avatarURL: userData.avatar
        },
        inputValidities: {
            username: false,
            islandName: false,
            avatarURL: true
        },
        formIsValid: false
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: 'UPDATE',
            value: inputValue,
            validity: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch])

    const submissionHandler = async () => {
        setError(null)
        setIsLoading(true)
        try {
            dispatch(setUserData(formState.inputValues))
        } catch(err){
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <KeyboardAvoidingView style={styles.screen}>
            <ImageBackground style={styles.background} source={require('../../assets/bgtest.png')}>
                <Card>
                    <ScrollView style={{width: '100%'}}>
                        <Input
                            id="username"
                            label="Username"
                            keyboardType="default"
                            required
                            autoCapitalize="none"
                            errorText="Please enter a username"
                            maxLength={15}
                            onInputChange={inputChangeHandler}
                            initialValue={userData.username}
                            returnKeyType="next"
                        />
                        <Input
                            id="islandName"
                            label="Island Name"
                            keyboardType="default"
                            required
                            autoCapitalize="none"
                            maxLength={10}
                            errorText="Please enter your Island Name"
                            onInputChange={inputChangeHandler}
                            initialValue={userData.islandName}
                            returnKeyType="next"
                        />
                        <Input
                            id="avatarURL"
                            label="Avatar"
                            keyboardType="default"
                            onInputChange={inputChangeHandler}
                            initialValue={userData.avatar}
                            isImage
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Save Changes" onPress={submissionHandler} color={MainColors.bellsBlue} disabled={!formState.formIsValid} />
                        </View>
                    </ScrollView>
                </Card>
            </ImageBackground>
        </KeyboardAvoidingView>
    )

}

export const changeSettingsScreenOptions = navData => {
    return {
        title: "Change Settings"
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    background: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'center'
    }
})

export default ChangeSettingsScreen