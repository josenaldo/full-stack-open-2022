import './Persons.css'

const Persons = ({ persons }) => {
    return (
        <table cellspacing="0" cellpadding="0">
            <tbody>
                {persons.map((person) => (
                    <tr key={person.id}>
                        <td className="person-name">{person.name}</td>
                        <td className="person-number">{person.number}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export { Persons }
