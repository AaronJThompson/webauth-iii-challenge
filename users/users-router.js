const UsersDB = require('./users-model');
const bcrypt = require('bcrypt');
const router = require('express').Router();


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if(username && password) {
        try {
            const hash = await bcrypt.hash(password, 12);
            const user = await UsersDB.add(username, hash);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Couldn't add user"});
        }
    } else {
        res.status(400).json({ error: "Both username and password are required"});
    }
})