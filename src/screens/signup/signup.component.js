import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import LogoContainer from '../../components/auth/logo-container/logo-container.component';
import AuthForm from '../../components/auth/auth-form/auth-form.component';

import AuthService from '../../services/auth-service';
import { showAlert } from '../../redux/actions';

import styles from './styles';

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSignUpPressed = async ({ name, email, password }) => {
    setIsLoading(true);

    try {
      const authService = new AuthService();
      await authService.signUp(name, email, password, dispatch);
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
    }
    setIsLoading(false);
  };

  const onLoginPressed = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <LogoContainer />
        <AuthForm
          showNameField
          isLoading={isLoading}
          submitTitle="Sign Up"
          onSubmit={onSignUpPressed}
        />
        <TouchableOpacity onPress={onLoginPressed}>
          <Text category="p1" appearance="hint" style={styles.signInText}>
            Already have an account?{' '}
            <Text category="s1" appearance="hint">
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
