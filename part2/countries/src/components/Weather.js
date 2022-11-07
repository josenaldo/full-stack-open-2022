import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true)

    console.log('COUNTRY', country)
    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY
            const [lat, lon] = await getCoordinates(country, apiKey)

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

            axios.get(url).then((response) => {
                setWeather(response.data)
                setLoading(false)
            })
        }

        fetchWeather()
    }, [country])

    const getCoordinates = async (country, apiKey) => {
        if (country.capitalInfo.latlng) {
            return country.capitalInfo.latlng
        } else {
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${apiKey}`

            const { data } = await axios.get(url)

            return [data[0].lat, data[0].lon]
        }
    }

    return (
        <div>
            <h2>Weather in {country.capital}</h2>

            {loading && <p>Loading...</p>}

            {!loading && (
                <div>
                    <p>
                        <strong>Temperature:</strong> {weather.main.temp}{' '}
                        Celsius
                    </p>

                    <img
                        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                    />

                    <p>
                        <strong>Wind:</strong> {weather.wind.speed} m/s
                    </p>
                </div>
            )}
        </div>
    )
}

export { Weather }
