import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ChatRoom } from '../../types';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;

  const user = chatRoom.users[1];
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.imageUri,
          }}
        />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
        </View>
      </View>
      {/* <Text>{chatRoom.lastMessage.createdAt}</Text> */}
      <Text style={styles.time}>Yesterday</Text>
    </View>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderWidth: 4,
    borderColor: '#ce1919',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
    // marginLeft: 5,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 13,
    color: 'grey',
  },
});
