import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getWeatherData({ lat, lon }: { lat: number, lon: number }) {
    try {
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`)
        const forcust = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`)
        return { weather: weather.data, forcust: forcust.data }
    } catch (error) {
        console.log(error)
    }
}

export async function getWeatherDataByCityName({ cityName }: { cityName: string }) {
    try {
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`)
        const forcust = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`)
        return { weather: weather.data, forcust: forcust.data }
    } catch (error) {
        console.log(error)
    }
}

export async function getData() {
    try {
        const data = await AsyncStorage.getItem('cities')
       
        if (data !== null) {
            return JSON.parse(data)
        }
        return 'No city was stored previously'
    } catch (error) {
        console.log(error)
    }
}

export async function storeData(value: string) {
    try {
        await AsyncStorage.setItem('cities', value)
    } catch (error) {
        console.log(error)
    }
}

export async function RemoveData(){
    try{
        await AsyncStorage.removeItem('cities')
    }catch(error){
        console.log(error)
    }
}