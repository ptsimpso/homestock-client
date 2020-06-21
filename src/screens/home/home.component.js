import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';

import Header from '../../components/general/header/header.component';
import { MENU_ACTION } from '../../utils/constants';

import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Home" leftAction={MENU_ACTION} />
    </View>
  );
};

export default HomeScreen;
