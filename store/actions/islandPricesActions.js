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

export const updatePrices = priceData => {
    return async (dispatch, getState) => {
        const userId = await getState().authentication.uid
        const token = await getState().authentication.token
        try{
            const response = await fetch(`https://sow-joan.firebaseio.com/userData.json?auth=${token}`)
            const resData = await response.json()
            let name
            let data
            for(const key in resData){
                if(resData[key].data.userId === userId){
                    name = key
                    data = resData[key]
                    break
                } 
            }

            let newValues = data.islandPrices.values
            newValues[priceData.day] = priceData.price

            let latestValue
            for (const index in newValues){
                if(newValues[index] === 0 && index !== 0){
                    latestValue = newValues[index - 1]
                    break
                }
            }

            await fetch(`https://sow-joan.firebaseio.com/userData/${name}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data.data,
                    islandPrices: {
                        values: newValues,
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

export const resetPrices = id => {
    return{
        type: RESET_PRICES,
        id: id
    }
}