
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.text('username', 128).notNullable().unique();
        tbl.text('password', 256).notNullable();
        tbl.text('department', 128);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExisits('users');
};
