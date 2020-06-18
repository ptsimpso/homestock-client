import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LogoContainer from '../../components/auth/logo-container/logo-container.component';
import styles from './styles';
import AuthForm from '../../components/auth/auth-form/auth-form.component';

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpPressed = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <LogoContainer />
        <AuthForm isLoading submitTitle="Sign In" />
        <TouchableOpacity onPress={handleSignUpPressed}>
          <Text category="p1" appearance="hint" style={styles.loginText}>
            Need an account?{' '}
            <Text category="s1" appearance="hint">
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
