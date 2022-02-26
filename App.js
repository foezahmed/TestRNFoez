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

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { FacebookLogIn, GoogleLogIn, GoogleSignInInit } from './app/services/SocialLoginServices';

const Section = ({ children, title }): Node => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black
                    }
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark
                    }
                ]}>
                {children}
            </Text>
        </View>
    );
};

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    };

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
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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

export default App;
