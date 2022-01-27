"use strict";
exports.up = function (knex) {
    return knex.schema.createTable('user_event', table => {
        table.increments('id').primary();
        table.text('user_id').notNullable();
        table.text('event_id').notNullable();
        table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('cascade');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_event');
};
