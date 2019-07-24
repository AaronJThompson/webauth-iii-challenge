const express = require('express');
const UserRouter = require('./users/users-router');
const server = express();

server.use(express.json());
server.use('/api', UserRouter);

server.listen(4000, () => {
    console.log('Listening on port 4000');
})