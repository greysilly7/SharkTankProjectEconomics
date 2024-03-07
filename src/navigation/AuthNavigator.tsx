// AuthNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../screens/Auth';

import type {RootStackParamList} from '../types';
const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Auth">
    <Stack.Screen name="Auth" component={Auth} />
  </Stack.Navigator>
);

export default AuthNavigator;
