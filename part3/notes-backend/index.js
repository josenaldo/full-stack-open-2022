const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

const getUrl = () => {
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
    console.log('🔴 | file: index.js | line 9 | getUrl | password', password)

    const user = 'fullstack'
    const cluster = 'cluster-fs0-2022-notes.kh7dd2q.mongodb.net'
    const database = 'notesApp'
    const url = `mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`

    return url
}

mongoose.connect(getUrl())

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Note = mongoose.model('Note', noteSchema)

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0

    return maxId + 1
}

const requestLogger = (request, response, next) => {
    console.log('🟢 New Reques incoming!')
    console.log('---')
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.get('/api/notes', (request, response) => {
    return Note.find({}).then((notes) => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)

    const note = notes.find((note) => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter((note) => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = {
        id: generateId(),
        content: body.content,
        data: new Date(),
        important: body.important || false,
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
