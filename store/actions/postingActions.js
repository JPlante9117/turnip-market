import * as FileSystem from 'expo-file-system'
import POSTINGS from "../../dummyData/postingData"
import { insertPosting } from '../../helpers/db'
import Posting from '../../models/posting'
import { uriToBlob } from '../../helpers/uriToBlob'

export const GET_POSTINGS = 'GET_POSTINGS'
export const CREATE_POSTING = 'CREATE_POSTING'

export const fetchPostings = () => {    
    return async (dispatch) => {
        try {
            const response = await fetch('https://sow-joan.firebaseio.com/postings.json')

            if (!response.ok) {
                throw new Error('Something went Wrong!')
            }

            const resData = await response.json()
            const loadedPostings = []
            
            for(const key in resData){
                loadedPostings.push(new Posting(key,
                    resData[key].userId,
                    resData[key].price,
                    resData[key].ask,
                    resData[key].queueLink,
                    resData[key].date,
                    resData[key].proofImg))
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

        try {
            const response = await fetch(`https://sow-joan.firebaseio.com/postings.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: 'u1',
                    price: postingData.price,
                    ask: postingData.ask,
                    queueLink: postingData.link,
                    date: new Date(),
                    proofImg: postingData.image
                })
            })

            const resData = await response.json()
            
            dispatch({
                type: CREATE_POSTING,
                posting: {
                    id: resData.name,
                    price: postingData.price,
                    ask: postingData.ask,
                    link: postingData.link,
                    image: postingData.image
                }
            })
        } catch(err){
            throw err
        }
    }

}