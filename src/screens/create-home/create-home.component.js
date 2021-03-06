import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Spinner, Text } from '@ui-kitten/components';
import Clipboard from '@react-native-community/clipboard';
import { useDispatch } from 'react-redux';

import HomeService from '../../services/home-service';
import { showAlert } from '../../redux/actions';

import Header from '../../components/general/header/header.component';
import { MENU_ACTION } from '../../utils/constants';

import styles from './styles';

const CreateHomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
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
      await homeService.createHome(name, joinCode, dispatch);
      navigation.navigate('HomeMain');
      Clipboard.setString(joinCode);
      dispatch(
        showAlert(
          'Join Code',
          'Your join code has been copied to the clipboard.'
        )
      );
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Create Home" leftAction={MENU_ACTION} />
      <View style={styles.form}>
        <Input
          placeholder="Home Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          style={styles.input}
        />
        <Input
          placeholder="Join Code"
          value={joinCode}
          onChangeText={setJoinCode}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Text category="c2" appearance="hint">
          Send your custom join code to anyone you would like to join your home.
        </Text>
        <Button
          accessoryLeft={renderLoading}
          style={styles.submitButton}
          onPress={onSubmit}
        >
          {!isLoading ? 'Create' : null}
        </Button>
      </View>
    </View>
  );
};

export default CreateHomeScreen;
