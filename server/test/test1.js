const request = require('supertest');

const app = require('../src/app');
const knex = require('../src/db/connection');

describe('Generic test file', () => {
	beforeAll(() => {
		return knex.migrate
			.forceFreeMigrationsLock()
			.then(() => knex.migrate.rollback(null, true))
			.then(() => knex.migrate.latest());
	});

	beforeEach(() => {
		return knex.seed.run();
	});

	afterAll(async () => {
		return await knex.migrate
			.rollback(null, true)
			.then(() => knex.destroy());
	});

	describe('App', () => {
		describe('not found handler', () => {
			test('returns 404 for non-existent route', async () => {
				const response = await request(app)
					.get('/fastidious')
					.set('Accept', 'application/json');

				expect(response.status).toBe(404);
				expect(response.body.error).toBe('Path not found: /fastidious');
			});
		});
	});
});
