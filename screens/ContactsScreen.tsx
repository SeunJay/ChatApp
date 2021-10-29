import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/contacts-list-item/ContactListItem';

import { View } from '../components/Themed';

import users from '../data/Users';

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{}}></View>}
      />
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
