import './App.css'
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '34-8598-4587' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const existingName = persons.find((person) => person.name === newName)

        if (existingName !== undefined) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                name: newName,
                number: newNumber,
            }

            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div className="App">
            <h2>Phonebook</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name:</label>
                    <input
                        name="newName"
                        value={newName}
                        onChange={handleNewNameChange}
                    />
                </div>
                <div className="field">
                    <label>Number:</label>
                    <input
                        name="number"
                        value={newNumber}
                        onChange={handleNewNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            <ul>
                {persons.map((person) => (
                    <li key={person.name}>
                        {person.name} - {person.number}{' '}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
