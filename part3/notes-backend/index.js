/**
 * CONFIGURATION
 */
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
morgan.token('body', (request, response) => {
    const body = request.body
    if (body) {
        return JSON.stringify(body)
    } else {
        return null
    }
})

const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.json())
app.use(
    morgan(`---
PATH: :url
METHOD: :method
STATUS: :status
RES TIME: :response-time ms
RES LENGTH: :res[content-length]
BODY: :body
---`)
)

app.use(express.static('build'))

/**
 * ROUTES
 */

app.get('/api/notes', (request, response) => {
    return Note.find({}).then((notes) => {
        response.json(notes)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        data: new Date(),
    })

    note.save().then((savedNote) => {
        response.json(savedNote)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id

    Note.findById(id)
        .then((note) => {
            response.json(note)
        })
        .catch((err) => {
            console.log('🔴', err)
            response.status(404).end()
        })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id

    Note.deleteOne({ _id: id })
        .then((result) => {
            console.log('🟢', result)
            response.status(204).end()
        })
        .catch((err) => {
            console.log('🔴', err)
            response.status(500).end()
        })
})

/**
 * SERVER
 */

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
