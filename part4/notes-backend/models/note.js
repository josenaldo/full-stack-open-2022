const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    important: Boolean,
})

notesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Note', notesSchema)
