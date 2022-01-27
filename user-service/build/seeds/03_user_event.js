"use strict";
exports.seed = await = (knex) => {
    return knex('user_event').del()
        .then(function () {
        return knex('user_event').insert([
            {
                user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
                event_id: 'juhoniinikoski.Pihapelit'
            },
            {
                user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
                event_id: 'juhoniinikoski.Pihapelit2'
            },
            {
                user_id: '1b10e4d8-57ee-4d00-8886-e4a049d7ff8f',
                event_id: 'juhoniinikoski.Pihapelit'
            },
            {
                user_id: '1b10e4d8-57ee-4d00-8886-e4a049d7ff8f',
                event_id: 'juhoniinikoski.Pihapelit2'
            },
            {
                user_id: '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f',
                event_id: 'juhoniinikoski.Pihapelit'
            }
        ]);
    });
};
