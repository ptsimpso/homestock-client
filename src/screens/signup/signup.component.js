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

const onSignUpPressed = async (
  { name, email, password },
  setIsLoading,
  dispatch
) => {
  setIsLoading(true);

  try {
    const authService = new AuthService();
    await authService.signUp(name, email, password, dispatch);
  } catch (error) {
    // TODO: Figure out why alert is not showing
    dispatch(showAlert('Oops!', error.message));
  }
  setIsLoading(false);
};

const onLoginPressed = (navigation) => navigation.navigate('Login');

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <LogoContainer />
        <AuthForm
          showNameField
          isLoading={isLoading}
          submitTitle="Sign Up"
          onSubmit={(formData) =>
            onSignUpPressed(formData, setIsLoading, dispatch)
          }
        />
        <TouchableOpacity onPress={() => onLoginPressed(navigation)}>
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
