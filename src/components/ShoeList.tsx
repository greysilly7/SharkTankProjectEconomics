// ShoeList.tsx
import React, {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import ShoeItem from './ShoeItem';
import type {Shoe} from '../types';
import {ThemeContext} from '../context/ThemeProvider'; // import ThemeContext
import Carousel from 'react-native-snap-carousel';

interface ShoeListProps {
  shoes: Shoe[];
}

const ShoeList = ({shoes}: ShoeListProps) => {
  const {width, height} = Dimensions.get('window');
  const theme = useContext(ThemeContext); // use ThemeContext

  return (
    <Carousel
      data={shoes}
      renderItem={({item}) => <ShoeItem shoe={item} />}
      sliderWidth={width}
      itemWidth={width / 3} // Adjust this to display multiple shoes in a line
      sliderHeight={height}
      itemHeight={height / 3} // Adjust this to make the shoe names visible
      inactiveSlideShift={0}
      activeSlideAlignment={'start'}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      containerCustomStyle={[
        styles.carousel,
        {backgroundColor: theme?.colorScheme.background},
      ]}
      contentContainerCustomStyle={styles.carouselContent}
      vertical // Add this line to make the Carousel scroll vertically
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginTop: 50,
  },
  carouselContent: {
    paddingHorizontal: 10,
  },
});

export default ShoeList;
