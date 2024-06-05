const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../../index.js')
const bcrypt = require('bcryptjs')

const User = require('../../models/userModel.js')
const Organization = require('../../models/organizationModel.js')


const { beforeAll, afterAll, describe, test, expect } = require('@jest/globals')
const { initializeMongoServer, closeMongoServer } = require('../functions/mongoConfigTesting.js')
const { generateToken } = require('../../configuration/passportConfig.js')


let token
let userId
let orgId
let usertwoId

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
        createdBy: userId
    }
    })

    orgId = orgResponse.body.data
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await closeMongoServer()
})

describe('PUT /add-member-to-org', () => {
    test('adds a member not the user to an org, returns 200 status code and a data object with the org updated', async () => {  
      const response = await request(app)
        .put('/add-member-to-org')
        .set('Authorization', `Bearer ${token}`)
        .send({
          formData: {
            org: { _id: orgId },
            emailToAdd: 'test2@example.com'
          }
        })
  
        const upd_org = await Organization.findById(orgId).populate('members')
  
        expect(response.statusCode).toBe(200)
        expect(upd_org).not.toBeNull()
        expect(upd_org.members.some(member => member.user.toString() === usertwoId)).toBe(true)
    })
  })
  
  describe('PUT /give-role', () => {
    test('update role on org for a member only ceo, return 200 status code and a data object with the org updated', async () => {
      const newUser = await User.create({
        username: 'newuser',
        password: 'newPassword',
        email: 'newuser@example.com'
      })

      await request(app)
        .put('/add-member-to-org')
        .set('Authorization', `Bearer ${token}`)
        .send({
          formData: {
            org: { _id: orgId },
            emailToAdd: newUser.email
          }
        })

        const response = await request(app)
        .put('/give-role')
        .set('Authorization', `Bearer ${token}`)
        .send({
          formData: {
            org: { _id: orgId },
            user: { _id: newUser._id},
            isAdmin: true
          }
        })

        const upd_org = await Organization.findById(orgId).populate('members')

        const updatedMember = upd_org.members.find(member => member.user.equals(newUser._id))

        expect(response.statusCode).toBe(200)
        expect(upd_org).not.toBeNull()
        expect(updatedMember.admin).toBe(true)
    })
  })

  describe('POST /new-task', () => {
    test('creates task, adds to proyect s tasks returns 200 status code, a message and a data object with the task', async () => {
      
    })
  })