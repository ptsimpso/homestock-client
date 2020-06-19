import React from 'react';
import { View } from 'react-native';
import { Divider, TopNavigation, Text, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import AuthService from '../../services/auth-service';
import styles from './styles';

const ProfileScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TopNavigation title="Profile" alignment="center" />
      <Divider />
      <Text>User name: {auth.currentUser.name}</Text>
      <Button
        onPress={() => {
          const authService = new AuthService();
          authService.signOut(dispatch);
        }}
      >
        Log Out
      </Button>
    </View>
  );
};

export default ProfileScreen;
