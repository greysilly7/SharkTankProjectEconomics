// ShoeInfoScreen.tsx
import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {ThemeContext} from '../context/ThemeProvider'; // import ThemeContext

type ShoeInfoScreenProps = {
  route: RouteProp<RootStackParamList, 'ShoeInfo'>;
};

const ShoeInfoScreen = ({route}: ShoeInfoScreenProps) => {
  const {shoe} = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useContext(ThemeContext); // use ThemeContext

  const handleBuyButtonPress = () => {
    // Navigate to the Buy screen with the current shoe as a parameter
    navigation.navigate('Buy', {shoe});
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme?.colorScheme.background},
      ]}>
      <Image source={{uri: shoe.image}} style={styles.image} />
      <Text style={[styles.name, {color: theme?.colorScheme.text}]}>
        {shoe.name}
      </Text>
      <Text
        style={[
          styles.price,
          {color: theme?.colorScheme.secondary},
        ]}>{`$${shoe.price}`}</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme?.colorScheme.primary}]}
        onPress={handleBuyButtonPress}>
        <Text style={[styles.buttonText, {color: theme?.colorScheme.white}]}>
          Buy
        </Text>
      </TouchableOpacity>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default ShoeInfoScreen;
