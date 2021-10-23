import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ChatRoomScreen = () => {
  const route = useRoute();
  return (
    <View>
      <Text>Chat Room Screen</Text>
    </View>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({});
