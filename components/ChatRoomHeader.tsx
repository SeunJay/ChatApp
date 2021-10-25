import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export type ChatRoomHeaderProps = {
  name: String;
  image: String;
};

const ChatRoomHeader = (props: ChatRoomHeaderProps) => {
  const { name, image } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: image }}
        resizeMode='contain'
      />
      <Text style={styles.username}>{name}</Text>
    </View>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});
