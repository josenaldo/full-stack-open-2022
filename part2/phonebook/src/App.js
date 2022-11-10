import { useState, useEffect } from 'react'

import { Filter, PersonForm, Persons } from 'components'
import { personServices } from 'services'

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

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const create = (event) => {
        event.preventDefault()

        const existingName = persons.find((p) => p.name === newName)

        if (existingName !== undefined) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                name: newName,
                number: newNumber,
            }

            personServices.create(person).then((createdPerson) => {
                setPersons(persons.concat(createdPerson))
                setNewName('')
                setNewNumber('')
            })
        }
    }

    const remove = (id) => {
        const personToRemove = persons.find((p) => p.id === id)
        const message = `Delete ${personToRemove.name}?`

        if (window.confirm(message)) {
            personServices.remove(id)
            setPersons(persons.filter((p) => p.id !== id))
        }
    }

    useEffect(() => {
        personServices.getAll().then((persons) => {
            setPersons(persons)
        })
    }, [])

    return (
        <div className="App">
            <h2>Phonebook</h2>
            <Filter value={search} onChange={handleSearchChange} />

            <h2>Add a new</h2>
            <PersonForm
                onSubmit={create}
                newName={newName}
                newNumber={newNumber}
                handleNewNameChange={handleNewNameChange}
                handleNewNumberChange={handleNewNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} remove={remove} />
        </div>
    )
}

export default App
