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

import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/components/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './app/components/Chat';
import { firebaseInit } from './app/services/FirebaseService';
import { Button, NativeBaseProvider } from 'native-base';
import Rooms from './app/components/Rooms';
import { clearCurrentUser } from './app/redux/slices/userSlice';
import { FacebookSignOut, GoogleSignOut } from './app/services/SocialLoginServices';

const Stack = createNativeStackNavigator();

firebaseInit();

const RootNavigator = ({}) => {
    const currentUser = useSelector((state) => state?.user?.value);
    const dispatch = useDispatch();

    const onLogout = () => {
        switch (currentUser.providerType) {
            case 'google':
                GoogleSignOut((error) => {
                    console.log(error);
                    alert(error);
                });
                break;
            case 'fb':
                FacebookSignOut((error) => {
                    console.log(error);
                    alert(error);
                });
                break;

            default:
                break;
        }
        dispatch(clearCurrentUser());
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {currentUser?._id ? (
                    <>
                        <Stack.Screen
                            name="Rooms"
                            component={Rooms}
                            options={{
                                headerRight: () => (
                                    <Button variant={'ghost'} onPress={onLogout} color="blue">
                                        Logout
                                    </Button>
                                )
                            }}
                        />
                        <Stack.Screen name="Chat" component={Chat} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App: () => Node = () => {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <RootNavigator></RootNavigator>
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;
