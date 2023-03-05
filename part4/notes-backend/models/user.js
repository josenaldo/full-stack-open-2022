const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    passwordHash: String,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()

        delete returnObject._id
        delete returnObject.__v
        // the passwordHash should not be revealed
        delete returnObject.passwordHash
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
