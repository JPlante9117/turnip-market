import { UPDATE_PRICES, RESET_PRICES, GET_PRICES, INIT_PRICES } from "../actions/islandPricesActions"
import WeeklyTracker from "../../models/weeklytracker"

const initialState = {
    islandPrices: [],
    myIslandPrices: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case INIT_PRICES: 
            let newPriceSet = new WeeklyTracker(action.id, action.userId)
            return {
                ...state,
                islandPrices:  state.islandPrices.concat(newPriceSet),
                myIslandPrices: newPriceSet
            }
        case GET_PRICES:
            return {
                ...state,
                islandPrices: action.islandPrices,
                myIslandPrices: action.myIslandPrices
            }
        case UPDATE_PRICES:
            let islandIndex = state.islandPrices.findIndex(isl => isl.userId === 'u1')
            let selectedIsland = state.islandPrices.find(isl => isl.userId === 'u1')
            let selectedDay = action.updatedDays.day
            let selectedPrice = action.updatedDays.price
            let updatedIsland
            if (selectedIsland){
                updatedIsland = {
                    ...selectedIsland
                }
            } else {
                updatedIsland = new WeeklyTracker(new Date().toString(), 'u1')
            }
            let updatedValues = [...updatedIsland.values]
            updatedValues[selectedDay] = selectedPrice
            let latestValue
            for (const index in updatedValues){
                if(updatedValues[index] === 0 && index !== 0){
                    latestValue = updatedValues[index - 1]
                    break
                }
            }
            updatedIsland = {
                ...updatedIsland,
                values: updatedValues,
                latest: latestValue
            }
            let updatedIslandsList = [...state.islandPrices]
            if (islandIndex) {
                updatedIslandsList[islandIndex] = updatedIsland
            } else {
                updatedIslandsList.concat(updatedIsland)
            }
            return {
                islandPrices: updatedIslandsList,
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