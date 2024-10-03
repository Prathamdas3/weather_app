import { useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text } from 'react-native'
import { useCity, useModal } from '@/store';

export default function Dialog() {
  const modalVisible = useModal((state) => state.modalVisible)
  const setModalVisible = useModal((state) => state.setModalVisible)
  const [value, setValue] = useState<string>('')
  const setCity = useCity((state) => state.addCity)
  
 
  const onPress=()=>{
    if(value.length>0){
      setCity(value)
      setModalVisible()
      setValue('')
    }
  }


  return <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    statusBarTranslucent={true}
    onRequestClose={() => {
      setModalVisible();
    }}
  >
    <View className='flex justify-center h-screen '>
      <View className='bg-white p-4 mx-3 rounded-xl blur-2xl'>

        <View className='m-4 space-y-2'>
          <TextInput value={value} onChangeText={setValue} className='mb-4 h-13  border p-3  rounded-lg' placeholder='Add city name to check weather' />
          <TouchableOpacity onPress={onPress } accessibilityRole='button' className='flex flex-row justify-center p-3 bg-green-500 rounded-xl'><Text className='font-semibold text-xl text-white'>Submit</Text></TouchableOpacity>
          <TouchableOpacity accessibilityRole='button' className='flex flex-row justify-center p-3 bg-red-500 rounded-xl' onPress={setModalVisible}><Text className='font-semibold text-xl text-white'>Close</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>

}

