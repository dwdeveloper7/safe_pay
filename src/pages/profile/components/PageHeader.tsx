import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Pressable,
    Text,
    Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import useAuthStore from '../../../stores/useAuthStore';

const PageHeader = () => {
    const { session } = useAuthStore();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* Replace TouchableOpacity with Pressable */}
                    <Pressable
                        onPress={() => {
                            // handle onPress
                        }}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.5 : 1, // Optional: change opacity if pressed
                            },
                            styles.headerProfile, // You can add style as an array
                        ]}
                    >
                        <Image
                            alt=""
                            source={{
                                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                            }}
                            style={styles.avatar}
                        />

                        <View style={styles.headerProfileBody}>
                            <Text style={styles.headerTitle}>John Doe</Text>
                            <Text style={styles.headerHandle}>
                                {session.user.phone}
                            </Text>
                        </View>
                    </Pressable>

                    {/* Another Pressable */}
                    <Pressable
                        onPress={() => {
                            // handle onPress
                        }}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.5 : 1,
                            },
                            styles.headerNotifications,
                        ]}
                    >
                        <FontAwesome
                            color="#222"
                            name="bell"
                            solid={true}
                            size={20}
                        />
                    </Pressable>
                </View>

                <View style={styles.placeholder}>
                    <View style={styles.placeholderInset}>
                        {/* Replace with your content */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        marginTop: 40,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 9999,
    },
    /** Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    headerProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerProfileBody: {
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 3,
    },
    headerHandle: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '500',
        color: '#616d79',
    },
    headerNotifications: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 0,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});

export default PageHeader;
