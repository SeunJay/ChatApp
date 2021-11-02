import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import { ChatRoom } from '../../types';
import moment from 'moment';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const [otherUser, setOtherUser] = useState(null);

  const { chatRoom } = props;

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!chatRoom) setOtherUser({});
      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    };
    getOtherUser();
  }, []);

  const navigation = useNavigation();
  // console.log('here => ', chatRoom.chatRoom.chatRoomUsers.items);

  // const user = chatRoom.chatRoomUsers.items[1];

  if (!otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ChatRoom', {
          id: chatRoom.id,
          name: otherUser.name,
          image: otherUser.imageUri,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: otherUser.imageUri,
            }}
          />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            {/* <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                : ''}
            </Text> */}
          </View>
        </View>
        {/* <Text style={styles.time}>
          {chatRoom.lastMessage &&
            moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}
        </Text> */}
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
