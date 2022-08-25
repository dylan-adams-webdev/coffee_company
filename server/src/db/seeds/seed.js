const data = require('./data.json');

exports.seed = function (knex) {
	return knex
		.raw('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
		.then(() => {
			return knex('#TABLE_NAME').insert(data);
		});
};
