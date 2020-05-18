class WeeklyTracker {
    constructor(id, userId, values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], latest = 0){
        this.id = id
        this.userId = userId
        this.values = values
        this.latest = latest
    }
}

export default WeeklyTracker