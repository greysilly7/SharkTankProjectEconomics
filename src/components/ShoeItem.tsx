// ShoeItem.tsx
import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList, Shoe} from '../types';
import {ThemeContext} from '../context/ThemeProvider';

type ShoeItemProps = {
  shoe: Shoe;
};

type ShoeInfoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ShoeInfo'
>;

const ShoeItem: React.FC<ShoeItemProps> = ({shoe}) => {
  const navigation = useNavigation<ShoeInfoNavigationProp>();
  const theme = useContext(ThemeContext); // use ThemeContext

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme?.colorScheme.background,
          shadowColor: theme?.colorScheme.shadow,
        },
      ]}
      onPress={() => navigation.navigate('ShoeInfo', {shoe})}>
      <Image source={{uri: shoe.image}} style={styles.image} />
      <Text style={[styles.text, {color: theme?.colorScheme.text}]}>
        {shoe.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoeItem;
