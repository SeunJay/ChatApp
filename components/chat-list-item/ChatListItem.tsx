import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ChatRoom } from '../../types';
import moment from 'moment';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;

  const navigation = useNavigation();

  const user = chatRoom.users[1];
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ChatRoom', {
          id: chatRoom.id,
          name: user.name,
          image: user.imageUri,
        })
      }
    >
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
            <Text style={styles.lastMessage}>
              {chatRoom.lastMessage.content}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
    // borderWidth: 1,
    // borderColor: 'grey',
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
