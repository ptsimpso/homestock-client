import React, { useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
import { Card, MenuItem, Text, Icon } from '@ui-kitten/components';

import styles from './styles';

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

const MoreMenu = ({ joinCode, onDismiss, onAddItem, onLeaveHome }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // LIFECYCLE

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // ACTIONS

  const fadeOut = (action) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      action();
    });
  };

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <TouchableWithoutFeedback onPress={() => fadeOut(onDismiss)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Card disabled={true} style={styles.modal}>
        <Text appearance="hint" category="h6" style={styles.header}>
          Join code:
        </Text>
        <Text category="h6" style={styles.code}>
          {joinCode}
        </Text>
        <View>
          <MenuItem
            title="Add Item"
            onPress={() => fadeOut(onAddItem)}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title="Leave Home"
            onPress={() => fadeOut(onLeaveHome)}
            accessoryRight={ForwardIcon}
          />
        </View>
      </Card>
    </Animated.View>
  );
};

export default MoreMenu;
