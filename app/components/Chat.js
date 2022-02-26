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
import React, { useEffect, useState } from 'react';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import {
    FacebookLogIn,
    GoogleLogIn,
    GoogleSignInInit,
    GoogleSignOut
} from '../../app/services/SocialLoginServices';
import database from '@react-native-firebase/database';
import { Box, Button, Flex, Input, Stack } from 'native-base';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
    const [value, setValue] = useState('');
    const [room, setRoom] = useState('');
    const [roomAdded, setRoomAdded] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        var onValueChange = () => {};
        if (roomAdded) {
            onValueChange = database()
                .ref(`/rooms/${room}`)
                .on('value', (snapshot) => {
                    var snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        var messagesFetched = [];
                        for (const [key, value] of Object.entries(snapshotValue)) {
                            messagesFetched.push(value);
                        }
                        setMessages(messagesFetched);
                    }
                    console.log('User data: ', snapshot.val());
                    setValue(JSON.stringify(snapshot.val()));
                });
        }
        // Stop listening for updates when no longer required
        return () => database().ref(`/rooms/${room}`).off('value', onValueChange);
    }, [roomAdded]);

    const addMessage = (text) => {
        database().ref(`/rooms/${room}`).push(text[0]);
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: 'lightgray',
                height: '100%'
            }}>
            {roomAdded ? (
                <Flex flexDirection={'column'} position={'relative'} h={'full'}>
                    <GiftedChat
                        messages={messages}
                        onSend={(message) => addMessage(message)}
                        user={{
                            _id: 1
                        }}
                    />
                    {/* <Stack
                        direction={'row'}
                        width={'full'}
                        px={2}
                        position={'absolute'}
                        bottom={0}
                        bg={'black'}
                        py={6}>
                        <Input
                            flex={1}
                            value={message}
                            placeholder={'Send message'}
                            onChangeText={(text) => {
                                setMessage(text);
                            }}
                            mr={1}></Input>
                        <Button
                            size="xs"
                            rounded="none"
                            onPress={(text) => {
                                if (message) {
                                    addMessage(message);
                                    setMessage('');
                                }
                            }}>
                            {'Send'}
                        </Button>
                    </Stack> */}
                </Flex>
            ) : (
                <View>
                    <Box alignItems="center" justifyContent={'center'}>
                        <Input
                            w="75%"
                            maxW="300px"
                            py="0"
                            my={'6'}
                            placeholder="Set room name"
                            onChangeText={(text) => {
                                setRoom(text);
                            }}
                        />
                        <Button
                            size="xs"
                            rounded="none"
                            w="1/6"
                            onPress={(text) => {
                                if (room) {
                                    setRoom(room);
                                    setRoomAdded(true);
                                }
                            }}>
                            {'Set'}
                        </Button>
                    </Box>
                </View>
            )}
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
