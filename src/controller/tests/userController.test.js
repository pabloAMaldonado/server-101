const userController = require('../userController.js')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../../index.js')

const { beforeAll, afterAll, describe, test, expect } = require('@jest/globals')
const { initializeMongoServer, closeMongoServer } = require('../functions/mongoConfigTesting.js')

beforeAll(async () => {
  await initializeMongoServer()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await closeMongoServer()
})

describe('POST /new-user', () => {
  test('create user with given data responds with a 200 status code and JSON content type', async () => {
    const response = await request(app).post('/new-user').send({
      username: 'username',
      password: 'password',
      email: "test@example.com"
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  })
})

module.exports = app
