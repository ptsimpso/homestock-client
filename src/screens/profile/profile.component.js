import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Spinner } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/general/header/header.component';

import AuthService from '../../services/auth-service';
import HomeService from '../../services/home-service';
import { MENU_ACTION } from '../../utils/constants';
import styles from './styles';
import { showAlert } from '../../redux/actions';

const ProfileScreen = ({ navigation }) => {
  const [isPassLoading, setIsPassLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateUserPass = async (password) => {
    try {
      setIsPassLoading(true);
      const authService = new AuthService();
      await authService.updateUser(auth.token, { password }, dispatch);
      dispatch(showAlert('Success', 'Password updated.'));
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
    }
    setIsPassLoading(false);
  };

  const onUpdatePass = () => {
    const inputData = {
      autoCorrect: false,
      autoCapitalize: 'none',
      secureTextEntry: true,
    };

    dispatch(
      showAlert(
        'New Password',
        null,
        inputData,
        'Save',
        true,
        (newPassword) => {
          updateUserPass(newPassword);
        }
      )
    );
  };

  const onLogOut = () => {
    const authService = new AuthService();
    authService.signOut(dispatch);

    const homeService = new HomeService();
    homeService.clearHomeData(dispatch);
  };

  // RENDERING

  const renderPassLoading = (props) => {
    if (isPassLoading) {
      return (
        <View style={[props.style, styles.loading]}>
          <Spinner size="small" status="control" />
        </View>
      );
    }

    return null;
  };

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
          onPress={onUpdatePass}
          style={styles.updatePassButton}
          accessoryLeft={renderPassLoading}
        >
          {!isPassLoading && 'Update Password'}
        </Button>
        <Button onPress={onLogOut} style={styles.logOutButton}>
          Log Out
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
