import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useActivePageStore from '../../../stores/useActivePageStore';
import Badge from '../../../components/badge';
import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialIcons,
    Octicons,
} from '@expo/vector-icons';

const icons = [
    {
        icon: <AntDesign name="home" size={24} color="black" />,
        label: 'Home',
    },
    {
        icon: <FontAwesome name="handshake-o" size={24} color="black" />,
        label: 'Transactions',
    },
    {
        icon: (
            <Badge value="1">
                <Ionicons name="notifications" size={24} color="black" />
            </Badge>
        ),
        label: 'Notifications',
    },
    {
        icon: <MaterialIcons name="account-circle" size={24} color="black" />,
        label: 'Profile',
    },
    {
        icon: <Octicons name="question" size={24} color="gray" />,
        label: 'Help',
    },
];

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    iconContainer: {
        alignItems: 'center',
        height: 48,
    },

    label: {
        marginTop: 'auto',
        color: 'black',
    },
    activeLabel: {
        marginTop: 'auto',
        color: 'blue', // Active color (blue)
    },
});

const BottomNavigationBar: React.FC<{ visible: boolean }> = ({ visible }) => {
    const { activePage, setActivePage } = useActivePageStore();
    const navigation = useNavigation();

    const handleIconPress = label => {
        setActivePage(label);
        navigation.navigate(label);
    };

    const isActive = pageName => pageName === activePage;

    if (!visible) return null;

    return (
        <View style={styles.container}>
            {icons.map((icon, index) => (
                <TouchableOpacity
                    key={icon.label}
                    style={[
                        styles.iconContainer,
                        isActive(icon.label) && styles.activeLabel,
                    ]}
                    onPress={() => handleIconPress(icon.label)}
                    accessibilityLabel={`Navigate to ${icon.label}`}
                >
                    {React.cloneElement(icon.icon, {
                        color: isActive(icon.label) ? 'blue' : 'black',
                    })}
                    <Text
                        style={[
                            styles.label,
                            isActive(icon.label) && styles.activeLabel,
                        ]}
                    >
                        {icon.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default BottomNavigationBar;
