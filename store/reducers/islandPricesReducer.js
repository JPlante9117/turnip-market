import { UPDATE_PRICES, RESET_PRICES, GET_PRICES, INIT_PRICES } from "../actions/islandPricesActions"
import WeeklyTracker from "../../models/weeklytracker"

const initialState = {
    myIslandPrices: {
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        latest: 0
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PRICES:
            return {
                myIslandPrices: {
                    values: action.myIslandPrices.values,
                    latest: action.myIslandPrices.latest
                }
            }
        case UPDATE_PRICES:
            let selectedDay = action.updatedDays.day
            let selectedPrice = action.updatedDays.price
            let updatedValues = [...state.myIslandPrices.values]
            updatedValues[selectedDay] = selectedPrice
            let latestValue
            for (const index in updatedValues){
                if(updatedValues[index] === 0 && index !== 0){
                    latestValue = updatedValues[index - 1]
                    break
                }
            }
            let updatedIsland = {
                values: updatedValues,
                latest: latestValue
            }
            return {
                myIslandPrices: updatedIsland
            }
        case RESET_PRICES:
            let isleIndex = state.islandPrices.findIndex(isl => isl.id === action.id)
            let selectedIsle = state.islandPrices.find(isl => isl.id === action.id)
            let resetIsland
            if (selectedIsle) {
                resetIsland = {
                    ...selectedIsle,
                    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    latest: 0
                }
            } else {
                resetIsland = new WeeklyTracker(new Date().toString(), 'u1')
            }
            let updatedIslesList = [...state.islandPrices]
            if (isleIndex) {
                updatedIslesList[isleIndex] = resetIsland
            } else {
                updatedIslesList.concat(resetIsland)
            }
        default:
            return state
    }
}