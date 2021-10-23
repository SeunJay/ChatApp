import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { Message } from '../../types';
import Colors from '../../constants/Colors';

export type ChatMessageProps = {
  message: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message } = props;

  const isMyMessage = () => {
    return message.user.id === 'u1';
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
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 5,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontSize: 12,
  },
});
