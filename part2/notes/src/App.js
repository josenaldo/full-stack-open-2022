import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from 'components/Note'
import noteService from 'services/notes'

import './App.css'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date(),
            important: Math.random() < 0.5,
        }

        noteService.create(noteObject).then((response) => {
            const createdNote = response.data
            setNotes(notes.concat(createdNote))
            setNewNote('')
        })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id)
        const changeNote = { ...note, important: !note.important }

        noteService.update(id, changeNote).then((response) => {
            setNotes(notes.map((n) => (n.id !== id ? n : response.data)))
        })
    }

    const hook = () => {
        noteService.getAll().then((response) => {
            setNotes(response.data)
        })
    }

    useEffect(hook, [])

    return (
        <div className="App">
            <h1>Notes</h1>
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
