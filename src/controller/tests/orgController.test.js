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

beforeAll(async () => {
  await initializeMongoServer()

  const user = await User.create({
    username: 'testuser',
    password: await bcrypt.hash('Password', 10),
    email: 'test@example.com'
  })
  token = generateToken(user)
  userId = user._id

  const userInOrg = await User.create({
    username: 'testuserinorg',
    password: await bcrypt.hash('Password', 10),
    email: 'test2@example.com'
  })

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

describe('PUT /add-member-to-org', () => {
    test('adds a member not the user to an org, returns 200 status code and a data object with the org updated', async () => {
      const newUser = await User.create({
        username: 'newuser',
        password: 'newPassword',
        email: 'newuser@example.com'
      })
  
      const response = await request(app)
        .put('/add-member-to-org')
        .set('Authorization', `Bearer ${token}`)
        .send({
          formData: {
            org: { _id: orgId },
            emailToAdd: newUser.email
          }
        })
  
        const upd_org = await Organization.findById(orgId).populate('members')

        console.log(upd_org)
  
        expect(response.statusCode).toBe(200)
        expect(upd_org).not.toBeNull()
        expect(upd_org.members.some(member => member.email === newUser.email)).toBe(true)
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

        console.log(newUser._id)
        const upd_org = await Organization.findById(orgId).populate('members')
        console.log(upd_org)

        const updatedMember = upd_org.members.find(member => member._id.equals(newUser._id))

        console.log(updatedMember)

        expect(response.statusCode).toBe(200)
        expect(upd_org).not.toBeNull()
        expect(updatedMember.admin).toBe(true)
    })
  })