export const SET_USERDATA = "SET_USERDATA"
export const SET_DATAKEY = "SET_DATAKEY"
export const GET_USERDATA = "GET_USERDATA"

export const getDataKey = () => {
    return async (dispatch, getState) => {
        const userId = await getState().authentication.uid
        try{
            const response = await fetch('https://sow-joan.firebaseio.com/userData.json')
            if(!response.ok){
                console.log('UH OH!!')
            }

            const resData = await response.json()

            let name, data

            for(const key in resData){
                if(resData[key].data.userId === userId){
                    name = key
                    data = resData[key].data
                    break
                } 
            }

            dispatch({
                type: SET_DATAKEY,
                key: name,
                data: data
            })
        } catch(err) {
            throw err
        }
    }
}

export const setUserData = (userData) => {
    return async (dispatch, getState) => {
        const dataKey = await getState().userData.dataKey
        const uid = await getState().authentication.uid
        const token = await getState().authentication.token
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/userData/${dataKey}.json?auth=${token}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        username: userData.username,
                        avatar: userData.avatarURL,
                        islandName: userData.islandName,
                        userId: uid
                    }
                })
            })

            const resData = await response.json()
            console.log(resData)
            dispatch({
                type: SET_USERDATA,
                username: userData.username,
                avatarURL: userData.avatarURL,
                islandName: userData.islandName
            })

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