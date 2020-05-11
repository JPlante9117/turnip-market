import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('postings.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS postings (id INTEGER PRIMARY KEY NOT NULL, userId INTEGER NOT NULL, price INTEGER NOT NULL, ask TEXT NOT NULL, queueLink TEXT, imageUri TEXT NOT NULL)',
            [],
            () => { //Success Function
                resolve()
            },
            (_, err) => { //Fail Function
                reject(err)
            })
        })
    })

    return promise
}

export const insertPosting = (userId, price, ask, queueLink, imageUri) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO postings (userId, price, ask, queueLink, imageUri) VALUES (?, ?, ?, ?, ?)`,
            [userId, price, ask, queueLink, imageUri],
            (_, result) => {
                resolve(result)
            },
            (_, err) => {
                reject(err)
            })
        })
    })

    return promise
}