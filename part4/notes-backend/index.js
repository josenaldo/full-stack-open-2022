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

const morganTemplate = `---
PATH: :url
METHOD: :method
STATUS: :status
RES TIME: :response-time ms
RES LENGTH: :res[content-length]
BODY: :body
---`

const Note = require('./models/note')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(morganTemplate))

/**
 * ROUTES
 */

app.get('/api/notes', (request, response) => {
    return Note.find({}).then((notes) => {
        response.json(notes)
    })
})

app.post('/api/notes', (request, response, next) => {
    const { content, important } = request.body

    const note = new Note({
        content: content,
        important: important || false,
        date: new Date(),
    })

    note.save()
        .then((savedNote) => {
            response.json(savedNote)
        })
        .catch((error) => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id

    Note.findById(id)
        .then((note) => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch((err) => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id

    Note.findByIdAndRemove(id)
        .then((result) => {
            console.log('🟢', result)
            response.status(204).end()
        })
        .catch((err) => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    const note = {
        content,
        important,
    }

    Note.findByIdAndUpdate(request.params.id, note, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedNote) => {
            response.json(updatedNote)
        })
        .catch((err) => next(err))
})

/**
 * ERROR HANDLING
 */

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
    console.error('🔴', error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

/**
 * SERVER
 */

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
