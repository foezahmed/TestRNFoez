//@ts-check
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import {
    Box,
    Button,
    Fab,
    Icon as NBIcon,
    Input,
    Modal,
    Pressable,
    Stack,
    Text
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Rooms({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const [showNewRoom, setShowNewRoom] = useState(false);
    const [room, setRoom] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            onRefresh();
        });

        return unsubscribe;
    }, []);

    const onRefresh = () => {
        database()
            .ref(`/rooms`)
            .once('value', (snapshot) => {
                var snapshotValue = snapshot.val();
                if (snapshotValue) {
                    var roomsFetched = [];
                    for (const [key, value] of Object.entries(snapshotValue)) {
                        var chats = Object.keys(value);
                        var lastMessage = {
                            rooName: '',
                            text: '',
                            createdAt: null,
                            user: null
                        };
                        if (chats && chats.length > 0) {
                            var { [Object.keys(value).reverse().pop()]: lastChat } = value;

                            lastMessage = {
                                ...lastMessage,
                                roomName: key,
                                text: lastChat.text,
                                createdAt: lastChat?.createdAt,
                                user: lastChat?.user
                            };
                        }

                        roomsFetched.push(lastMessage);
                    }
                    var sorted = roomsFetched
                        .sort(
                            (a, b) =>
                                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        )
                        .reverse();

                    setRooms(sorted);
                    console.log('User data: ', JSON.stringify(roomsFetched));
                }
            });
    };
    return (
        <Box position={'relative'} flex={1}>
            <Fab
                position={'absolute'}
                bottom={6}
                right={6}
                placement="bottom-right"
                renderInPortal={false}
                size="lg"
                icon={<NBIcon name="plus" as={AntDesign} />}
                onPress={() => setShowNewRoom(true)}
            />
            <Modal
                isOpen={showNewRoom}
                onClose={() => {
                    setRoom('');
                    setShowNewRoom(false);
                }}>
                <Modal.Content>
                    <Modal.Header>Create Room</Modal.Header>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Box alignItems="center">
                            <Input
                                variant={'filled'}
                                w="75%"
                                maxW="300px"
                                // py="0"
                                my={'6'}
                                fontSize={'md'}
                                placeholder="Set room name"
                                onChangeText={(text) => {
                                    setRoom(text);
                                }}
                            />
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                onPress={() => {
                                    if (!room) return;
                                    navigation.navigate('Chat', { roomName: room });
                                    setShowNewRoom(false);
                                    setRoom('');
                                }}>
                                Create
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <FlatList
                style={{}}
                data={rooms}
                contentContainerStyle={{}}
                windowSize={20}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl colors={['red']} refreshing={false} onRefresh={onRefresh} />
                }
                keyExtractor={(item, index) => item.roomName + index}
                // ListHeaderComponent={
                //     <>

                //     </>
                // }
                ListEmptyComponent={
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'black' }}>No rooms yet</Text>
                    </View>
                }
                renderItem={(listItem) => {
                    const { roomName, text, createdAt, user } = listItem.item;
                    return (
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Chat', { roomName });
                            }}>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                px={4}
                                py={2}
                                borderColor={'lightgray'}
                                borderBottomWidth={1}>
                                <Stack direction={'column'}>
                                    <Text fontSize={'lg'}>{roomName}</Text>
                                    <Text fontSize={'xs'} opacity={0.7}>{`${
                                        user?.name || ''
                                    }: ${text}`}</Text>
                                </Stack>
                                <Stack>
                                    <Text fontSize={'xs'}>{`${new Date(
                                        createdAt
                                    ).toLocaleString()}`}</Text>
                                </Stack>
                            </Stack>
                        </Pressable>
                    );
                }}
            />
        </Box>
    );
}

const styles = StyleSheet.create({});
