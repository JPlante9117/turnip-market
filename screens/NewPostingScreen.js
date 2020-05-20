import React, { useReducer, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, Button, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import DefaultText from '../components/DefaultText'
import { MainColors } from '../constants/MainColors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import ImagePicker from '../components/ImagePicker'
import Input from '../components/Input'
import { useDispatch } from 'react-redux'
import { createPosting } from '../store/actions/postingActions'

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

const NewPostingScreen = props => {
    
    const initialState = {
        inputVals: {
            price: props.route.params.price,
            ask: '',
            link: '',
            image: ''
        },
        inputValidities: {
            price: props.route.params.price !== '' ? true : false,
            ask: false,
            link: true,
            image: true
        },
        formValid: false
    }

    const [formState, formDispatch] = useReducer(formReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
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
                'Incomplete Posting',
                'Please check to make sure you have filled in the required fields.',
                [{text: 'Okay'}]
            )
            return
        }
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(createPosting(formState.inputVals))
            console.log("Should Go Back Now...")
            setIsLoading(false)
            props.navigation.goBack()
        } catch(err) {
            setError(err)
        }
    }, [dispatch, formState])

    const imageTakenHandler = imgPath => {
        formDispatch({
            type: 'UPDATE',
            value: imgPath,
            validity: true,
            input: 'image'
        })
    }

    useEffect(() => {
        props.navigation.setParams({submitForm: submitHandler})
    }, [submitHandler])

    return(
<ImageBackground style={{flex: 1}}source={require('../assets/bgtest.png')}>
    <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
        <ScrollView style={{width: '100%', height: '100%'}}>
            <View style={styles.postingWrapper}>
                <View style={styles.posting}>
                    <Input
                        id='price'
                        label='Turnip Price'
                        errorText='Please enter a Price'
                        returnKeyType='next'
                        keyboardType='numeric'
                        placeHolder='Enter Turnip Price'
                        onInputChange={inputChangeHandler}
                        initialValue={props.route.params.price ? props.route.params.price : ''}
                        initialValid={false}
                        required
                    />
                    <Input
                        id='ask'
                        label='Asking For'
                        errorText='Please enter some Ask here. If nothing, then put "Nothing"'
                        returnKeyType='next'
                        placeHolder='What are you asking for?'
                        onInputChange={inputChangeHandler}
                        initialValue={''}
                        initialValid={false}
                        required
                    />
                    <Input
                        id='link'
                        label='Queue Link'
                        returnKeyType='next'
                        placeHolder='Enter Turnip Exchange Links Here'
                        onInputChange={inputChangeHandler}
                        initialValue={''}
                        initialValid={true}
                    />
                    <DefaultText style={styles.detailHeader}>Take Proof Photo</DefaultText>
                    <ImagePicker onImageTaken={imageTakenHandler} />
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
    )
}

export const newPostingOptions = navData => {
    return {
        title: 'Create New Posting',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconSize={30} iconName={'check-circle'} color={MainColors.cardText} onPress={() => navData.route.params.submitForm()}/>
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    postingWrapper: {
        backgroundColor: MainColors.cardBackground,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10
    },
    posting: {
        flex: 1
    },
    detailHeader: {
        color: MainColors.cardHeaderText,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },
    img: {
        height: 200,
        width: '100%',
        backgroundColor: '#cfc1b0',
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default NewPostingScreen