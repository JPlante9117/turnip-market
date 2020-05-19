import WeeklyTracker from "../../models/weeklytracker"

export const UPDATE_PRICES = 'UPDATE_PRICES'
export const RESET_PRICES = 'RESET_PRICES'
export const GET_PRICES = 'GET_PRICES'
export const INIT_PRICES = 'INIT_PRICES'

export const fetchPrices = () => {
    return async (dispatch, getState) => {
        const userId = await getState().authentication.uid
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/userData.json`)
            if(!response.ok){
                console.log('UH OH!!')
            }

            const resData = await response.json()

            let data

            for(const key in resData){
                if(resData[key].data.userId === userId){
                    data = resData[key].islandPrices
                    break
                } 
            }

            dispatch({
                type: GET_PRICES,
                myIslandPrices: data
            })
        } catch(err){
            throw err
        }
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