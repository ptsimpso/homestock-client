import React from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  Icon,
  Divider,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';

import NavOption from './nav-option/nav-option.component';
import stylesheet from './styles';

const SideMenu = ({ navigation }) => {
  const styles = useStyleSheet(stylesheet);
  const theme = useTheme();

  const onProfilePress = () => {
    navigation.navigate('Profile');
    navigation.closeDrawer();
  };

  const onCreateHomePress = () => {
    navigation.navigate('CreateHome');
    navigation.closeDrawer();
  };

  const onJoinHomePress = () => {
    navigation.closeDrawer();
  };

  const renderHomes = () => {
    // TODO: User reducer. If homes exist, render them
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
