const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when doing a login', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'testuser',
            name: 'Test User',
            passwordHash,
        })

        await user.save()
    })

    it('should return a token and user information if the username and password are correct', async () => {
        const authData = { username: 'testuser', password: 'sekret' }

        await api
            .post('/api/login')
            .send(authData)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body).toHaveProperty('token')
                expect(res.body).toHaveProperty('username', 'testuser')
                expect(res.body).toHaveProperty('name', 'Test User')
            })
    })

    it('should return an error if the username is incorrect', async () => {
        const authData = { username: 'wrongusername', password: 'sekret' }

        await api
            .post('/api/login')
            .send(authData)
            .expect(401)
            .expect((res) => {
                expect(res.body).toHaveProperty(
                    'error',
                    'invalid username or password'
                )
            })
    })

    it('should return an error if the password is incorrect', async () => {
        const authData = { username: 'testuser', password: 'wrongpassword' }

        await api
            .post('/api/login')
            .send(authData)
            .expect(401)
            .expect((res) => {
                expect(res.body).toHaveProperty(
                    'error',
                    'invalid username or password'
                )
            })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
