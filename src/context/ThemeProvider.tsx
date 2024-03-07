// ThemeProvider.tsx
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ColorScheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  white: string;
  modalBackground: string;
  shadow: string;
};

type ThemeContextType = {
  colorScheme: ColorScheme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      setIsDarkMode(storedTheme === 'dark' ? true : false);
    };

    loadTheme();
  }, []);

  const toggleDarkMode = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Save theme to AsyncStorage
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const colorScheme = isDarkMode
    ? {
        primary: '#BB86FC',
        secondary: '#3F51B5',
        background: '#282c34',
        text: '#abb2bf',
        white: '#f9fafb',
        modalBackground: '#32383e',
        shadow: '#d4d4d4',
      }
    : {
        primary: '#3F51B5',
        secondary: '#03A9F4',
        background: '#fff',
        text: '#333',
        white: '#fff',
        modalBackground: '#fff',
        shadow: '#000',
      };

  return (
    <ThemeContext.Provider value={{colorScheme, isDarkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
