import { View, Text } from 'react-native'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getWeatherDataByCityName } from '@/libs/api'


export default function weatherData({ cityName }: { cityName: string }) {
    const [weatherData, setWeatherData] = useState<string>('')

    const { data, isLoading, error } = useQuery({ queryKey: ["cityWeatherData", cityName], queryFn: async () => await getWeatherDataByCityName({ cityName }), enabled: !!cityName })

    useEffect(() => {
        setWeatherData(JSON.stringify(data))
    }, [data])

    if (error) {
        return <View>
            <Text>{error.message}</Text>
        </View>
    }

    return (<View>
        {
            isLoading ? <Text>Getting your weather data</Text> : <Text>{weatherData}</Text>
        }
    </View>)
}