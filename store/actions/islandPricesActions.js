export const UPDATE_PRICES = 'UPDATE_PRICES'
export const RESET_PRICES = 'RESET_PRICES'
export const GET_PRICES = 'GET_PRICES'
export const INIT_PRICES = 'INIT_PRICES'

export const fetchPrices = id => {
    //Fetch islandPrices from database

    //if user's prices are not included, run initPrices. AWAIT IT AS IT IS A PROMISE

    //dispatch GET_PRICES
}

export const initPrices = uid => {
    //Create a new WeeklyTracker Object here set to default values

    //send to database for creation.
    return {
        type: INIT_PRICES,
        id: '1',
        userId: uid
    }
}

export const resetPrices = id => {
    //patch request to DB with new data

    //dispatch RESET_PRICES
    return{
        type: RESET_PRICES,
        id: '1'
    }
}

export const updatePrices = priceData => {
    return {
        type: UPDATE_PRICES,
        updatedDays: priceData
    }
}