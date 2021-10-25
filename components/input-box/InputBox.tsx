import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, View } from 'react-native';
import Colors from '../../constants/Colors';

const InputBox = () => {
  const [message, setMessage] = useState('');

  const onMicrophonePress = () => {
    console.warn('Microphone pressed!');
  };

  const onSend = () => {
    console.warn(`Sending ${message}`);

    // send message to the backend

    setMessage('');
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSend();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name='laugh-beam' size={24} color='grey' />
        <TextInput
          multiline
          style={styles.textInput}
          placeholder='Type a message'
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Entypo name='attachment' size={24} color='grey' style={styles.icons} />
        {!message && (
          <Fontisto name='camera' size={24} color='grey' style={styles.icons} />
        )}
      </View>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ? (
            <MaterialCommunityIcons name='microphone' size={24} color='white' />
          ) : (
            <MaterialIcons name='send' size={24} color='white' />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 30,
    padding: 5,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 7,
  },
  icons: {
    marginHorizontal: 5,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
});
