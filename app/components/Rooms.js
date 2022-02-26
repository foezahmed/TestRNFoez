//@ts-check
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { Pressable, Stack, Text } from 'native-base';

export default function Rooms({ navigation }) {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        onRefresh();
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
                            var { [Object.keys(value).pop()]: lastChat } = value;

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

                    setRooms(roomsFetched.reverse());
                    console.log('User data: ', JSON.stringify(roomsFetched));
                }
            });
    };
    return (
        <View>
            <FlatList
                style={{}}
                data={rooms}
                contentContainerStyle={{}}
                windowSize={20}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl colors={['red']} refreshing={false} onRefresh={onRefresh} />
                }
                keyExtractor={(item, index) => item.name + index}
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
                            key={roomName + listItem.index}
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
                                    ).toLocaleTimeString()}`}</Text>
                                </Stack>
                            </Stack>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
