import { Input } from 'components'
import './PersonForm.css'

const PersonForm = ({
    onSubmit,
    newName,
    newNumber,
    handleNewNameChange,
    handleNewNumberChange,
}) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            <Input
                label="Name"
                name="name"
                value={newName}
                onChange={handleNewNameChange}
            />
            <Input
                label="Number"
                name="number"
                value={newNumber}
                onChange={handleNewNumberChange}
            />
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export { PersonForm }
