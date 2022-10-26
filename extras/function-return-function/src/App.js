import { useState } from 'react'

function App() {
    const [message, setMessage] = useState('')

    const people = [
        { name: 'John', age: 20 },
        { name: 'Bob', age: 30 },
        { name: 'Alice', age: 40 },
        { name: 'Jane', age: 50 },
    ]

    const hello = (person) => () =>
        setMessage(
            `Hi! My name is ${person.name} and I am ${person.age} years old.`
        )

    return (
        <div>
            <h1>Function Return Function</h1>
            {people.map((person) => {
                return (
                    <div key={person.name}>
                        <button onClick={hello(person)}>
                            Say Hello to {person.name}
                        </button>
                    </div>
                )
            })}

            <h2>{message}</h2>
        </div>
    )
}

export default App
