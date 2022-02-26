//@ts-check
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';

import { Provider } from 'react-redux';
import store from './app/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/components/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './app/components/Chat';
import { firebaseInit } from './app/services/FirebaseService';
import { NativeBaseProvider } from 'native-base';
import Rooms from './app/components/Rooms';

const Stack = createNativeStackNavigator();

firebaseInit();

const App: () => Node = () => {

    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Rooms" component={Rooms} />
                        <Stack.Screen name="Chat" component={Chat} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;
