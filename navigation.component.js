import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoadingScreen from './src/screens/loading/loading.component';
import SignUpScreen from './src/screens/signup/signup.component';
import LoginScreen from './src/screens/login/login.component';
import MainScreen from './src/screens/main/main.component';

import Alert from './src/components/general/alert/alert.component';

const MainStack = createStackNavigator();
const MainNavigator = (props) => (
  <MainStack.Navigator headerMode="none">
    {props.isSignedIn ? (
      <>
        <MainStack.Screen name="Main" component={MainScreen} />
      </>
    ) : (
      <>
        <MainStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
        <MainStack.Screen name="Login" component={LoginScreen} />
      </>
    )}
  </MainStack.Navigator>
);

export const AppNavigator = () => {
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);

  return (
    <NavigationContainer>
      {auth.token === null ? (
        <LoadingScreen />
      ) : (
        <MainNavigator isSignedIn={auth.token !== ''} />
      )}
      <Alert alert={alert} />
    </NavigationContainer>
  );
};
