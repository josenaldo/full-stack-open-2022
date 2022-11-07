import { useState, useEffect } from 'react'
import { Input, Countries } from './components'
import axios from 'axios'

import './App.css'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const fetchCountries = () => {
        axios.get('https://restcountries.com/v3.1/all').then((response) => {
            setCountries(response.data)
        })
    }

    useEffect(fetchCountries, [])

    const filteredCountries = filter
        ? countries.filter((country) => {
              const countryName = country.name.common.toLowerCase()
              return countryName.includes(filter.toLowerCase())
          })
        : countries

    return (
        <div className="App">
            <div class="wrapper">
                <Input
                    label="Find countries"
                    name="filter"
                    value={filter}
                    onChange={handleFilterChange}
                />
                {filter && <Countries countries={filteredCountries} />}
            </div>
        </div>
    )
}

export default App
