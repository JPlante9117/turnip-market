import React, { useCallback } from 'react'
import { View, Button, StyleSheet, Platform, Image } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import DefaultText from './DefaultText'
import { MainColors } from '../constants/MainColors'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { deletePosting } from '../store/actions/postingActions'

const MarketCard = props => {

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    let user = useSelector(state => state.userData.users.find(prof => prof.id === props.user))
    let currentUser = useSelector(state => state.authentication.uid)
    let dispatch = useDispatch()

    const deleteHandler = useCallback(async () => {
        await dispatch(deletePosting(props.id))
    }, [deletePosting, dispatch])

    let deleteRadius = {}

    if (currentUser === props.user){
        deleteRadius = {
            borderBottomRightRadius: 0
        }
    }

    return(
        <View>
        <View style={{...styles.card, overflow: 'hidden', ...deleteRadius}}>
        <Touchable onPress={props.handlePress}>
            <View style={styles.card}>
                <Image style={styles.circle} source={{uri: user.avatar}} />
                <View style={styles.column}>
                    <DefaultText style={styles.header}>USER</DefaultText>
                    <DefaultText>{user.username}</DefaultText>
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
        {currentUser === props.user ? 
            <View style={{...styles.delete, overflow: 'hidden'}}>
            <Touchable>
                <View style={styles.delete}>
                    <FontAwesome name="trash" size={30} color={MainColors.cardHeaderText} onPress={deleteHandler} />
                </View>
            </Touchable>
            </View> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: MainColors.cardBackground,
        height: 100,
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
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
    },
    delete: {
        alignSelf: 'flex-end',
        borderRadius: 100,
        backgroundColor: MainColors.paleBackground,
        height: 50,
        width: 50,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MarketCard