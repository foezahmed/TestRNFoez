//@ts-check
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity} from 'react-native';
import React from 'react';
import {
    FacebookLogIn,
    GoogleLogIn,
    GoogleSignInInit,
    GoogleSignOut
} from '../../app/services/SocialLoginServices';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../redux/slices/userSlice';
import { Stack } from 'native-base';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const onGoogleSignIn = () => {
        GoogleSignInInit();
        GoogleLogIn(
            (info) => {
                console.log(info);
                var user = {
                    _id: info.id,
                    name: info.name,
                    avatar: info.photo,
                    providerType: 'google'
                };
                dispatch(updateCurrentUser(user));
                navigation.navigate('Rooms');
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const onGoogleLogout = () => {
        GoogleSignOut((error) => {
            console.log(error);
        });
    };

    const onFBSignIn = () => {
        FacebookLogIn(
            (info) => {
                console.log(info);
                var user = {
                    _id: info.id,
                    name: info.name,
                    avatar: info.photo,
                    providerType: 'fb'
                };
                dispatch(updateCurrentUser(user));
                navigation.navigate('Chat');
            },
            (error) => {
                console.log(error);
            }
        );
    };
    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Stack direction={'column'} mt={10} space={2} px={4} justifyContent={'center'}>
                    <Text
                        style={{
                            fontSize: 30,
                            textAlign: 'center',
                            marginBottom: 20
                        }}>
                        {'Login'}
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'red',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                            justifyContent: 'center',
                            marginRight: 12
                        }}
                        onPress={() => onGoogleSignIn()}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'white'
                            }}>
                            {'Sign In with Google'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            // width: 132,
                            // height: 40,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#2d88ff',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                            justifyContent: 'center',
                            marginRight: 12
                        }}
                        onPress={() => onFBSignIn()}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'white'
                            }}>
                            {'Sign In with Facebook'}
                        </Text>
                    </TouchableOpacity>
                </Stack>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

