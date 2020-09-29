import React, { useState, useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
import { Button, Card, Text, Input } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import { dismissAlert } from '../../../redux/actions';

import styles from './styles';

const onDismiss = (dispatch) => {
  dispatch(dismissAlert());
};

const Alert = ({
  alert: {
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

  const dismiss = () => {
    setInputValue('');

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      onDismiss(dispatch);
    });
  };

  // RENDERING

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
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <TouchableWithoutFeedback
        onPress={shouldBackgroundDismiss ? dismiss : () => { }}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Card
        disabled={true}
        style={[styles.modal, inputData ? styles.offsetModal : {}]}
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
            if (onActionPress) {
              onActionPress(inputData ? inputValue : null);
            }
            dismiss();
          }}
        >
          {actionText ? actionText : 'Ok'}
        </Button>
      </Card>
    </Animated.View>
  );
};

export default Alert;
