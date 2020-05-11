import POSTINGS from "../../dummyData/postingData"
import { GET_POSTINGS, CREATE_POSTING } from "../actions/postingActions"
import Posting from "../../models/posting"

const initialState = {
    postings: POSTINGS,
    myPostings: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_POSTINGS:
            return {
                postings: POSTINGS,
                myPostings: []
            }
        case CREATE_POSTING:
            let postData = action.postingData
            const newPosting = new Posting(new Date(), 'u1', postData.price, postData.ask, postData.queueLink, postData.date, postData.proofImg)
            return {
                postings: state.postings.concat(newPosting),
                myPostings: state.myPostings.concat(newPosting)
            }
        default:
            return state
    }
}