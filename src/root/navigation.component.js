import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import LoadingScreen from '../screens/loading/loading.component';
import SignUpScreen from '../screens/signup/signup.component';
import LoginScreen from '../screens/login/login.component';
import HomeScreen from '../screens/home/home.component';
import ProfileScreen from '../screens/profile/profile.component';

// **********
// ROOT STACK
// **********
const RootStack = createStackNavigator();
const RootNavigator = (props) => (
  <RootStack.Navigator headerMode="none">
    {props.isSignedIn ? (
      <>
        <RootStack.Screen name="Main" component={MainNavigator} />
      </>
    ) : (
      <>
        <RootStack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
        <RootStack.Screen name="Login" component={LoginScreen} />
      </>
    )}
  </RootStack.Navigator>
);

// ****
// MAIN
// ****
const Drawer = createDrawerNavigator();
const MainNavigator = (props) => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Home" component={HomeScreen} />
  </Drawer.Navigator>
);

// **********
// HOME STACK
// **********
// TODO

export const NavigationStack = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth.token === null ? (
        <LoadingScreen />
      ) : (
        <RootNavigator isSignedIn={auth.token !== ''} />
      )}
    </>
  );
};
