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
            let updatedIsland = {
                values: action.values,
                latest: action.latest
            }
            return {
                myIslandPrices: updatedIsland
            }
        case RESET_PRICES:
            return initialState
        default:
            return state
    }
}