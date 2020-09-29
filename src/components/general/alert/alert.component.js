import React, { useState } from 'react';
import { Button, Card, Modal, Text, Input } from '@ui-kitten/components';
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
    inputData,
    actionText,
    shouldBackgroundDismiss,
    onActionPress,
  },
}) => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const dismiss = () => {
    setInputValue('');
    onDismiss(dispatch);
  };

  const renderInput = () => {
    if (inputData) {
      return (
        <Input
          placeholder={inputData.placeholder}
          keyboardType={inputData.keyboardType}
          autoCorrect={inputData.autoCorrect}
          autoCapitalize={inputData.autoCapitalize}
          secureTextEntry={inputData.secureTextEntry}
          autoFocus={true}
          value={inputValue}
          onChangeText={setInputValue}
        />
      );
    }

    return null;
  };

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={shouldBackgroundDismiss ? dismiss : () => {}}
    >
      <Card
        disabled={true}
        style={[styles.container, inputData ? styles.offsetContainer : {}]}
      >
        {title ? (
          <Text category="s1" style={styles.title}>
            {title}
          </Text>
        ) : null}
        {text ? <Text style={styles.text}>{text}</Text> : null}
        {renderInput()}
        <Button
          onPress={() => {
            dismiss();
            if (onActionPress) {
              onActionPress(inputData ? inputValue : null);
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
