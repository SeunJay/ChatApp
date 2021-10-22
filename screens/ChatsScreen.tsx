import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/chat-list-item/ChatListItem';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import chatRooms from '../data/ChatRooms';

export default function ChatsScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{}}></View>}
      />
      {/* <ChatListItem
        chatRoom={chatRooms[0]}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
