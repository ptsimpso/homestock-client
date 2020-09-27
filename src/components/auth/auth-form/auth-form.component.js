import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Button, Spinner, Text } from '@ui-kitten/components';

import styles from './styles';

const AuthForm = ({
  isLoading,
  showNameField,
  submitTitle,
  onSubmit,
  showForgotPass,
  onForgotPass,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const renderNameInput = () => {
    if (showNameField) {
      return (
        <Input
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          style={styles.input}
        />
      );
    } else {
      return null;
    }
  };

  const renderForgotPass = () => {
    if (showForgotPass) {
      return (
        <TouchableOpacity onPress={() => onForgotPass(email)}>
          <Text style={styles.forgotPass} category="label" appearance="hint">
            Forgot password?
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  }

  const renderLoading = (props) => {
    if (isLoading) {
      return (
        <View style={[props.style, styles.loading]}>
          <Spinner size="small" status="control" />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.form}>
      {renderNameInput()}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        style={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        style={styles.input}
      />
      {renderForgotPass()}
      <Button
        onPress={() => onSubmit({ name, email, password })}
        accessoryLeft={renderLoading}
        style={styles.submitButton}
      >
        {!isLoading && submitTitle}
      </Button>
    </View>
  );
};

export default AuthForm;
