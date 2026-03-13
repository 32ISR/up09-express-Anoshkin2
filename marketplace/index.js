const express = require("express")
const db = require("./db")
const app = express()

const PORT = 3000

app.get("/", (req,res) => {
    return res.status(200).json({text: "hello world"})
})

app.get("/api/items", (req, res) => {
    try {
        const items = db.prepare(
            "SELECT * FROM items ORDER BY createAt DESC"
        ).all()

        return res.status(200).json(items)
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: "Failed to fetch"})
    }
})

app.listen(PORT)