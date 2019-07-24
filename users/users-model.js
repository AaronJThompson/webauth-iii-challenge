const db = require('../data/dbConfig');


module.exports = {
    find,
    findByUsername,
    findById,
    remove,
    update
}

function find() {
    return db('users')
        .select(['id', 'username', 'department']);
}

function findByUsername(username) {
    return db('users')
        .where({ username })
        .first();
}

function findById(id) {
    return db('users')
        .where({id})
        .first();
}

function remove(id) {
    return db('users')
        .where({id})
        .del()
        .then(() => findById(id));
}

function update(id, fields) {
    return db('users')
        .where({id})
        .update(fields);
}