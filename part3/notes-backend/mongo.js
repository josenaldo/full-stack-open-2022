const mongoose = require('mongoose')

if (process.env.length > 3) {
    console.log(
        'please provide the password as an argument: node mongo.js <password>'
    )

    process.exit(1)
}

const getUrl = () => {
    const password = encodeURIComponent(process.argv[2])
    const user = 'fullstack'
    const cluster = 'cluster-fs0-2022-notes.kh7dd2q.mongodb.net'
    const database = 'notesApp'
    const url = `mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`

    return url
}

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const find = () => {
    mongoose
        .connect(getUrl())
        .then((result) => {
            Note.find({ important: true })
                .then((result) => {
                    console.log('🔴 F: mongo.js | L: 31 | Result:', result)
                })
                .catch((err) => {})
                .finally(() => {
                    mongoose.connection.close()
                })
        })
        .catch((err) => {})
}

const create = (noteContent) => {
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
            content:
                'GET and POST are the most important methods of HTTP protocol',
            date: new Date(),
            important: true,
        },
        {
            content: noteContent,
            date: new Date(),
            important: true,
        },
    ]

    mongoose
        .connect(getUrl())
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
            console.log(
                '🔴 | file: mongo.js | line 60 | Erro ao conectar',
                error
            )
        })
}

const main = () => {
    if (process.argv.length < 3) {
        console.log(
            'please provide the password as an argument: node mongo.js <password>'
        )

        process.exit(1)
    }

    if (process.argv.length === 3) {
        find()
    }

    if (process.argv.length === 4) {
        create(process.argv[3])
    }

    if (process.argv.length > 4) {
        console.log('Too many arguments')
    }
}

main()
