// Auth.tsx
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {RootStackParamList} from '../types';
import {ThemeContext} from '../context/ThemeProvider';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Auth = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('ShoeShack');
    } catch (err) {
      setErrorMessage('Failed to sign in. Please check your credentials.');
    }
    setLoading(false);
  };

  const register = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('ShoeShack');
    } catch (err) {
      setErrorMessage('Failed to register. Please check your details.');
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password reset email sent!');
    } catch (err) {
      setErrorMessage(
        'Failed to send password reset email. Please check your email.',
      );
    }
  };

  const theme = useContext(ThemeContext); // use ThemeContext

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme?.colorScheme.background},
      ]}>
      <Text style={[styles.welcomeText, {color: theme?.colorScheme.text}]}>
        Welcome to ShoeShack!
      </Text>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme?.colorScheme.text,
            color: theme?.colorScheme.text,
          },
        ]} // Set color to theme's text color
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={theme?.colorScheme.text}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme?.colorScheme.text,
            color: theme?.colorScheme.text,
          },
        ]} // Set color to theme's text color
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={theme?.colorScheme.text}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          color={theme?.colorScheme.primary} // Use primary color from theme
          onPress={signIn}
        />
        <Button
          title="Register"
          color={theme?.colorScheme.primary} // Use secondary color from theme
          onPress={register}
        />
      </View>
      {loading && (
        <ActivityIndicator size="large" color={theme?.colorScheme.primary} />
      )}
      <View style={styles.forgotPasswordButton}>
        <Button
          title="Forgot Password"
          color={theme?.colorScheme.text} // Use text color from theme
          onPress={handleForgotPassword}
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  forgotPasswordButton: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
});

export default Auth;
