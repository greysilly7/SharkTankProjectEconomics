// MainApp.tsx
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from '@rneui/themed';
import ShoeList from '../components/ShoeList';
import shoes from '../data/shoes';
import {ThemeContext} from '../context/ThemeProvider'; // import ThemeContext

const ShoeShackApp = () => {
  const [search, setSearch] = React.useState('');
  const theme = useContext(ThemeContext); // use ThemeContext

  const filteredShoes = shoes.filter(shoe =>
    shoe.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme?.colorScheme.background},
      ]}>
      <SearchBar
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        containerStyle={[
          styles.searchBarContainer,
          {backgroundColor: theme?.colorScheme.background},
        ]}
        inputContainerStyle={[
          styles.searchBarInputContainer,
          styles.bubbleSearchBar,
          {backgroundColor: theme?.colorScheme.background},
        ]}
        inputStyle={[styles.searchBarInput, {color: theme?.colorScheme.text}]}
      />
      <ShoeList shoes={filteredShoes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    borderRadius: 10,
  },
  searchBarInput: {},
  bubbleSearchBar: {
    borderRadius: 25,
    elevation: 10, // Increase elevation
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4}, // Increase shadow offset
    shadowOpacity: 0.3, // Increase shadow opacity
    shadowRadius: 4.65, // Increase shadow radius
    borderWidth: 1, // Add border
    borderColor: '#ddd', // Set border color
  },
});

export default ShoeShackApp;
