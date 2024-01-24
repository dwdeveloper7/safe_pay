import { StyleSheet, View, SafeAreaView, Pressable, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    buttons: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnXS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    btnXSText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: '#0d57b2',
    },
    btnSM: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    btnSMText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: '#0d57b2',
    },
    btnMD: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    btnMDText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#0d57b2',
    },
    btnLG: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    btnLGText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#0d57b2',
    },
    btnXL: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
    },
    btnXLText: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: '#0d57b2',
    },
    pressed: { opacity: 0.5 },
});

const ButtonSizes = {
    XS: styles.btnXS,
    SM: styles.btnSM,
    MD: styles.btnMD,
    LG: styles.btnLG,
    XL: styles.btnXL,
};

type ButtonProps = {
    onPress: () => void;
    title: string;
    size: keyof typeof ButtonSizes;
};

const Button: React.FC<ButtonProps> = ({ onPress, title, size }) => {
    const buttonStyle = ButtonSizes[size] || ButtonSizes.MD;
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [buttonStyle, pressed && styles.pressed]}
        >
            <Text style={styles[`btn${size}Text`]}>{title}</Text>
        </Pressable>
    );
};

export default Button;
