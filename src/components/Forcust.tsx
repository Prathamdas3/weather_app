import { View, Text, Image, StyleSheet } from 'react-native'

export default function ForcustItem({ data }: { data: any }) {
    const t = new Date(data.dt_txt)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (<View className='flex flex-row justify-between items-center'>
        <View className='flex flex-row items-center'>
            <Image src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                style={styles.image}
                alt={data.weather[0].description}
            />
            <View>
                <Text>{days[t.getDay()]}</Text>
                <Text>{t.getDate()}/{t.getMonth()}/{t.getFullYear()}({t.getHours()} {t.getHours() >= 12 ? 'PM' : 'AM'})</Text>
            </View>
        </View>

        <View className='flex items-center'>
            <Text>{data.main.temp}{'\u00B0'}C</Text>
            <Text>{data.weather[0].main}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
        resizeMode: 'cover'
    },
    name: {
        letterSpacing: 4
    }
})
