import { View, TouchableOpacity, } from 'react-native'
import { Moon, Sun, Plus } from 'lucide-react-native'
import { useModal,useChangeColorTheme } from '@/store'


export default function Navbar() {
    const theme = useChangeColorTheme((state) => state.theme)
    const setTheme = useChangeColorTheme((state) => state.changeTheme)
    const setModalVisible=useModal((state)=>state.setModalVisible)
    


    return <View className='flex flex-row items-center gap-3'>
        <TouchableOpacity className={`border rounded-md ${theme == 'light' ? 'border-black' : 'border-white'} `} onPress={setModalVisible}>
            <Plus size={22} color={theme == 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
        <View>{theme === 'dark' ?
            <TouchableOpacity accessibilityRole='button' onPress={setTheme}>
                <Sun size={22} color={theme == 'dark' ? 'white' : 'black'}  />
            </TouchableOpacity> :
            <TouchableOpacity accessibilityRole='button' onPress={setTheme}>
                <Moon size={22} color={theme == 'dark' ? 'white' : 'black'}  />
            </TouchableOpacity>}
        </View>
    </View>

}