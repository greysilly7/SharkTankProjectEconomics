// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from '../navigation/AppNavigator';
import AuthNavigator from '../navigation/AuthNavigator';
import useAuth from '../hooks/useAuth';
import ThemeProvider from '../context/ThemeProvider';

const App = () => {
  const {initializing, user} = useAuth();

  if (initializing) {
    return null; // or a loading spinner
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
