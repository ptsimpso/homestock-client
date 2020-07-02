import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, View, } from 'react-native';
import {
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';

import HomeService from '../../../services/home-service';

import NavOption from './nav-option/nav-option.component';
import stylesheet from './styles';

const SideMenu = ({ navigation }) => {
  const styles = useStyleSheet(stylesheet);
  const homes = useSelector((state) => state.homes);
  const dispatch = useDispatch();

  const onProfilePress = () => {
    navigation.navigate('Profile');
    navigation.closeDrawer();
  };

  const onCreateHomePress = () => {
    navigation.navigate('CreateHome');
    navigation.closeDrawer();
  };

  const onJoinHomePress = () => {
    // TODO: Join home
    navigation.closeDrawer();
  };

  const onAllHomesPress = () => {
    navToHome();
  }

  const onHomeOptionPress = (home) => {
    const homeService = new HomeService();
    homeService.selectHome(home, dispatch);
    navToHome();
  }

  const navToHome = () => {
    navigation.navigate('HomeMain');
    navigation.closeDrawer();
  }

  const renderHomes = () => {
    if (homes.all && homes.all.length > 0) {
      return (
        <NavOption
          title="Your Homes"
          iconName="home-outline"
          onPress={onAllHomesPress}
        >
          <View style={styles.homeOptionsContainer}>
            {
              homes.all.map((home) => {
                return (
                  <TouchableOpacity style={styles.homeOption} key={home._id} onPress={() => onHomeOptionPress(home)}>
                    <Text style={styles.homeOptionText} category="s1">{home.name}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </NavOption>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <NavOption
          title="Profile"
          iconName="person-outline"
          onPress={onProfilePress}
        />
        {renderHomes()}
        <NavOption
          title="Create Home"
          iconName="plus-square-outline"
          onPress={onCreateHomePress}
        />
        <NavOption
          title="Join Home"
          iconName="person-add-outline"
          onPress={onJoinHomePress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SideMenu;
