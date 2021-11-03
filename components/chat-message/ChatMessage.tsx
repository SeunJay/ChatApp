import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { Message } from '../../types';
import Colors from '../../constants/Colors';

export type ChatMessageProps = {
  message: Message;
  userId: String;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message, userId } = props;

  const isMyMessage = () => {
    return message.user.id === userId;
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#dcf8c5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        {/* {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>} */}

        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  messageBox: {
    borderRadius: 5,
    padding: 3,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  name: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 3,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontSize: 12,
  },
});
