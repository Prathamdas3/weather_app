import { Appearance } from "react-native";
import { create } from 'zustand';

type ThemeStore = {
    theme: 'dark' | 'light'|string;
    changeTheme: () => void;
    setTheme:(theme:string)=>void
};

type CityStore = {
    cityName: string,
    addCity: (cityName: string) => void
}

type Modal = {
    modalVisible: boolean,
    setModalVisible: () => void
}

export const useChangeColorTheme = create<ThemeStore>((set) => ({
    theme: '',
    setTheme:(t:string)=>set((state)=>({theme:t})),
    changeTheme: () => set((state) => {

        if (state.theme == 'dark') {
            Appearance.setColorScheme('light');
            return { theme: 'light' }
        } else {
            Appearance.setColorScheme('dark');
            return { theme: 'dark' }
        }

    }),
    
}));

export const useCity = create<CityStore>((set) => ({
    cityName: '',
    addCity: (city: string) => set((state) => ({ cityName: city }))
}))

export const useModal = create<Modal>((set) => ({
    modalVisible: false,
    setModalVisible: () => set((state) => ({ modalVisible: !state.modalVisible })),
}))