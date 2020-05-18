import React, { useEffect, useState, useCallback } from 'react'
import { View, ImageBackground, StyleSheet, Dimensions, Button, Modal, Alert } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { LineChart } from 'react-native-chart-kit'
import { MainColors } from '../../constants/MainColors'
import IslandPriceModal from '../../components/IslandPriceModal'
import { fetchPrices } from '../../store/actions/islandPricesActions'
import { useDispatch, useSelector } from 'react-redux'

const MyMarketScreen = props => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [latestVal, setLatestVal] = useState(0)
    const [modalVis, setModalVis] = useState(false)
    const state = useSelector(state => state.islandPrices.myIslandPrices.values)
    const dispatch = useDispatch()

    const loadPrices = useCallback(async () => {
        try {
            await dispatch(fetchPrices())
        } catch (err){
            console.log(err)
        }
    }, [dispatch])

    useEffect(() => {
        loadPrices()
    }, [dispatch, loadPrices])

    

    const onInputSubmit = useCallback((day, val) => {
        console.log('submit worked')
        let allVals = values
        allVals[day] = parseInt(val)
        setValues(allVals)
        setModalVis(!modalVis)
    }, [setValues, setModalVis])

    const net = latestVal - values[0]
    
    const data = {
        labels: ["Sun", "Mon", "", "Tues", "", "Wed", "", "Thurs", "", "Fri", "", "Sat", ""],
        datasets: [
          {
            data: values,
            strokeWidth: 2
          }
        ],
      };

    return(
        <ImageBackground style={styles.container} source={require('../../assets/bgtest.png')}>
            <View style={styles.wrapper}>
                <View style={styles.textContainer}>
                    <DefaultText style={styles.header}>This Week's Prices</DefaultText>
                </View>
                <LineChart
                    data={data}
                    width={Dimensions.get('window').width - 10}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: MainColors.cardBackground,
                        backgroundGradientTo: MainColors.paleBackground,
                        color: (opacity = 1) => `rgba(95, 78, 58, ${opacity})`,
                        style: {
                        borderRadius: 16
                        },
                        decimalPlaces: 0
                    }}
                    bezier
                    style={{
                        borderRadius: 10
                    }}
                />
                <View style={styles.netContainer}>
                    <View style={styles.netCol}>
                        <DefaultText style={styles.net}>Today's Price: </DefaultText>
                        <DefaultText style={styles.bells}>{latestVal} bells</DefaultText>
                    </View>
                    <View style={styles.netCol}>
                        <DefaultText style={styles.net}>Current Net:</DefaultText>
                        <DefaultText style={{fontSize: 20, color: net > 0 ? 'green' : 'red'}}>{net > 0 ? "+" + net : net} bells</DefaultText>
                    </View>
                </View>
                
                <View style={styles.buttonContainer}>
                    <Button title='Add Price' color={MainColors.cardHeaderText} onPress={() => props.navigation.navigate("UpdateMarket")}/>
                </View>
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
        alignItems: 'center',
        backgroundColor: MainColors.cardBackground,
        borderRadius: 10
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
        width: Dimensions.get('window').width - 30
    },
    modalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#00000080'
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