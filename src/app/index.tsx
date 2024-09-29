import { Text, View, SafeAreaView, Image, StyleSheet, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { getWeatherData, storeData,getData } from '@/libs/api'
// import PagerView from 'react-native-pager-view';
// import { DialogDemo } from "../components/Dialog";
import ForcustItem from "@/components/Forcust";
console.log(getData())

export default function Index() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<{ weather: any, forcust: any } | undefined>(undefined)

  const cityNames = ['']


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const data = await getWeatherData({ lat: location.coords.latitude, lon: location.coords.longitude })

      setWeatherData(data)
      cityNames[0]=data?.weather.name
      await storeData(JSON.stringify(cityNames))
    })();
  }, []);


  if (errorMsg) {
    return <View><Text>{errorMsg}</Text></View>
  }

  return (
    <SafeAreaView className="bg-red-400 flex h-full justify-center">
      <View className="flex items-center ">
        <View className="flex flex-row items-center" >
          <Image src={`https://openweathermap.org/img/wn/${weatherData?.weather.weather[0].icon}@2x.png`}
            style={styles.image}
          />
          <Text className="text-3xl font-semibold">{weatherData?.weather.weather[0].main}</Text>
        </View>
        <Text className="text-5xl font-bold text-center font-mono tracking-tighter mb-2" style={styles.name}>{weatherData?.weather.name}</Text>
        <Text className="text-2xl font-normal "><Text className="font-bold">Temp:</Text> {weatherData?.weather.main.temp}{'\u00B0'}C</Text>
      </View>
      <FlatList data={weatherData?.forcust.list} renderItem={({ item }) => <ForcustItem data={item} />} keyExtractor={item => item.dt} className="bg-red-500 rounded-t-xl p-4 pb-44" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover'
  },
  name: {
    letterSpacing: 4
  }
})



{/* <FlatList data={dummyData} renderItem={({ item }) => { <View></View> }} horizontal /> */ }
{/* <PagerView initialPage={2}>
        <View key={1}>
          <Text>Hello 1</Text>
        </View>
        <View key={2}>
          <Text>Hello 2</Text>
        </View>
        <View key={3}>
          <Text>Hello 3</Text>
        </View>
      </PagerView> */}
{/* <TextInput value={cityName} onChangeText={setCityName} placeholder="kolkata" className="" style={styles.input} />
      <Text>{text}</Text>
      <DialogDemo /> */}