import POSTINGS from "../../dummyData/postingData"

export const GET_POSTINGS = 'GET_POSTINGS'
export const CREATE_POSTING = 'CREATE_POSTING'

export const fetchPostings = () => {
    return {
        type: GET_POSTINGS,
        postings: POSTINGS
    }
}

export const createPosting = postingData => {
    return {
        type: CREATE_POSTING,
        posting: postingData
    }
}