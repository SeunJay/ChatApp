import React from 'react';
import { FlatList, StyleSheet, View, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';

import ChatMessage from '../components/chat-message/ChatMessage';
import InputBox from '../components/input-box/InputBox';
import chats from '../data/Chats';
import bg from '../assets/images/BG.png';

const ChatRoomScreen = () => {
  const route = useRoute();

  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
      }}
      source={bg}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={chats.messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyExtractor={(item) => item.id}
          inverted
        />
      </View>
      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({});
