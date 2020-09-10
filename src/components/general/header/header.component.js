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

import {
  BACK_ACTION,
  MENU_ACTION,
  MORE_ACTION,
} from '../../../utils/constants';
import stylesheet from './styles';

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;
const MenuIcon = (props) => <Icon {...props} name="menu" />;
const MoreIcon = (props) => <Icon {...props} name="more-vertical-outline" />;

const Header = ({ title, leftAction, rightAction, rightActionCallback }) => {
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
  const renderMoreAction = () => (
    <TopNavigationAction
      icon={MoreIcon}
      appearance="control"
      onPress={rightActionCallback}
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

  let renderRightAction = null;
  switch (rightAction) {
    case MORE_ACTION:
      renderRightAction = renderMoreAction;
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
        accessoryLeft={renderLeftAction}
        accessoryRight={renderRightAction}
        style={styles.nav}
      />
      <Divider />
    </SafeAreaView>
  );
};

export default Header;
