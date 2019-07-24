const UsersDB = require('./users-model');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const { restricted, generateToken } = require('../jwt');

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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if(username && password) {
        try {
            const user = await UsersDB.findByUsername(username);
            if(await bcrypt.compare(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json('Not Allowed here!')
            }
        } catch (error) {
            res.status(500).json({ error: "Error when loggin in"});
        }
    } else {
        res.status(400).json({ error: "Both username and password are required"});
    }
})

router.get('/', restricted, async (req, res) => {
    try {
        const users = await UsersDB.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get users" });
    }
})

module.exports = router;