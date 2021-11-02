import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

// import { listChatRooms } from '../src/graphql/queries';
import { getUser } from './queries';
import ChatListItem from '../components/chat-list-item/ChatListItem';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import chatRooms from '../data/ChatRooms';
import NewMessageButton from '../components/new-message-button/NewMessageButton';

export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        // console.log(userData.data.getUser.chatRoomUser.items);

        setChatRooms(userData.data.getUser.chatRoomUser.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatRooms();
  }, []);

  // console.log('chat rooms =>', chatRooms);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{}}></View>}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
