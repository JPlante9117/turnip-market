import React, { useEffect } from 'react'
import {View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import { useDispatch } from 'react-redux'
import DefaultText from '../../components/DefaultText'
import { triedAutoLogin, authenticate } from '../../store/actions/authActions'
import { MainColors } from '../../constants/MainColors'
import { getDataKey } from '../../store/actions/userActions'

const StartupScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if(!userData){
                dispatch(triedAutoLogin())
                return
            }
            
            const transformedData = JSON.parse(userData)
            const { token, uid, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !uid){
                dispatch(triedAutoLogin())
                return
            }
            const expirationTime = expirationDate.getTime() - new Date().getTime()

            dispatch(authenticate(uid, token, parseInt(expirationTime) * 1000))
            dispatch(getDataKey())
        }
        tryLogin()
    }, [dispatch, authenticate])

    return(
        <View style={styles.screen}>
            <DefaultText style={styles.title}>SOW JOAN</DefaultText>
            <ActivityIndicator size='large' color={MainColors.cardText} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MainColors.cardBackground
    },
    title: {
        color: MainColors.cardText,
        fontSize: 70,
        fontFamily: 'varela-round'
    }
})

export default StartupScreen