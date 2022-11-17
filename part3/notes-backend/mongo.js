const mongoose = require('mongoose')

if (process.env.length > 3) {
    console.log(
        'please provide the password as an argument: node mongo.js <password>'
    )

    process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const user = 'fullstack'
const cluster = 'cluster-fs0-2022-notes.kh7dd2q.mongodb.net'
const database = 'notesApp'
const url = `mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

let notes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: true,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: false,
    },
    {
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: new Date(),
        important: true,
    },
]

mongoose
    .connect(url)
    .then((result) => {
        console.log('🔴 | file: mongo.js | line 44 | Conectado')

        Note.insertMany(notes)
            .then((result) => {
                console.log('🔴 | file: mongo.js | line 48 | Notas salvas')
            })
            .catch((error) => {
                console.log('🔴 | file: mongo.js | line 51 | Erro', error)
            })
            .finally(() => {
                console.log('🔴 | file: mongo.js | line 54 | Encerrando')

                return mongoose.connection.close()
            })
    })
    .catch((error) => {
        console.log('🔴 | file: mongo.js | line 60 | Erro ao conectar', error)
    })
