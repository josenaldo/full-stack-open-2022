import './Countries.css'
import { Country } from './Country'

const Countries = ({ countries }) => {
    return (
        <div className="countries">
            {countries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {countries.length <= 10 && countries.length > 1 && (
                <div>
                    {countries.map((country) => (
                        <div key={country.cca3}>{country.name.common}</div>
                    ))}
                </div>
            )}

            {countries.length === 1 && <Country country={countries[0]} />}

            {countries.length === 0 && <p>No matches</p>}
        </div>
    )
}

export { Countries }
