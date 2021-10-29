import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/Colors';

const NewMessageButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
        <MaterialCommunityIcons
          name='message-reply-text'
          size={28}
          color='white'
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewMessageButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
