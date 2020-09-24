import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button } from '@ui-kitten/components';

import Header from '../../components/general/header/header.component';
import { MENU_ACTION, MORE_ACTION } from '../../utils/constants';
import ItemList from './item-list/item-list.component';
import MoreMenu from './more-menu/more-menu.component';
import HomeService from '../../services/home-service';
import { showAlert } from '../../redux/actions';

import styles from './styles';

const HomeScreen = ({ navigation }) => {
  const homes = useSelector((state) => state.homes);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();

  // ACTIONS

  const onRefresh = async () => {
    setRefreshing(true);

    const homeService = new HomeService();
    await homeService.fetchHomes(dispatch);
    setRefreshing(false);
  };

  const onMoreAction = () => {
    setMenuVisible(true);
  };

  const onMenuDismiss = () => {
    setMenuVisible(false);
  };

  const onAddItem = () => {
    onMenuDismiss();
    navigation.navigate('Item');
  };

  const onLeaveHome = () => {
    onMenuDismiss();
    dispatch(
      showAlert(
        undefined,
        'Are you juse you want to leave this home?',
        'Confirm',
        true,
        async () => {
          const homeService = new HomeService();
          homeService.leaveHome(homes.selectedHome._id, dispatch);
        }
      )
    );
  };

  const onItemPress = (item) => {
    navigation.navigate('Item', { item });
  };

  // RENDERING

  const renderTitle = () => {
    if (homes.selectedHome) {
      return homes.selectedHome.name;
    }
    if (!homes.all) {
      return 'Loading...';
    }

    return 'Home';
  };

  const renderContent = () => {
    if (!homes.all) {
      return (
        <View style={styles.loadingContainer}>
          <Spinner size="medium" />
        </View>
      );
    } else if (homes.all.length === 0) {
      return (
        <View style={styles.placeholderContainer}>
          <Button
            onPress={() => navigation.navigate('CreateHome')}
            style={styles.placeholderButton}
          >
            Create Home
          </Button>
          <Button
            onPress={() => navigation.navigate('JoinHome')}
            style={styles.placeholderButton}
          >
            Join Home
          </Button>
        </View>
      );
    } else {
      return (
        <ItemList
          items={homes.selectedHome.items}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onItemPress={onItemPress}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={renderTitle()}
        leftAction={MENU_ACTION}
        rightAction={MORE_ACTION}
        rightActionCallback={onMoreAction}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>{renderContent()}</View>
      </SafeAreaView>
      <MoreMenu
        onDismiss={onMenuDismiss}
        isVisible={menuVisible}
        onAddItem={onAddItem}
        onLeaveHome={onLeaveHome}
        joinCode={homes.selectedHome ? homes.selectedHome.joinCode : ''}
      />
    </View>
  );
};

export default HomeScreen;
