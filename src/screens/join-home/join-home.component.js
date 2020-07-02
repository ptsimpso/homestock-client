import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Spinner } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import HomeService from '../../services/home-service';
import { showAlert } from '../../redux/actions';

import Header from '../../components/general/header/header.component';
import { MENU_ACTION } from '../../utils/constants';

import styles from './styles';

const JoinHomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const dispatch = useDispatch();

  const renderLoading = (props) => {
    if (isLoading) {
      return (
        <View style={[props.style, styles.loading]}>
          <Spinner size="small" status="control" />
        </View>
      );
    }

    return null;
  };

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const homeService = new HomeService();
      await homeService.joinHome(joinCode, dispatch);
      navigation.navigate('HomeMain');
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Join Home" leftAction={MENU_ACTION} />
      <View style={styles.form}>
        <Input
          placeholder="Join Code"
          value={joinCode}
          onChangeText={setJoinCode}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Button
          accessoryLeft={renderLoading}
          style={styles.submitButton}
          onPress={onSubmit}
        >
          {!isLoading ? 'Join' : null}
        </Button>
      </View>
    </View>
  );
};

export default JoinHomeScreen;
