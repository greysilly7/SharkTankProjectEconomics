import React, {useContext, useState} from 'react';
import {Alert, Button, Image, StyleSheet, TextInput, View} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {ThemeContext} from '../context/ThemeProvider';
import {postItem} from '../services/firebaseService';
import {ImagePickerResponse} from '../types';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 200,
  maxWidth: 200,
};

const PostItemScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const theme = useContext(ThemeContext);

  const pickImage = () => {
    Alert.alert('Pick an Image', 'Choose the source', [
      {
        text: 'Camera',
        onPress: () => launchCamera(options, handleImageResponse),
      },
      {
        text: 'Image Library',
        onPress: () => launchImageLibrary(options, handleImageResponse),
      },
    ]);
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      if (response.assets && response.assets[0].uri) {
        const source = {uri: response.assets[0].uri};
        setImage(source.uri);
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme?.colorScheme?.background},
      ]}>
      <TextInput
        style={[
          styles.input,
          {
            color: theme?.colorScheme?.text,
          },
        ]}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: theme?.colorScheme?.text,
          },
        ]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: theme?.colorScheme?.text,
          },
        ]}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button
        title="Pick an image"
        onPress={pickImage}
        color={theme?.colorScheme?.text}
      />
      {image && <Image source={{uri: image}} style={styles.image} />}
      <Button
        title="Post item"
        onPress={() => postItem(image ?? '', title, description, Number(price))}
        color={theme?.colorScheme?.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default PostItemScreen;
