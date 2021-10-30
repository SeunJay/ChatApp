import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

import { listUsers } from '../src/graphql/queries';
import ContactListItem from '../components/contacts-list-item/ContactListItem';
import { View } from '../components/Themed';

export default function ContactsScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(listUsers));
        setUsers(userData.data.listUsers.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

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
