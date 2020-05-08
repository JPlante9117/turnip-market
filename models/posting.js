import moment from "moment"

class Posting {
    constructor(id, userId, price, ask, queueLink, date, proofImg = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'){
        this.id = id
        this.userId = userId
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