// Settings.tsx
import React, {useContext} from 'react';
import {View, Button, StyleSheet, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ThemeContext} from '../context/ThemeProvider'; // import ThemeContext

const Settings = () => {
  const theme = useContext(ThemeContext); // use ThemeContext

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (err) {
      Alert.alert('Failed to sign out: ' + err);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme?.colorScheme.background},
      ]}>
      <Text style={[styles.title, {color: theme?.colorScheme.text}]}>
        Settings
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Toggle Theme"
          onPress={theme?.toggleDarkMode}
          color={theme?.colorScheme.primary}
        />
        <View style={styles.space} />
        <Button
          title="Logout"
          onPress={handleLogout}
          color={theme?.colorScheme.secondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
  },
  space: {
    height: 15,
  },
});

export default Settings;
