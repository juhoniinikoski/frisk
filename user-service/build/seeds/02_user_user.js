"use strict";
exports.seed = await = (knex) => {
    return knex('user_user').del()
        .then(function () {
        return knex('user_user').insert([
            {
                follower_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
                following_id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2'
            },
            {
                follower_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
                following_id: '1b10e4d8-57ee-4d00-8886-e4a049d7ff8f'
            },
            {
                follower_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
                following_id: '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f'
            }
        ]);
    });
};
