const supertest = require('supertest')
const bcrypt = require('bcrypt')
const Note = require('../models/note')
const User = require('../models/user')

const app = require('../app')
const api = supertest(app)

const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
    },
]

const nonExistingId = async () => {
    const note = new Note({ content: 'willRemoveThisSoon', date: new Date() })

    await note.save()
    await note.remove()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})

    return notes.map((note) => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

const resetInitialUser = async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
        username: 'testuser',
        name: 'Test User',
        passwordHash,
    })

    await user.save()
}

/**
 * Efetua o login na API e retorna o token de autenticação.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha.
 * @returns {Promise<string>} - Uma promise que resolve com o token de autenticação.
 */
const login = async (username, password) => {
    const response = await api
        .post('/api/login')
        .send({ username, password })
        .expect(200)

    return response.body.token
}

module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb,
    usersInDb,
    resetInitialUser,
    login,
}
