import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet, Dimensions, Button } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { LineChart } from 'react-native-chart-kit'
import { MainColors } from '../../constants/MainColors'

const MyMarketScreen = props => {
    
    const [isLoading, setIsLoading] = useState(false)

    const pulledData = {
        buy: 101,
        monM: 126,
        monA: 95,
        tueM: 106,
        tueA: 99,
        wedM: 0,
        wedA: 0,
        thuM: 0,
        thuA: 0,
        friM: 0,
        friA: 0,
        satM: 0,
        satA: 0,
        latest: 99
    }

    const net = pulledData.latest - pulledData.buy
    
    const data = {
        labels: ["Sun", "Mon", "", "Tues", "", "Wed", "", "Thurs", "", "Fri", "", "Sat", ""],
        datasets: [
          {
            data: [pulledData.buy, pulledData.monM, pulledData.monA, pulledData.tueM, pulledData.tueA, pulledData.wedM, pulledData.wedM, pulledData.thuM, pulledData.thuM, pulledData.friM, pulledData.friM, pulledData.satM, pulledData.satM],
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
                        backgroundColor: MainColors.cardBackground,
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
                    <DefaultText style={styles.net}>Today's Price: <DefaultText style={styles.bells}>{pulledData.latest} bells</DefaultText> / Turnip</DefaultText>
                    <DefaultText style={styles.net}>Current Net: <DefaultText style={{fontSize: 20, color: net > 0 ? 'green' : 'red'}}>{net > 0 ? "+" + net : net} bells</DefaultText> / Turnip</DefaultText>
                </View>
                <View>
                    <Button title='Reset Week' onPress={() => {}}/>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainColors.paleBackground,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: MainColors.paleBackground,
        borderRadius: 10
    },
    header: {
        fontSize: 30,
        color: MainColors.cardHeaderText,
        textAlign: 'center',
    },
    net: {
        fontSize: 20,
        color: MainColors.cardHeaderText,
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
        backgroundColor: MainColors.cardBackground,
        width: Dimensions.get('window').width - 10      
    },
    textContainer: {
        backgroundColor: MainColors.cardBackground,
        width: '100%',
        marginVertical: 10,
        borderRadius: 10
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