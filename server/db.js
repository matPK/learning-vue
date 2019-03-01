'use strict'
const sqlite3 = require('sqlite3').verbose()

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file)
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id integer PRIMARY KEY, 
                name text, 
                email text UNIQUE, 
                user_pass text,
                isAdmin integer)`
        return this.db.run(sql)
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM users WHERE email = ?`,
            [email],function(err,row){
                callback(err,row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO users (name, email, user_pass, isAdmin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM users`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO users (name, email, user_pass) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }
}

module.exports = Db