import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import { withAuthenticator } from 'aws-amplify-react-native';

import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

const App = () => {
  useEffect(() => {
    //fetch authenticated user from auth
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (userInfo) {
        //get user from the backend by user SUB from auth
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          return console.log('User exists in the database');
        }

        //save user in db
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
          status: 'Hey, I am using WhatsApp!',
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };

    fetchUser();
  }, []);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};

export default withAuthenticator(App);
