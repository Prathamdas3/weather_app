import { Text, View, SafeAreaView, FlatList,useColorScheme } from "react-native";
import { useState, useEffect, useCallback, memo } from 'react';
import * as Location from 'expo-location';
import { getWeatherData, storeData, getWeatherDataByCityName, getData } from '@/libs/api';
import ShowWeather from "@/components/weatherShow";
import type { WeatherData } from "@/components/weatherShow";
import { setVisibilityAsync } from 'expo-navigation-bar';
import Dialog from "@/components/Dialog";
import { useCity,useChangeColorTheme } from "@/store";
import * as Network from 'expo-network';


const MemoizedShowWeather = memo(ShowWeather);

export default function Index() {
  setVisibilityAsync("hidden")
  const colorScheme=useColorScheme()
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cities, setCities] = useState<WeatherData[]>([])
  const cityName = useCity((state) => state.cityName)
  const [isConnected, setIsConnect] = useState<boolean>(true)
  const [offlineData, setOfflineData] = useState<WeatherData[]>([])

  const setTheme = useChangeColorTheme(state => state.setTheme)
  

  const fetchData = useCallback(async () => {
    try {
      setTheme(colorScheme as string)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const isConnection = await Network.getNetworkStateAsync()
      setIsConnect(isConnection.isConnected as boolean)


      const location = await Location.getCurrentPositionAsync({});
      const data = await getWeatherData({ lat: location.coords.latitude, lon: location.coords.longitude });

      if (data) {
        setCities(prev => [data, ...prev]);
        await storeData(JSON.stringify([data]))
      }
      setOfflineData(await getData())
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    (async () => {
      if (cityName) {
        const data = await getWeatherDataByCityName({ cityName })
        // await RemoveData()
        if (data) {
          setCities(prev => [...prev, data]);
          storeData(JSON.stringify(cities))
        }

      }
    })()
  }, [cityName])

  if (errorMsg) {
    return <View><Text>{errorMsg}</Text></View>;
  }

  return (
    <SafeAreaView className="flex justify-center">
      <Dialog />
      <FlatList
        data={isConnected ? cities : offlineData}
        renderItem={({ item }: { item: WeatherData }) => <MemoizedShowWeather weatherData={item} />}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled
        horizontal
      />
    </SafeAreaView>
  );
}