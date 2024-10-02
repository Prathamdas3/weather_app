import { View, TouchableOpacity,useColorScheme } from 'react-native'
import { Moon, Sun, Plus } from 'lucide-react-native'
import { useModal } from '@/store'


export default function Navbar() {
    // const theme = useChangeColorTheme((state) => state.theme)
    // const setTheme = useChangeColorTheme((state) => state.changeTheme)
    const setModalVisible=useModal((state)=>state.setModalVisible)
    const theme=useColorScheme()


    return <View className='flex flex-row items-center gap-3'>
        <TouchableOpacity className={`border rounded-md border-${theme == 'dark' ? 'white' : 'black'} `} onPress={setModalVisible}>
            <Plus size={22} color={theme == 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
        <View>{theme === 'dark' ?
            <TouchableOpacity accessibilityRole='button'>
                <Sun size={22} color="white" />
            </TouchableOpacity> :
            <TouchableOpacity accessibilityRole='button' >
                <Moon size={22} color="black" />
            </TouchableOpacity>}
        </View>
    </View>

}