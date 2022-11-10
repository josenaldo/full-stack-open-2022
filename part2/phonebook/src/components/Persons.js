import './Persons.css'

const Persons = ({ persons, remove }) => {
    return (
        <table cellSpacing="0" cellPadding="0">
            <tbody>
                {persons.map((person) => (
                    <tr key={person.id}>
                        <td className="person-name">{person.name}</td>
                        <td className="person-number">{person.number}</td>
                        <td className="person-delete">
                            <button onClick={() => remove(person.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export { Persons }
