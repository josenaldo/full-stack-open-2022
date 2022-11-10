import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from 'components/Note'
import Notification from 'components/Notification'
import noteService from 'services/notes'

import './App.css'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes)
        })
    }, [])

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id)
        const changeNote = { ...note, important: !note.important }

        noteService
            .update(id, changeNote)
            .then((returnedNote) => {
                setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
            })
            .catch((error) => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )

                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)

                setNotes(notes.filter((n) => n.id !== id))
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() < 0.5,
        }

        noteService.create(noteObject).then((returnedNote) => {
            const createdNote = returnedNote
            setNotes(notes.concat(createdNote))
            setNewNote('')
        })
    }

    return (
        <div className="App">
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
