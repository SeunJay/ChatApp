/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import {
  Octicons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatRoomHeader from '../components/ChatRoomHeader';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  RootStackParamList,
  TopTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View } from '../components/Themed';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTintColor: Colors.light.background,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name='Root'
        component={MainTabNavigator}
        options={{
          title: 'WhatsApp',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 70,
                backgroundColor: Colors.light.tint,
              }}
            >
              <Octicons name='search' size={22} color='white' />

              <MaterialCommunityIcons
                name='dots-vertical'
                size={23}
                color='white'
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='ChatRoom'
        component={ChatRoomScreen}
        options={({ route }) => ({
          // title: route.params?.name,
          headerTitle: () => (
            <ChatRoomHeader
              name={route.params?.name}
              image={route.params?.image}
            />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 120,
                backgroundColor: Colors.light.tint,
              }}
            >
              <FontAwesome5 name='video' size={22} color='white' />
              <MaterialIcons name='call' size={22} color='white' />
              <MaterialCommunityIcons
                name='dots-vertical'
                size={23}
                color='white'
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name='Contacts' component={ContactsScreen} />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName='Chats'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <TopTab.Screen
        name='Camera'
        component={TabTwoScreen}
        options={({}: RootTabScreenProps<'Camera'>) => ({
          tabBarIcon: ({ color }) => (
            <Fontisto name='camera' color={color} size={17} />
          ),
          tabBarLabel: () => null,
        })}
      />
      <TopTab.Screen name='Chats' component={ChatsScreen} />

      <TopTab.Screen name='Status' component={TabTwoScreen} />

      <TopTab.Screen name='Calls' component={TabTwoScreen} />
    </TopTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
