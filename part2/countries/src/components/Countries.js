import { useState, useEffect } from 'react'
import { Country } from 'components'

import './Countries.css'

const Countries = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        if (countries.length === 1) {
            setSelectedCountry(countries[0])
        } else {
            setSelectedCountry(null)
        }
    }, [countries])

    return (
        <div className="countries">
            {countries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {countries.length <= 10 && countries.length > 1 && (
                <div>
                    {countries.map((country) => (
                        <div key={country.cca3}>
                            {country.name.common}{' '}
                            <button
                                onClick={() => {
                                    setSelectedCountry(country)
                                }}
                            >
                                show
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedCountry && <Country country={selectedCountry} />}

            {countries.length === 0 && <p>No matches</p>}
        </div>
    )
}

export { Countries }
