import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { NavigationStack } from './navigation.component';
import Alert from '../components/general/alert/alert.component';

export const AppNavigator = () => {
  const alert = useSelector((state) => state.alert);

  return (
    <NavigationContainer>
      <NavigationStack />
      {alert.isVisible && <Alert alert={alert} />}
    </NavigationContainer>
  );
};
