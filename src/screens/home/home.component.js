import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, TopNavigation, Text, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import AuthService from '../../services/auth-service';

const HomeScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TopNavigation title="Home Screen" alignment="center" />
      <Divider />
    </SafeAreaView>
  );
};

export default HomeScreen;
