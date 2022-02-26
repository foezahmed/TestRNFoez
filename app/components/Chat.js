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

const Chat = () => {
    const onSignIn = () => {
        GoogleSignInInit();
        GoogleLogIn(
            (info) => {
                console.log(info);
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
            },
            (error) => {
                console.log(error);
            }
        );
    };
    return (
        <SafeAreaView>
            <Text>Chat</Text>
        </SafeAreaView>
    );
};

export default Chat;

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
