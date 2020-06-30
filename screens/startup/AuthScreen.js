import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { MainColors } from '../../constants/MainColors'
import Input from '../../components/Input'
import Card from '../../components/Card'
import { login, signup } from '../../store/actions/authActions'
import DefaultText from '../../components/DefaultText'

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

const AuthScreen = props => {

    const dispatch = useDispatch()

    const initialState = {
        inputValues: {
            email: '',
            password: '',
            confirmation: '',
            username: '',
            islandName: ''
        },
        inputValidities: {
            email: false,
            password: false,
            confirmation: false,
            username: false,
            islandName: false
        },
        formIsValid: false
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)
    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        formDispatch({
            type: 'UPDATE',
            value: inputValue,
            validity: inputValidity,
            input: inputIdentifier
        })
    }, [formDispatch, formState])

    const authHandler = async () => {
        setError(null)
        setIsLoading(true)
        try {
            if(isSignup){
                await dispatch(signup(formState.inputValues))
            } else {
                await dispatch(login(formState.inputValues.email, formState.inputValues.password))
            }
        } catch(err) {
            setError(err.message)
            setIsLoading(false)
        }
        
    }

    const submitHandler= useCallback(async () => {
        if(!formState.formIsValid){
            Alert.alert(
                'Oops!',
                'Make sure the form is completely filled out.',
                [{text: 'Okay'}]
            )
            return
        }
        authHandler()
    }, [formState, authHandler])

    useEffect(() => {
        if(error){
            Alert.alert('An Error Occurred', error, [{text: 'Okay'}])
        }
    }, [error])

    return(
        <KeyboardAvoidingView style={styles.screen}>
            <ImageBackground style={{flex: 1, padding: 10, justifyContent: 'center'}} source={require('../../assets/bgtest.png')}>
                <Card>
                    <ScrollView style={{width: '100%'}}>
                        <DefaultText style={styles.header}>{isSignup ? "Sign Up" : "Login" }</DefaultText>
                        {isSignup ? 
                        <Input 
                            id="username"
                            label="Username"
                            keyboardType="default"
                            required
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            returnKeyType="next"
                            min={2}
                            max={15}
                            errorText="Please supply your username"
                        />
                        : null}
                        {isSignup ?
                        <Input
                            id="islandName"
                            label="Island Name"
                            keyboardType="default"
                            required
                            min={1}
                            max={10}
                            maxLength={10}
                            autoCapitalize="none"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            errorText="Please supply your island name"
                        />
                        :
                        null}
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            returnKeyType="next"
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            min={6}
                            autoCapitalize="none"
                            errorText="Please enter a valid password (min 6 characters)"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        {isSignup ?
                        <Input
                            id="confirmation"
                            label="Confirm Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            min={6}
                            autoCapitalize="none"
                            errorText="Passwords do not match"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            confirmPass={formState.inputValues.password}
                        />
                        :
                        null}
                        {isLoading ? (
                            <ActivityIndicator size='small' color={MainColors.cardText} />
                        ) : (
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title={isSignup ? 'Sign Up' : 'Login'} color={MainColors.bellsBlue} onPress={isSignup ? submitHandler : authHandler}/>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={MainColors.bellsBlue} onPress={() => setIsSignup(!isSignup)}/>
                            </View>
                        </View>
                        )}
                    </ScrollView>
                </Card>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export const authScreenOptions = navData => {
    return {
        title: 'Sign In'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    buttonWrapper: {
        marginVertical: 5,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 30,
        color: MainColors.cardHeaderText
    }
})

export default AuthScreen