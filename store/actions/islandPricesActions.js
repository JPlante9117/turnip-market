import WeeklyTracker from "../../models/weeklytracker"

export const UPDATE_PRICES = 'UPDATE_PRICES'
export const RESET_PRICES = 'RESET_PRICES'
export const GET_PRICES = 'GET_PRICES'
export const INIT_PRICES = 'INIT_PRICES'

export const fetchPrices = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://sow-joan.firebaseio.com/islandprices.json')

            if(!response.ok){
                console.log('UH OH!!')
            }

            const resData = await response.json()
            const loadedPrices = []

            for(const key in resData){
                loadedPrices.push(new WeeklyTracker(
                    key,
                    resData[key].userId,
                    resData[key].values,
                    resData[key].latest
                ))
            }

            dispatch({
                type: GET_PRICES,
                islandPrices: loadedPrices,
                myIslandPrices: loadedPrices.filter(isle => isle.userId == 1)
            })
        } catch(err){
            throw err
        }
    }
}

export const initPrices = uid => {
    return {
        type: INIT_PRICES,
        id: new Date(),
        userId: uid
    }
}

export const resetPrices = id => {
    return{
        type: RESET_PRICES,
        id: id
    }
}

export const updatePrices = priceData => {
    return {
        type: UPDATE_PRICES,
        updatedDays: priceData
    }
}