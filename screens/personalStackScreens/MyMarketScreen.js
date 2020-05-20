import React, { useEffect, useState, useCallback } from 'react'
import { View, ImageBackground, StyleSheet, Dimensions, Button, InteractionManager, ActivityIndicator, Modal, Alert } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { MainColors } from '../../constants/MainColors'
import { fetchPrices, resetPrices } from '../../store/actions/islandPricesActions'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card'
import { useFocusEffect } from '@react-navigation/native'
import IslandChart from '../../components/IslandChart'
import IslandPriceModal from '../../components/IslandPriceModal'
import { specificNav } from '../../navigation/MarketNavigator'

const MyMarketScreen = props => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [modalVis, setModalVis] = useState(false)
    const [wantedPosting, setWantedPosting] = useState({
        checked: false,
        price: 0
    })
    const state = useSelector(state => state.islandPrices.myIslandPrices)
    const dispatch = useDispatch()

    if(wantedPosting.checked){
        setWantedPosting({
            ...wantedPosting,
            checked: false
        })
        props.navigation.navigate('NewPosting', {price: wantedPosting.price})
    }

    const loadPrices = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(fetchPrices())
            setIsLoading(false)
        } catch (err){
            console.log(err)
        }
    }, [dispatch])

    const resetWeek = useCallback(async () => {
        setIsLoading(true)
        try{
            await dispatch(resetPrices())
            setIsLoading(false)
        }catch(err){
            console.log(err)
        }
    })

    const postingDataSetter = price => {
        setWantedPosting({
            checked: true,
            price: price
        })
    }

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(loadPrices)

            return () => task.cancel()
        }, [loadPrices])
    )

    const net = state.latest - state.values[0]

    return(
        <ImageBackground style={styles.container} source={require('../../assets/bgtest.png')}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVis}
                onRequestClose={() => {
                    Alert.alert("Please close the modal first before navigating")
                }}
            >
                <View style={styles.modalWrapper}>
                    <IslandPriceModal closeModal={() => setModalVis(false)} checkboxChecked={postingDataSetter}/>
                </View>
            </Modal>
            <Card>
                <View>
                <View style={styles.textContainer}>
                    <DefaultText style={styles.header}>This Week's Prices</DefaultText>
                </View>
                {isLoading ? <View style={styles.updateContainer}>
                    <DefaultText style={styles.updateText}>Checking for Price Changes...</DefaultText>
                    <ActivityIndicator size='large' color={MainColors.paleBackground}/>
                    </View> : <IslandChart data={state.values} />}
                <View style={styles.netContainer}>
                    <View style={styles.netCol}>
                        <DefaultText style={styles.net}>Today's Price: </DefaultText>
                        <DefaultText style={styles.bells}>{isLoading ? "..." : state.latest} bells</DefaultText>
                    </View>
                    <View style={styles.netCol}>
                        <DefaultText style={styles.net}>Current Net:</DefaultText>
                        <DefaultText style={{fontSize: 20, color: net > 0 ? 'green' : 'red'}}>{isLoading ? "..." : net > 0 ? "+" + net : net} bells</DefaultText>
                    </View>
                </View>
                {isLoading ? <View/> : <View style={styles.buttonContainer}>
                    <Button title='Add Price' color={MainColors.bellsBlue} onPress={() => setModalVis(true)}/>
                    <Button title='Reset Week' color={'red'} onPress={resetWeek} />
                </View>}
                </View>
            </Card>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 30,
        color: MainColors.cardText,
        textAlign: 'center',
    },
    net: {
        fontSize: 20,
        color: MainColors.cardText,
        textAlign: 'center'
    },
    bells: {
        fontSize: 20,
        color: MainColors.bellsBlue
    },
    netContainer: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'    
    },
    textContainer: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width - 30
    },
    netCol: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        margin: 10,
        width: Dimensions.get('window').width - 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#00000080'
    },
    updateContainer: {
        alignItems: 'center'
    },
    updateText: {
        color: MainColors.paleBackground,
        fontFamily: 'varela-round',
        fontSize: 20
    }
})

export const myMarketOptions = navData => {
    return{
        title: 'My Island Market',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName="navicon" iconSize={30} onPress={() => navData.navigation.openDrawer()}/>
            </HeaderButtons>
        )
    }
}

export default MyMarketScreen