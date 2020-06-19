import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import {
  TopNavigation,
  Icon,
  TopNavigationAction,
  Divider,
  useStyleSheet,
  Text,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { BACK_ACTION, MENU_ACTION } from '../../../utils/constants';
import stylesheet from './styles';

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;
const MenuIcon = (props) => <Icon {...props} name="menu" />;

const Header = ({ title, leftAction }) => {
  const styles = useStyleSheet(stylesheet);

  const navigation = useNavigation();
  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      appearance="control"
      onPress={() => navigation.goBack()}
    />
  );
  const renderMenuAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      appearance="control"
      onPress={() => navigation.openDrawer()}
    />
  );

  let renderLeftAction = null;
  switch (leftAction) {
    case BACK_ACTION:
      renderLeftAction = renderBackAction;
      break;
    case MENU_ACTION:
      renderLeftAction = renderMenuAction;
      break;
    default:
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <TopNavigation
        alignment="center"
        title={(evaProps) => (
          <Text {...evaProps} style={{ ...evaProps.style, ...styles.title }}>
            {title}
          </Text>
        )}
        left
        accessoryLeft={renderLeftAction}
        style={styles.nav}
      />
      <Divider />
    </SafeAreaView>
  );
};

export default Header;
