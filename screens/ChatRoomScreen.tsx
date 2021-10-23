import React from 'react';
import { FlatList, StyleSheet, View, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ChatMessage from '../components/chat-message/ChatMessage';
import chats from '../data/Chats';
import bg from '../assets/images/BG.png';

const ChatRoomScreen = () => {
  const route = useRoute();

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={bg}>
      <View>
        <FlatList
          data={chats.messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyExtractor={(item) => item.id}
          inverted
        />
      </View>
    </ImageBackground>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({});
