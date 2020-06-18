import React from 'react';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import { dismissAlert } from '../../../redux/actions';

import styles from './styles';

const onDismiss = (dispatch) => {
  dispatch(dismissAlert());
};

const Alert = ({
  alert: {
    isVisible,
    title,
    text,
    actionText,
    shouldBackgroundDismiss,
    onActionPress,
  },
}) => {
  const dispatch = useDispatch();

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={
        shouldBackgroundDismiss ? () => onDismiss(dispatch) : () => {}
      }
    >
      <Card disabled={true} style={styles.container}>
        {title ? (
          <Text category="s1" style={styles.title}>
            {title}
          </Text>
        ) : null}
        {text ? <Text style={styles.text}>{text}</Text> : null}
        <Button
          onPress={() => {
            onDismiss(dispatch);
            if (onActionPress) {
              onActionPress();
            }
          }}
        >
          {actionText ? actionText : 'Ok'}
        </Button>
      </Card>
    </Modal>
  );
};

export default Alert;
