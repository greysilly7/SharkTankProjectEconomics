// BuyScreen.tsx
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {ThemeContext} from '../context/ThemeProvider';

type BuyScreenProps = {
  route: RouteProp<RootStackParamList, 'Buy'>;
};

const BuyScreen = ({route}: BuyScreenProps) => {
  const {shoe} = route.params;
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useContext(ThemeContext); // use ThemeContext

  const handleConfirmPurchase = () => {
    setLoading(true);
    // Simulate a network request with a 2 second delay
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 2000);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < shoe.quantity) {
      setQuantity(quantity + 1);
    } else {
      Alert.alert('Warning', "You've reached the maximum available quantity");
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      Alert.alert('Warning', 'You must buy at least one item');
    }
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
      <Text style={[styles.quantity, {color: theme?.colorScheme.text}]}>
        Quantity: {quantity}
      </Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme?.colorScheme.primary}]}
        onPress={handleIncreaseQuantity}>
        <Text style={[styles.buttonText, {color: theme?.colorScheme.white}]}>
          Increase Quantity
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme?.colorScheme.primary}]}
        onPress={handleDecreaseQuantity}>
        <Text style={[styles.buttonText, {color: theme?.colorScheme.white}]}>
          Decrease Quantity
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme?.colorScheme.primary}]}
        onPress={handleConfirmPurchase}>
        <Text style={[styles.buttonText, {color: theme?.colorScheme.white}]}>
          Confirm Purchase
        </Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator size="large" color={theme?.colorScheme.primary} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[
            styles.centeredView,
            {backgroundColor: theme?.colorScheme.modalBackground},
          ]}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme?.colorScheme.background,
                shadowColor: theme?.colorScheme.shadow,
              },
            ]}>
            <Text style={[styles.modalText, {color: theme?.colorScheme.text}]}>
              Purchase Confirmed
            </Text>
            <Text style={[styles.modalText, {color: theme?.colorScheme.text}]}>
              You bought {quantity} of {shoe.name}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: theme?.colorScheme.primary},
              ]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={[styles.buttonText, {color: theme?.colorScheme.white}]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
  },
  quantity: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BuyScreen;
