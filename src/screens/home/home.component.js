import React, { useState } from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button, Text, Input, Icon } from '@ui-kitten/components';

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
  const [searchValue, setSearchValue] = useState('');
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
    navigation.navigate('Item', { homeId: homes.selectedHome._id });
  };

  const onLeaveHome = () => {
    onMenuDismiss();
    dispatch(
      showAlert(
        undefined,
        'Are you sure you want\nto leave this home?',
        null,
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

    return 'Welcome!';
  };

  const renderItemContent = () => {
    const { selectedHome } = homes;

    if (selectedHome && selectedHome.items.length === 0) {
      return (
        <View style={styles.noItemContainer}>
          <Text style={styles.noItemText} category="h5" appearance="hint">
            Nothing here yet!
          </Text>
          <Button onPress={onAddItem} style={styles.placeholderButton}>
            Add Item
          </Button>
        </View>
      );
    } else {
      const renderSearchIcon = (props) => {
        return <Icon {...props} name="search-outline" />;
      };

      const renderClearSearch = (props) => (
        <TouchableWithoutFeedback onPress={() => setSearchValue('')}>
          <Icon {...props} name="close-circle-outline" />
        </TouchableWithoutFeedback>
      );

      let visibleItems = selectedHome.items;
      if (searchValue !== '') {
        visibleItems = selectedHome.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
      }

      return (
        <>
          <Input
            value={searchValue}
            onChangeText={setSearchValue}
            accessoryLeft={renderSearchIcon}
            accessoryRight={renderClearSearch}
            style={styles.searchInput}
          />
          <ItemList
            items={visibleItems}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onItemPress={onItemPress}
          />
        </>
      );
    }
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
      return renderItemContent();
    }
  };

  const rightAction = homes.selectedHome ? MORE_ACTION : null;

  return (
    <View style={styles.container}>
      <Header
        title={renderTitle()}
        leftAction={MENU_ACTION}
        rightAction={rightAction}
        rightActionCallback={onMoreAction}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>{renderContent()}</View>
      </SafeAreaView>
      {menuVisible && (
        <MoreMenu
          onDismiss={onMenuDismiss}
          onAddItem={onAddItem}
          onLeaveHome={onLeaveHome}
          joinCode={homes.selectedHome ? homes.selectedHome.joinCode : ''}
        />
      )}
    </View>
  );
};

export default HomeScreen;
