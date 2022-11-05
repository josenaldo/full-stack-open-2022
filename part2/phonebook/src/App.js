import './App.css'
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
        { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
        { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const personsToShow = search
        ? persons.filter((person) =>
              person.name.toLowerCase().includes(search.toLowerCase())
          )
        : persons

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const existingName = persons.find((person) => person.name === newName)

        if (existingName !== undefined) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                id: persons.length + 1,
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
            <div className="field">
                <label>Filter show with:</label>
                <input
                    name="search"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <h2>Add a new</h2>
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
                {personsToShow.map((person) => (
                    <li key={person.id}>
                        {person.name} - {person.number}{' '}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
