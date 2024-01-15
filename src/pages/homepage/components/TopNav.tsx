import { View, Text, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    navLinkContainer: {
        margin: 12,
    },
    contentContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

const navLinkData: NavLinkData[] = [
    { id: 0, label: 'About', value: 'About' },

    { id: 1, label: 'Support', value: 'Support' },

    { id: 2, label: 'Terms', value: 'Terms' },
];

type NavLinkData = { id: number; label: string; value: string };

type NavLinkItemProps = { label: string };

const NavLinkItem = ({ label }: NavLinkItemProps) => <Text>{label}</Text>;

const TopNav = () => (
    <View style={styles.navLinkContainer}>
        <FlatList
            data={navLinkData}
            renderItem={navLinkItem => (
                <NavLinkItem label={navLinkItem.item.label} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle}
        />
    </View>
);

export default TopNav;
