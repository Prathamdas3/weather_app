import { View, Text, FlatList, Image, StyleSheet } from "react-native"
import ForcustItem from "@/components/Forcust";
import { useChangeColorTheme } from '@/store';

export type WeatherData = {
    weather: {
        weather: { icon: string; main: string }[];
        name: string;
        main: { temp: number };
    };
    forcust: { list: { dt: string }[] };
}

export default function ShowWeather({ weatherData }: { weatherData: WeatherData }) {
    const colorScheme=useChangeColorTheme((state)=>state.theme)
    if (!weatherData.forcust.list.length) return <View><Text>Hellow t</Text></View>

    return (<View className=" w-screen flex justify-center ">
        <View className="flex items-center h-[45%] justify-center">
            <View className="flex flex-row items-center" >
                <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherData?.weather.weather[0].icon}@2x.png` }}
                    style={styles.image}
                />
            </View>
            <Text className={`text-5xl font-bold text-center font-mono tracking-tighter mb-2 text-${colorScheme == 'dark' ? 'white' : 'black'}`} style={styles.name}>{weatherData?.weather.name}</Text>
            <Text className={`text-${colorScheme == 'dark' ? 'white' : 'black'} text-2xl font-normal`}> {weatherData?.weather?.main?.temp ?? 'N/A'}{'\u00B0'}C</Text>
        </View>

        <FlatList data={weatherData?.forcust.list ?? []} renderItem={({ item }) => <ForcustItem data={item} />} keyExtractor={item => item.dt} className="  p-4" scrollEnabled />

    </View>)
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        resizeMode: 'cover'
    },
    name: {
        letterSpacing: 4
    },
})