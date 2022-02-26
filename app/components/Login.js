//@ts-check
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import React from 'react';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import {
    FacebookLogIn,
    GoogleLogIn,
    GoogleSignInInit,
    GoogleSignOut
} from '../../app/services/SocialLoginServices';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../redux/slices/userSlice';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const onSignIn = () => {
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
                navigation.navigate('Chat');
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
                <View
                    style={{
                        flexDirection: 'column'
                    }}>
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => onSignIn()}
                    />
                    <TouchableOpacity
                        style={{
                            // width: 132,
                            // height: 40,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#2d88ff',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 8,
                            justifyContent: 'center',
                            marginRight: 12
                        }}
                        onPress={() => onFBSignIn()}>
                        <Text
                            style={{
                                fontSize: 16
                            }}>
                            {'Sign In with Facebook'}
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
                            paddingVertical: 8,
                            justifyContent: 'center',
                            marginRight: 12
                        }}
                        onPress={() => onGoogleLogout()}>
                        <Text
                            style={{
                                fontSize: 16
                            }}>
                            {'Logout'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400'
    },
    highlight: {
        fontWeight: '700'
    }
});
