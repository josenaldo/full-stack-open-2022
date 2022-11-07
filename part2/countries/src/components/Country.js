import { Weather } from 'components'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <strong>Languages:</strong>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>

            <img src={country.flags.png} alt="Flag" width="200" />

            <Weather country={country} />
        </div>
    )
}

export { Country }
