import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import AuthService from '../../services/auth-service';
import HomeService from '../../services/home-service';

import styles from './styles';

const LoadingScreen = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const performInitialLaunchPrep = async () => {
      const authService = new AuthService();
      const isLoggedIn = await authService.loadUserFromStorage(dispatch);

      if (isLoggedIn) {
        const homeService = new HomeService();
        homeService.fetchHomes(dispatch);
      }
    }

    performInitialLaunchPrep()
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        style={styles.icon}
        fill={theme['color-primary-default']}
        name="home"
      />
    </SafeAreaView>
  );
};

export default LoadingScreen;
