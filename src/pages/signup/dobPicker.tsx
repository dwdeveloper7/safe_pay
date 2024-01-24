import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function DOBPicker({ selectedDate, onDateChange }) {
    // Generate arrays for days, months, and years
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from(
        { length: 100 },
        (_, i) => new Date().getFullYear() - i
    );

    return (
        <View style={styles.dobPicker}>
            <Text style={styles.dobLabel}>DOB:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedDate.day}
                    style={styles.picker}
                    onValueChange={itemValue => onDateChange('day', itemValue)}
                >
                    {days.map(day => (
                        <Picker.Item key={day} label={`${day}`} value={day} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedDate.month}
                    style={styles.picker}
                    onValueChange={itemValue =>
                        onDateChange('month', itemValue)
                    }
                >
                    {months.map(month => (
                        <Picker.Item
                            key={month}
                            label={`${month}`}
                            value={month}
                        />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedDate.year}
                    style={styles.picker}
                    onValueChange={itemValue => onDateChange('year', itemValue)}
                >
                    {years.map(year => (
                        <Picker.Item
                            key={year}
                            label={`${year}`}
                            value={year}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dobPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dobLabel: {
        fontSize: 16,
        marginRight: 8,
    },
    pickerContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#007bff',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        width: 100,
        height: 44,
    },
});

export default DOBPicker;
