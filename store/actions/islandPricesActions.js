import WeeklyTracker from "../../models/weeklytracker"

export const UPDATE_PRICES = 'UPDATE_PRICES'
export const RESET_PRICES = 'RESET_PRICES'
export const GET_PRICES = 'GET_PRICES'
export const INIT_PRICES = 'INIT_PRICES'

export const fetchPrices = () => {
    return async (dispatch, getState) => {
        const userId = getState().authentication.uid
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/users/${userId}/islandPrices.json`)

            if(!response.ok){
                console.log('UH OH!!')
            }

            const resData = await response.json()
            console.log('resData is:', resData)
            return

            for(const key in resData){
                loadedPrices.push(new WeeklyTracker(
                    key,
                    resData[key].values,
                    resData[key].latest
                ))
            }

            dispatch({
                type: GET_PRICES,
                myIslandPrices: loadedPrices
            })
        } catch(err){
            throw err
        }
    }
}

export const initPrices = (userId) => {
    return async (dispatch) => {
        const newTracker = new WeeklyTracker(new Date(), userId)
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/users/${userId}/islandPrices.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: newTracker.userId,
                    values: newTracker.values,
                    latest: newTracker.latest
                })
            })

            const resData = await response.json()
            console.log(resData)
            return
        } catch(err){
            console.log(err)
        }
    }
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