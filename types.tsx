/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<TopTabParamList> | undefined;
  Modal: undefined;
  ChatRoom: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type TopTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
};

export type Message = {
  id: String;
  content: String;
  createdAt: String;
};

export type ChatRoom = {
  id: String;
  users: [User];
  lastMessage: Message;
};

export type RootTabScreenProps<Screen extends keyof TopTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TopTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
