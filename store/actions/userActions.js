export const SET_USERNAME = "SET_USERNAME"

export const setUsername = (username) => {
    return async (dispatch, getState) => {
        const uid = getState().authentication.uid
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/userData.json`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            })

            const resData = await response.json()
            console.log(resData)

        } catch(err){
            console.log(err)
        }
    }
}

export const initUserSection = (userId) => {
    console.log("init User Section")
    
    return async (dispatch, getState) =>{
        const token = await getState().authentication.token
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/userData.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        userId: userId,
                        username: ''
                    },
                    islandPrices: {
                        values: [0,0,0,0,0,0,0,0,0,0,0,0,0],
                        latest: 0
                    }
                })
            })

            console.log(response)

            if(!response.ok){
                console.log("ooooops")
            }

            const resData = await response.json()

            console.log(resData)

        } catch(err){
            console.log(err)
        }
    }
}