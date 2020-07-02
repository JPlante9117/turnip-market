import Posting from '../../models/posting'

export const GET_POSTINGS = 'GET_POSTINGS'
export const CREATE_POSTING = 'CREATE_POSTING'
export const DELETE_POSTING = 'DELETE_POSTING'

export const fetchPostings = () => {    
    return async (dispatch) => {
        try {
            const response = await fetch('https://sow-joan.firebaseio.com/postings.json')

            if (!response.ok) {
                throw new Error('Something went Wrong!')
            }

            const resData = await response.json()
            const loadedPostings = []
            const dateCheck = new Date()
            dateCheck.setDate(dateCheck.getDate() - 1)

            for(const key in resData){
                if(new Date(resData[key].date).getTime() > dateCheck.getTime()){
                    loadedPostings.push(new Posting(key,
                        resData[key].userId,
                        resData[key].price,
                        resData[key].ask,
                        resData[key].queueLink,
                        resData[key].date,
                        resData[key].proofImg,
                        resData[key].username))
                } else {
                    await dispatch(deletePosting(key))
                }
            }

            dispatch({
                type: GET_POSTINGS,
                postings: loadedPostings
            })

        } catch(err){
            throw err
        }
    }
}

export const createPosting = postingData => {
    return async (dispatch, getState) => {
        const userId = getState().authentication.uid
        const username = getState().userData.username
        const token = getState().authentication.token
        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/postings.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    username: username,
                    price: postingData.price,
                    ask: postingData.ask,
                    queueLink: postingData.link,
                    date: new Date(),
                    proofImg: postingData.image
                })
            })
            console.log("1")
            const resData = await response.json()
            console.log("2")
            dispatch({
                type: CREATE_POSTING,
                posting: {
                    id: resData.name,
                    userId: userId,
                    username: username,
                    price: postingData.price,
                    ask: postingData.ask,
                    link: postingData.link,
                    image: postingData.image
                }
            })
        } catch(err){
            console.log(err)
            throw err
        }
    }

}

export const deletePosting = postId => {
    return async (dispatch, getState) => {
        const token = getState().authentication.token
        try{
            const response = await fetch(`https://sow-joan.firebaseio.com/postings/${postId}.json?auth=${token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            dispatch({
                type: DELETE_POSTING,
                pid: postId
            })
        } catch(err){
            console.log(err)
            throw err
        }
    }
}