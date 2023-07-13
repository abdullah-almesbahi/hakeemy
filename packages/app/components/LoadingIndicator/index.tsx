import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';

interface LoadingIndicatorProps {
  style?: any;
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = props => (
  <View style={[styles.container, props.style]}>
    <ActivityIndicator animating={true} size='large' />
  </View>
);

export default LoadingIndicator;
