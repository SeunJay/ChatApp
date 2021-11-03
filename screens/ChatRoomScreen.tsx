import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ImageBackground } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';

import { messagesByChatRoom } from '../src/graphql/queries';
import ChatMessage from '../components/chat-message/ChatMessage';
import InputBox from '../components/input-box/InputBox';
import chats from '../data/Chats';
import bg from '../assets/images/BG.png';

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const [myUserId, setMyUserId] = useState('');
  const route = useRoute();

  useEffect(() => {
    try {
      const getUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        setMyUserId(userInfo.attributes.sub);
      };

      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messagesData = await API.graphql(
          graphqlOperation(messagesByChatRoom, {
            chatRoomID: route.params.id,
            sortDirection: 'DESC',
          })
        );

        setMessages(messagesData.data.messagesByChatRoom.items);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [messages]);

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
          data={messages}
          renderItem={({ item }) => (
            <ChatMessage userId={myUserId} message={item} />
          )}
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
