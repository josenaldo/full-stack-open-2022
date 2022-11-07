import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, PersonForm, Persons } from './components'

import './App.css'

const App = () => {
    const [persons, setPersons] = useState([])

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

    const fetchPersons = () => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons(response.data)
        })
    }

    useEffect(fetchPersons, [])

    return (
        <div className="App">
            <h2>Phonebook</h2>
            <Filter value={search} onChange={handleSearchChange} />

            <h2>Add a new</h2>
            <PersonForm
                onSubmit={handleSubmit}
                newName={newName}
                newNumber={newNumber}
                handleNewNameChange={handleNewNameChange}
                handleNewNumberChange={handleNewNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App
