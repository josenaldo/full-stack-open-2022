import './App.css'
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const person = {
            name: newName,
        }

        setPersons(persons.concat(person))

        setNewName('')
    }

    return (
        <div className="App">
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Name:
                    <input
                        name="newName"
                        value={newName}
                        onChange={handleNewNameChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            <ul>
                {persons.map((person) => (
                    <li key={person.name}>{person.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
