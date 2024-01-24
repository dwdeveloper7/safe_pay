import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
    height?: number;
    width?: number;
};

export const Spacer: React.FC<SpacerProps> = ({ height = 0, width = 0 }) => (
    <View style={{ height, width }} />
);
