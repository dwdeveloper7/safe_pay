import React from 'react';
import { StyleSheet, View, SafeAreaView, Pressable, Text } from 'react-native';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
    size: ButtonSize;
    title: string;
    onPress: (T: any) => void | Promise<void>;
};
const Button: React.FC<ButtonProps> = ({ size, title, onPress }) => {
    const getButtonStyle = () => {
        switch (size) {
            case 'small':
                return styles.btnSM;
            case 'medium':
                return styles.btnMD;
            case 'large':
                return styles.btnLG;
            default:
                return styles.btnXS;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Pressable onPress={onPress}>
                    <View style={getButtonStyle()}>
                        <Text style={styles.btnText}>{title}</Text>
                    </View>
                </Pressable>
                {/* Additional buttons if needed */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    buttons: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnText: {
        // common text styles for all buttons
        color: '#fff',
        fontWeight: '600',
    },
    btnXS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        backgroundColor: '#0569FF',
        borderColor: '#0569FF',
    },
    btnXSText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: '#fff',
    },
    btnSM: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#0569FF',
        borderColor: '#0569FF',
    },
    btnSMText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: '#fff',
    },
    btnMD: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#0569FF',
        borderColor: '#0569FF',
    },
    btnMDText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#fff',
    },
    btnLG: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#0569FF',
        borderColor: '#0569FF',
    },
    btnLGText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    btnXL: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        backgroundColor: '#0569FF',
        borderColor: '#0569FF',
    },
    btnXLText: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: '#fff',
    },
});

export default Button;
