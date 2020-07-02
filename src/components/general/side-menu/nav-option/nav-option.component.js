import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Icon,
  Text,
  useStyleSheet,
  useTheme,
  Divider,
} from '@ui-kitten/components';

import stylesheet from './styles';

const NavOption = ({ title, iconName, onPress, children }) => {
  const styles = useStyleSheet(stylesheet);
  const theme = useTheme();

  return (
    <>
      <TouchableOpacity style={styles.navOption} onPress={onPress}>
        <Icon
          style={styles.navIcon}
          fill={theme['color-primary-default']}
          name={iconName}
        />
        <Text category="h6" style={styles.navText}>
          {title}
        </Text>
      </TouchableOpacity>
      {children}
      <Divider />
    </>
  );
};

export default NavOption;
