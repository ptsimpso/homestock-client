import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Spinner } from '@ui-kitten/components';

import Header from '../../components/general/header/header.component';
import { MENU_ACTION } from '../../utils/constants';
import HomeService from "../../services/home-service";

import styles from './styles';

const HomeScreen = ({ navigation }) => {
  const homes = useSelector((state) => state.homes);
  const dispatch = useDispatch();

  renderTitle = () => {
    return homes.selectedHome ? homes.selectedHome.name : 'Loading...';
  }

  renderContent = () => {
    if (!homes.all) {
      return (
        <View style={styles.loadingContainer}>
          <Spinner size="medium" />
        </View>
      );
    } else {
      return (
        <Text>num homes: {homes.all.length}</Text>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header title={renderTitle()} leftAction={MENU_ACTION} />
      {renderContent()}
    </View>
  );
};

export default HomeScreen;
