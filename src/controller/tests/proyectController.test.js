const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../../index.js')
const bcrypt = require('bcryptjs')

const User = require('../../models/userModel.js')
const Organization = require('../../models/organizationModel.js')
const Proyect = require('../../models/proyectModel.js')

const { beforeAll, afterAll, describe, test, expect } = require('@jest/globals')
const { initializeMongoServer, closeMongoServer } = require('../functions/mongoConfigTesting.js')
const { generateToken } = require('../../configuration/passportConfig.js')

let token
let userId
let orgId
let usertwoId
let proyectId
const deadline = new Date();
deadline.setMonth(deadline.getMonth() + 1)

beforeAll(async () => {
  await initializeMongoServer()

  const userResponse = await request(app)
    .post('/new-user')
    .send({
      username: 'testuser',
      password: 'Password',
      email: 'test@example.com'
    })

  const user = userResponse.body.data
  token = generateToken(user)
  userId = user._id

  const userInOrgResponse = await request(app)
    .post('/new-user')
    .send({
      username: 'testuserinorg',
      password: 'Password',
      email: 'test2@example.com'
    })

  const userInOrg = userInOrgResponse.body.data
  usertwoId = userInOrg._id

  const orgResponse = await request(app)
    .post('/new-org')
    .set('Authorization', `Bearer ${token}`)
    .send({
      formData: {
        name: 'Testo Org',
        createdBy: userId,
        deadline: deadline
    }
    })

    orgId = orgResponse.body.data._id

    const proyectResponse = await request(app)
    .post('/new-proyect')
    .set('Authorization', `Bearer ${token}`)
    .send({
        formData: {
            org: { _id: orgId },
            title: 'proyect tester',
            deadline: deadline,
            by: userId
        }
    })

    proyectId = proyectResponse.body.data._id
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await closeMongoServer()
})

describe('POST /new-task', () => {
    test('creates task, adds to proyect s tasks returns 200 status code, a message and a data object with the task', async () => {
      const response = await request(app)
      .post('/new-task')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formData: {
          org: { _id: orgId },
          proyect: { _id: proyectId},
          name: 'task tester',
          description: 'description test for test',
          deadline: deadline
        }
      })

      let proyectTested = await Proyect.findById(proyectId)

      expect(response.statusCode).toBe(200)
      expect(proyectTested.tasks.some(task => task._id.toString() === response.body.data._id)).toBe(true)
    })
  })