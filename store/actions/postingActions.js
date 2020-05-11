import * as FileSystem from 'expo-file-system'
import POSTINGS from "../../dummyData/postingData"
import { insertPosting } from '../../helpers/db'

export const GET_POSTINGS = 'GET_POSTINGS'
export const CREATE_POSTING = 'CREATE_POSTING'

export const fetchPostings = () => {
    return {
        type: GET_POSTINGS,
        postings: POSTINGS
    }
}

export const createPosting = postingData => {
    return async dispatch => {

        const fileName = postingData.image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName

        try {
            await FileSystem.moveAsync({
                from: postingData.image,
                to: newPath
            })
            const dbResult = await insertPosting('u1', postingData.price, postingData.ask, postingData.link, newPath)
            console.log()
            dispatch({
                type: CREATE_POSTING,
                posting: {
                    id: dbResult.insertId,
                    price: postingData.price,
                    ask: postingData.ask,
                    link: postingData.link,
                    image: newPath
                }
            })
        } catch(err){
            console.log(err)
            throw err
        }
    }

}