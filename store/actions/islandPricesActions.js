import WeeklyTracker from "../../models/weeklytracker"
import { SET_DATAKEY } from "./userActions"

export const UPDATE_PRICES = 'UPDATE_PRICES'
export const RESET_PRICES = 'RESET_PRICES'
export const GET_PRICES = 'GET_PRICES'
export const INIT_PRICES = 'INIT_PRICES'

export const fetchPrices = () => {
    return async (dispatch, getState) => {
        const userId = await getState().authentication.uid
        const dataKey = await getState().userData.dataKey
        try {
            let data
            if (dataKey === ''){
                const response = await fetch(`https://sow-joan.firebaseio.com/userData.json`)
                if(!response.ok){
                    console.log('UH OH!!')
                }

                const resData = await response.json()

                let name

                for(const key in resData){
                    if(resData[key].data.userId === userId){
                        name = key
                        data = resData[key].islandPrices
                        break
                    } 
                }

                dispatch({
                    type: SET_DATAKEY,
                    key: name
                })
            } else {
                const response = await fetch(`https://sow-joan.firebaseio.com/userData/${dataKey}/islandPrices.json`)
                if(!response.ok){
                    console.log('UH OH!!')
                }

                const resData = await response.json()

                data = resData
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

export const updatePrices = priceData => {
    return async (dispatch, getState) => {
        const token = await getState().authentication.token
        const dataKey = await getState().userData.dataKey
        const prevData = await getState().islandPrices.myIslandPrices
        try{
            let newValues = prevData.values
            newValues[priceData.day] = priceData.price

            let latestValue = 0
            for (const index in newValues.reverse()){
                if(newValues[index] !== 0){
                    latestValue = newValues[index]
                    break
                }
            }

            await fetch(`https://sow-joan.firebaseio.com/userData/${dataKey}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    islandPrices: {
                        values: newValues.reverse(),
                        latest: latestValue
                    }
                })
            })

            dispatch({
                type: UPDATE_PRICES,
                values: newValues,
                latest: latestValue
            })

        } catch(err){
            console.log(err)
        }
    }
}

export const resetPrices = () => {
    return async (dispatch, getState) => {
        const dataKey = await getState().userData.dataKey
        const token = await getState().authentication.token
        try{
            await fetch(`https://sow-joan.firebaseio.com/userData/${dataKey}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    islandPrices: {
                        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        latest: 0
                    }
                })
            })

            dispatch({
                type: RESET_PRICES
            })

        } catch(err){
            console.log(err)
        }
    }
}