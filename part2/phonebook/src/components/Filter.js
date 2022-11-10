import { Input } from 'components'

const Filter = ({ value, onChange }) => {
    return (
        <Input
            label="Filter shown with"
            name="search"
            value={value}
            onChange={onChange}
        />
    )
}

export { Filter }
