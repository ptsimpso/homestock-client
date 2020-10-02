import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Divider, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import stylesheet from './styles';

const ItemList = ({ items, refreshing, onRefresh, onItemPress }) => {
  const styles = useStyleSheet(stylesheet);

  const renderImage = (image) => {
    if (image) {
      return <Image style={styles.image} source={{ uri: image }} />;
    }

    return null;
  };

  const renderRestockIndicator = (item) => {
    if (item.quantity <= item.restockThreshold) {
      return <View style={styles.restockIndicator} />;
    }

    return null;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onItemPress(item)}
      >
        {renderImage(item.img)}
        <Text style={styles.title} category="h6">
          {item.name}
        </Text>
        <Text style={styles.quantity} category="h1" appearance="hint">
          {item.quantity}
        </Text>
        {renderRestockIndicator(item)}
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareFlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <Divider />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ItemList;
