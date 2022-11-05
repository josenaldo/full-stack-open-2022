import './Input.css'

const Input = ({ label, name, value, onChange }) => {
    return (
        <div className="field">
            <label>{label}:</label>
            <input name={name} value={value} onChange={onChange} />
        </div>
    )
}

export { Input }
