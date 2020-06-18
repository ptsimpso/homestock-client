import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, TopNavigation, Text, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import AuthService from '../../services/auth-service';

const ProfileScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
