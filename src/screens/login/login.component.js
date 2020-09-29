import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';

import LogoContainer from '../../components/auth/logo-container/logo-container.component';
import AuthForm from '../../components/auth/auth-form/auth-form.component';

import AuthService from '../../services/auth-service';
import HomeService from '../../services/home-service';
import { showAlert } from '../../redux/actions';

import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSignInPressed = async ({ email, password }) => {
    setIsLoading(true);

    try {
      const authService = new AuthService();
      await authService.signIn(email, password, dispatch);
      const homeService = new HomeService();
      await homeService.fetchHomes(dispatch);
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
      setIsLoading(false);
    }
  };

  const onSignUpPressed = () => navigation.goBack();

  const onForgotPass = async (email) => {
    try {
      const authService = new AuthService();
      await authService.sendForgotPass(email);
      dispatch(
        showAlert(
          'Email Sent',
          'You will recieve an email shortly with new login credentials.'
        )
      );
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <LogoContainer />
        <AuthForm
          isLoading={isLoading}
          submitTitle="Sign In"
          onSubmit={onSignInPressed}
          showForgotPass={true}
          onForgotPass={onForgotPass}
        />
        <TouchableOpacity onPress={onSignUpPressed}>
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
