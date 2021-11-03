import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import moment from 'moment';

import { User } from '../../types';
import {
  createChatRoom,
  createChatRoomUser,
} from '../../src/graphql/mutations';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  console.log('user =>', user);

  const handleClick = async () => {
    try {
      // 1. create chat room
      const chatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );
      if (!chatRoomData.data) return console.log('failed to create chat room');

      const newChatRoom = chatRoomData.data.createChatRoom;
      // console.log(newChatRoom);

      // 2. add user to chat room
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      // 3. add authenticated user to chat room
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: user.name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity onPress={handleClick}>
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
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactListItem;

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
  status: {
    fontSize: 16,
    color: 'grey',
  },
  // time: {
  //   fontSize: 13,
  //   color: 'grey',
  // },
});
