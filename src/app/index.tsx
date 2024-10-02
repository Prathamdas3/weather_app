import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { getWeatherData, storeData, getWeatherDataByCityName, RemoveData } from '@/libs/api';
import ShowWeather from "@/components/weatherShow";
import type { WeatherData } from "@/components/weatherShow";
import { setVisibilityAsync } from 'expo-navigation-bar';
import Dialog from "@/components/Dialog";
import { useCity } from "@/store";
import * as Network from 'expo-network';

export default function Index() {
  setVisibilityAsync("hidden")
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cities, setCities] = useState<WeatherData[]>([])
  const cityName = useCity((state) => state.cityName)
  

  const fetchData = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      console.log(await Network.getNetworkStateAsync())
      const location = await Location.getCurrentPositionAsync({});
      const data = await getWeatherData({ lat: location.coords.latitude, lon: location.coords.longitude });

      if (data) setCities(prev => [data, ...prev]);
      await storeData(JSON.stringify([data]))
    } catch (error) {
      console.log(error)
    }
  }, [setErrorMsg, setCities, getWeatherData, storeData,cityName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    (async () => {
      if (cityName) {
        const data = await getWeatherDataByCityName({ cityName })
        await RemoveData()
        if (data) setCities(prev => [...prev,data]);
        storeData(JSON.stringify(cities))
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
        data={cities}
        renderItem={useCallback(({ item }: { item: WeatherData }) => <ShowWeather weatherData={item} />, [cities])}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled
        horizontal
      />
    </SafeAreaView>
  );
}