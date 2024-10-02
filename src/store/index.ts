import { useColorScheme, Appearance } from "react-native";
import { create } from 'zustand';

type ThemeStore = {
    theme: 'dark' | 'light' | string;
    changeTheme: () => void;
};

type CityStore = {
    cityName: string,
    addCity: (cityName: string) => void
}

type Modal = {
    modalVisible: boolean,
    setModalVisible: () => void
}

// export const useChangeColorTheme = create<ThemeStore>((set) => ({
//     theme: useColorScheme() as string,
//     changeTheme: () => set((state) => {
//         const newScheme = state.theme === 'dark' ? 'light' : 'dark';
//         Appearance.setColorScheme(newScheme);
//         return { theme: newScheme }
//     })
// }));

export const useCity = create<CityStore>((set) => ({
    cityName: '',
    addCity: (city: string) => set((state) => ({ cityName: city }))
}))

export const useModal = create<Modal>((set) => ({
    modalVisible: false,
    setModalVisible: () => set((state) => ({ modalVisible: !state.modalVisible })),
}))