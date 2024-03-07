// AppNavigator.tsx
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ShoeShackApp from '../screens/MainApp';
import ShoeInfoScreen from '../screens/ShoeInfo';
import BuyScreen from '../screens/BuyScreen';
import Settings from '../screens/Settings';
import SellShoe from '../screens/SellIShoe';

import type {RootStackParamList} from '../types';
import {ThemeContext} from '../context/ThemeProvider';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme?.colorScheme.text,
        tabBarStyle: {
          backgroundColor: theme?.colorScheme.background,
        },
      }}>
      <Tab.Screen name="ShoeShack" component={ShoeShackApp} />
      <Tab.Screen name="SellShoe" component={SellShoe} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
const AppNavigator = () => {
  const theme = useContext(ThemeContext); // use ThemeContext

  return (
    <Stack.Navigator initialRouteName="ShoeShack">
      <Stack.Screen
        name="ShoeShack"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShoeInfo"
        component={ShoeInfoScreen}
        options={{
          headerStyle: {
            backgroundColor: theme?.colorScheme.background, // Set header background color to theme's background color
          },
          headerTintColor: theme?.colorScheme.text, // Set header text color to theme's text color
        }}
      />
      <Stack.Screen
        name="Buy"
        component={BuyScreen}
        options={{
          headerStyle: {
            backgroundColor: theme?.colorScheme.background, // Set header background color to theme's background color
          },
          headerTintColor: theme?.colorScheme.text, // Set header text color to theme's text color
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: theme?.colorScheme.background, // Set header background color to theme's background color
          },
          headerTintColor: theme?.colorScheme.text, // Set header text color to theme's text color
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
