import React from 'react';
import { View } from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';
import styles from './styles';

const LogoContainer = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        fill={theme['color-primary-default']}
        name="home"
      />
      <Text category="h4" style={styles.title}>HomeStock</Text>
    </View>
  );
};

export default LogoContainer;
