const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4} = require('uuid')
const app = express()
const cors = require('cors')
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())
app.get('/todos/:userEmail', async (req, res) => {
    
    const {userEmail} = req.params
    
    try {
       const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
       res.json(todos.rows)
    } catch (err) {
        console.error(err)
    }
})

app.post('/todos', async (req, res) => {
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, date)
    const id = uuidv4()
    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
        [id, user_email, title, progress, date])
        res.json(newToDo)
    } catch (err) {
        console.error(err)
    }
})


app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
        res.json(deleteToDo)
    } catch (err) {
        console.error(err)
    }
    
})

//travel

app.get('/trav/:userEmail', async (req, res) => {
    
    const {userEmail} = req.params
    
    try {
       const travs = await pool.query('SELECT * FROM trav WHERE user_email = $1', [userEmail])
       res.json(travs.rows)
    } catch (err) {
        console.error(err)
    }
})

app.post('/trav', async (req, res) => {
    const {user_email, title, date} = req.body
    console.log(user_email, title, date)
    const id = uuidv4()
    try {
        const newTrav = await pool.query(`INSERT INTO trav(id, user_email, title, date) VALUES($1, $2, $3, $4)`,
        [id, user_email, title, date])
        res.json(newTrav)
    } catch (err) {
        console.error(err)
    }
})


app.delete('/trav/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteTrav = await pool.query('DELETE FROM trav WHERE id = $1;', [id])
        res.json(deleteTrav)
    } catch (err) {
        console.error(err)
    }
    
})

//shop

app.get('/shop/:userEmail', async (req, res) => {
    
    const {userEmail} = req.params
    
    try {
       const shops = await pool.query('SELECT * FROM shop WHERE user_email = $1', [userEmail])
       res.json(shops.rows)
    } catch (err) {
        console.error(err)
    }
})

app.post('/shop', async (req, res) => {
    const {user_email, title, date} = req.body
    console.log(user_email, title, date)
    const id = uuidv4()
    try {
        const newShop = await pool.query(`INSERT INTO shop(id, user_email, title, date) VALUES($1, $2, $3, $4)`,
        [id, user_email, title, date])
        res.json(newShop)
    } catch (err) {
        console.error(err)
    }
})


app.delete('/shop/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteShop = await pool.query('DELETE FROM shop WHERE id = $1;', [id])
        res.json(deleteShop)
    } catch (err) {
        console.error(err)
    }
    
})

//watch

app.get('/watch/:userEmail', async (req, res) => {
    
    const {userEmail} = req.params
    
    try {
       const watches = await pool.query('SELECT * FROM watch WHERE user_email = $1', [userEmail])
       res.json(watches.rows)
    } catch (err) {
        console.error(err)
    }
})

app.post('/watch', async (req, res) => {
    const {user_email, title, date} = req.body
    console.log(user_email, title, date)
    const id = uuidv4()
    try {
        const newWatch = await pool.query(`INSERT INTO watch(id, user_email, title, date) VALUES($1, $2, $3, $4)`,
        [id, user_email, title, date])
        res.json(newWatch)
    } catch (err) {
        console.error(err)
    }
})


app.delete('/watch/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteWatch = await pool.query('DELETE FROM watch WHERE id = $1;', [id])
        res.json(deleteWatch)
    } catch (err) {
        console.error(err)
    }
    
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
        [email, hashedPassword])

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token})

    } catch (err) {
        console.error(err)
        if (err) {
            res.json({detail: err.detail})
        }
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
       const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

       if (!users.rows.length) return res.json({detail: 'User does not exist'})

     const success = await bcrypt.compare(password, users.rows[0].hashed_password)
     const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

    if (success) {
        res.json({'email' : users.rows[0].email, token})
    } else {
        res.json({detail: 'Login failed'})
    }

    } catch (err) {
        console.error(err)
    }
})


app.listen(PORT, ()=> console.log('Server running on PORT ${PORT}'))