import React from 'react';
import { View, FlatList, Image, RefreshControl } from 'react-native';
import { Text, Divider, useStyleSheet } from '@ui-kitten/components';

import stylesheet from './styles';

const ItemList = ({ items, refreshing, onRefresh }) => {
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
      <View style={styles.itemContainer}>
        {renderImage(item.img)}
        <Text style={styles.title} category="h6">
          {item.name}
        </Text>
        <Text style={styles.quantity} category="h1" appearance="hint">
          {item.quantity}
        </Text>
        {renderRestockIndicator(item)}
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <Divider />}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default ItemList;
