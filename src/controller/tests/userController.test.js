const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../../index.js')
const bcrypt = require('bcryptjs')

const User = require('../../models/userModel.js')
const Organization = require('../../models/organizationModel.js')


const { beforeAll, afterAll, describe, test, expect } = require('@jest/globals')
const { initializeMongoServer, closeMongoServer } = require('../functions/mongoConfigTesting.js')
const { generateToken } = require('../../configuration/passportConfig.js')


let token;
let userId;
let orgId;

beforeAll(async () => {
  await initializeMongoServer()

  const user = await User.create({
    username: 'testuser',
    password: await bcrypt.hash('Password', 10),
    email: 'test@example.com'
  })
  token = generateToken(user)
  userId = user._id

  const test_org = await Organization.create({
    name: 'Testo Org',
    createdBy: userId
  })

  orgId = test_org._id
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await closeMongoServer()
})

describe('POST /new-user', () => {
  test('create user with given data responds with a 200 status code and JSON content type', async () => {
    const response = await request(app).post('/new-user').send({
      username: 'username',
      password: 'Password',
      email: "testcreateuser@example.com"
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })

  test('create user with invalid password', async () => {
    const response = await request(app).post('/new-user').send({
      username: 'username',
      password: 'password',
      email: "testcreateuser@example.com"
    })

    expect(response.statusCode).toBe(400)
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })


  test('create user with existing email responds with a 400 status code and JSON content type', async () => {
    await request(app).post('/new-user').send({
      username: 'existinguser',
      password: 'existingPassword',
      email: 'existing@example.com'
    });

    const response = await request(app).post('/new-user').send({
      username: 'newuser',
      password: 'newPassword',
      email: 'existing@example.com'
    });

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
})

describe('POST /login',  () => {
  test('recives user credentials reponds with jsw token 200 status code and json content type', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'Password'
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveProperty('user_token');
  });

  test('fails authentication with invalid credentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'wrongpassword'
    });

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
})

describe('POST /new-org', () => {
  test('create an org, user id added like the creator and member, returns 200 status code json content type', async () => {
    const response = await request(app)
    .post('/new-org')
    .set('Authorization', `Bearer ${token}`)
    .send({
      formData: {
        name: 'maldita Org',
      }
    })

    const orgId = response.body.data
    const org = await Organization.findById(orgId)

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(org).not.toBeNull()
    expect(org.createdBy.toString()).toBe(userId.toString())
    expect(org.members.some(member => member.equals(userId))).toBe(true)
  })
})

describe('POST /new-proyect', () => {
  test('creates a proyect by authorized user, attached to an org, returns 200 status code and a data object with the proyect data', async () => {
    const currentDate = new Date()
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())

    const response = await request(app)
      .post('/new-proyect')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formData: {
          title: 'Proyecto test',
          deadline: futureDate,
          org: { _id: orgId }
        }
      })

      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toHaveProperty('data');
  
  })
})

module.exports = app
