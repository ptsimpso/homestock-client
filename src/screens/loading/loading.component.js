import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { setCurrentUser, clearCurrentUser } from '../../redux/actions';
import { STORED_USER_KEY } from '../../utils/constants';

import styles from './styles';

const LoadingScreen = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const json = await AsyncStorage.getItem(STORED_USER_KEY);
      if (json) {
        const data = JSON.parse(json);
        dispatch(setCurrentUser(data));
      } else {
        dispatch(clearCurrentUser());
      }
    };
    fetchUser();
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
