import React from 'react';
import { View } from 'react-native';
import { Divider, TopNavigation, Text, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/general/header/header.component';

import AuthService from '../../services/auth-service';
import { MENU_ACTION } from '../../utils/constants'
import styles from './styles';

const ProfileScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header leftAction={MENU_ACTION} title="Profile" />
      <View style={styles.content}>
        <Text category="label" style={styles.label}>
          Name
        </Text>
        <Text>{auth.currentUser.name}</Text>
        <Text category="label" style={styles.label}>
          Email
        </Text>
        <Text>{auth.currentUser.email}</Text>
        <Button
          onPress={() => {
            const authService = new AuthService();
            authService.signOut(dispatch);
          }}
          style={styles.logOutButton}
        >
          Log Out
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
