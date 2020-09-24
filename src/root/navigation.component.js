import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import LoadingScreen from '../screens/loading/loading.component';
import SignUpScreen from '../screens/signup/signup.component';
import LoginScreen from '../screens/login/login.component';
import HomeScreen from '../screens/home/home.component';
import ProfileScreen from '../screens/profile/profile.component';
import CreateHomeScreen from '../screens/create-home/create-home.component';
import JoinHomeScreen from '../screens/join-home/join-home.component';
import ItemScreen from '../screens/item/item.component';

import SideMenu from '../components/general/side-menu/side-menu.component';

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
const MainNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(navProps) => <SideMenu {...navProps} />}
  >
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Home" component={HomeNavigator} />
    <Drawer.Screen name="CreateHome" component={CreateHomeScreen} />
    <Drawer.Screen name="JoinHome" component={JoinHomeScreen} />
  </Drawer.Navigator>
);

// **********
// HOME STACK
// **********
const HomeStack = createStackNavigator();
const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="Item" component={ItemScreen} />
  </HomeStack.Navigator>
);

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
