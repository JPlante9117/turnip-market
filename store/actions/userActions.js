export const SET_USERNAME = "SET_USERNAME"
export const SET_DATAKEY = "SET_DATAKEY"

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
                        islandName: '',
                        username: '',
                        avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                    },
                    islandPrices: {
                        values: [0,0,0,0,0,0,0,0,0,0,0,0,0],
                        latest: 0
                    }
                })
            })

        } catch(err){
            console.log(err)
        }
    }
}