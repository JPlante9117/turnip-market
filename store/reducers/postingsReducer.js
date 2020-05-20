import { GET_POSTINGS, CREATE_POSTING, DELETE_POSTING } from "../actions/postingActions"
import Posting from "../../models/posting"

const initialState = {
    postings: [],
    myPostings: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_POSTINGS:
            return {
                postings: action.postings,
                myPostings: []
            }
        case CREATE_POSTING:
            let postData = action.posting
            const newPosting = new Posting(postData.id, postData.userId, postData.price, postData.ask, postData.link, new Date(), postData.image)
            return {
                postings: state.postings.concat(newPosting),
                myPostings: state.myPostings.concat(newPosting)
            }
        case DELETE_POSTING:
            return{
                postings: state.postings.filter(post => post.id !== action.pid),
                myPostings: state.myPostings.filter(post => post.id !== action.pid)
            }
        default:
            return state
    }
}