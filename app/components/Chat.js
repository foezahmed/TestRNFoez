//@ts-check
import { SafeAreaView, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { Box, Button, Flex, Input, Stack } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
const PROFILE_ICON_HEIGHT = 100;

const Chat = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.value);
    const [room, setRoom] = useState('');
    const [roomAdded, setRoomAdded] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        var onValueChange = () => {};
        if (roomAdded) {
            navigation.setOptions({ title: `Chat - ${room || ''}` });
            onValueChange = database()
                .ref(`/rooms/${room}`)
                .on('value', (snapshot) => {
                    var snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        var messagesFetched = [];
                        for (const [key, value] of Object.entries(snapshotValue)) {
                            if (currentUser._id === value.user._id) {
                                value.user = { ...value.user, ...currentUser };
                            }
                            messagesFetched.push(value);
                        }
                        var sorted = messagesFetched.sort(
                            (a, b) =>
                                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        );
                        setMessages(sorted);
                    }
                    console.log('User data: ', snapshot.val());
                });
        }
        return () => database().ref(`/rooms/${room}`).off('value', onValueChange);
    }, [roomAdded]);

    const addMessage = (text) => {
        var message = {
            ...text[0],
            createdAt: new Date().toISOString()
        };
        database().ref(`/rooms/${room}`).push(message);
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
                            ...currentUser
                        }}
                    />
                </Flex>
            ) : (
                <Stack pt={4}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 8
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                marginBottom: 8
                            }}>
                            {'Continue as'}
                        </Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: PROFILE_ICON_HEIGHT,
                                width: PROFILE_ICON_HEIGHT,
                                borderRadius: PROFILE_ICON_HEIGHT / 2,
                                borderColor: 'white',
                                borderWidth: 2,
                                overflow: 'hidden',
                                marginBottom: 8
                            }}>
                            <Image
                                source={{ uri: currentUser.avatar }}
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%'
                                }}
                                resizeMode={'cover'}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 24,
                                paddingHorizontal: 24,
                                paddingVertical: 12,
                                justifyContent: 'center',
                                marginBottom: 8
                            }}>
                            <Text
                                style={{
                                    fontSize: 16
                                }}>
                                {currentUser.name}
                            </Text>
                        </View>
                    </View>
                    <Box alignItems="center">
                        <Input
                            variant={'filled'}
                            w="75%"
                            maxW="300px"
                            py="0"
                            my={'6'}
                            fontSize={'md'}
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
                </Stack>
            )}
        </SafeAreaView>
    );
};

export default Chat;
