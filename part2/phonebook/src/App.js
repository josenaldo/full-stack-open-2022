import { useState, useEffect } from 'react'

import {
    Filter,
    PersonForm,
    Persons,
    Notification,
    NOTIFICATION_LEVELS,
} from 'components'
import { personServices } from 'services'

import './App.css'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const [message, setMessage] = useState(null)
    const [messageTimeout, setMessageTimeout] = useState(null)

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

    const showMessage = (text, level) => {
        const message = {
            text: text,
            level: level,
            timeout: null,
        }

        if (messageTimeout) {
            clearTimeout(messageTimeout)
            setMessageTimeout(null)
        }

        setMessage(message)

        const timeout = setTimeout(() => {
            setMessage(null)
            setMessageTimeout(null)
        }, 6000)

        setMessageTimeout(timeout)
    }

    const createOrUpdate = (event) => {
        event.preventDefault()

        const person = {
            name: newName,
            number: newNumber,
        }

        const existingPerson = persons.find((p) => p.name === newName)

        if (existingPerson !== undefined) {
            update(person, existingPerson.id)
        } else {
            create(person)
        }
    }

    const create = (person) => {
        personServices.create(person).then((createdPerson) => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
        })
        showMessage(`Added ${person.name}`, NOTIFICATION_LEVELS.success)
    }

    const update = (person, id) => {
        const message = `${person.name} is already added to phonebook, replace the old number with a new one?`

        if (window.confirm(message)) {
            personServices
                .update(person, id)
                .then((updatedPerson) => {
                    setPersons(
                        persons.map((p) => (p.id === id ? updatedPerson : p))
                    )
                    setNewName('')
                    setNewNumber('')
                    showMessage(
                        `Updated ${person.name}`,
                        NOTIFICATION_LEVELS.success
                    )
                })
                .catch((error) => {
                    const message = `Information of ${person.name} has already been removed from server`
                    showMessage(message, NOTIFICATION_LEVELS.error)
                    setPersons(persons.filter((p) => p.id !== id))
                })
        }
    }

    const remove = (id) => {
        const personToRemove = persons.find((p) => p.id === id)
        const message = `Delete ${personToRemove.name}?`

        if (window.confirm(message)) {
            personServices
                .remove(id)
                .then(() => {})
                .catch((error) => {
                    const message = `Information of ${personToRemove.name} has already been removed from server`
                    showMessage(message, NOTIFICATION_LEVELS.error)
                })
            setPersons(persons.filter((p) => p.id !== id))
        }
    }

    useEffect(() => {
        personServices.getAll().then((persons) => {
            setPersons(persons)
            showMessage('Application started', NOTIFICATION_LEVELS.info)
        })
    }, [])

    return (
        <div className="App">
            <Notification message={message} />

            <h2>Phonebook</h2>
            <Filter value={search} onChange={handleSearchChange} />

            <h2>Add a new</h2>

            <PersonForm
                onSubmit={createOrUpdate}
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
