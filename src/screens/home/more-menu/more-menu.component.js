import React from 'react';
import { Card, Modal, Menu, MenuItem, Text, Icon } from '@ui-kitten/components';

import styles from './styles';

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

const MoreMenu = ({
  joinCode,
  isVisible,
  onDismiss,
  onAddItem,
  onLeaveHome,
}) => {
  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onDismiss}
    >
      <Card disabled={true} style={styles.container}>
        <Text appearance="hint" category="h6" style={styles.header}>
          Join code:
        </Text>
        <Text category="h6" style={styles.code}>
          {joinCode}
        </Text>
        <Menu>
          <MenuItem
            title="Add Item"
            onPress={onAddItem}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title="Leave Home"
            onPress={onLeaveHome}
            accessoryRight={ForwardIcon}
          />
        </Menu>
      </Card>
    </Modal>
  );
};

export default MoreMenu;
