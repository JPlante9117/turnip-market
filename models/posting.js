import moment from "moment"

class Posting {
    constructor(id, userId, price, ask, queueLink, date, proofImg, username){
        this.id = id
        this.userId = userId
        this.username = username
        this.price = price
        this.ask = ask
        this.queueLink = queueLink
        this.date = date
        this.proofImg = proofImg
    }

    get readableDate() {
        return moment(this.date).format('MMM Do')
    }
}

export default Posting