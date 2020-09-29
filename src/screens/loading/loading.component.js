import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import AuthService from '../../services/auth-service';
import HomeService from '../../services/home-service';
import { showAlert } from '../../redux/actions';

import styles from './styles';

const LoadingScreen = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const performInitialLaunchPrep = async () => {
      const authService = new AuthService();
      const homeService = new HomeService();
      const isLoggedIn = await authService.loadUserFromStorage(dispatch);

      if (isLoggedIn) {
        try {
          await homeService.fetchHomes(dispatch);
          await homeService.loadSelectedHomeFromStorage(dispatch);
        } catch (error) {
          dispatch(
            showAlert('Oops!', error.message, null, 'Log Out', false, () => {
              authService.signOut(dispatch);
              homeService.clearHomeData(dispatch);
            })
          );
        }
      }
    };

    performInitialLaunchPrep();
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
