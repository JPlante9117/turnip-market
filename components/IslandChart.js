import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { MainColors } from '../constants/MainColors'

const IslandChart = props => {

    const data = {
        labels: ["Sun", "Mon", "", "Tues", "", "Wed", "", "Thurs", "", "Fri", "", "Sat", ""],
        datasets: [
          {
            data: props.data,
            strokeWidth: 2
          }
        ],
    }

    return (
        <LineChart
            data={data}
            width={Dimensions.get('window').width}
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
    )
}

export default IslandChart