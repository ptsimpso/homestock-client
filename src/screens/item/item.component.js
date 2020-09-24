import React, { useState } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Button, Spinner, Text } from '@ui-kitten/components';

import Header from '../../components/general/header/header.component';
import { BACK_ACTION } from '../../utils/constants';
import HomeService from '../../services/home-service';
import { showAlert } from '../../redux/actions';

import styles from './styles';

const ItemScreen = ({ navigation, route }) => {

  const { item = {} } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(item.name);
  const [restock, setRestock] = useState(
    item.restock ? item.restock.toString() : ''
  );
  const [quantity, setQuantity] = useState(
    item.quantity ? item.quantity.toString() : ''
  );
  const [imgData, setImgData] = useState(null);

  const submitTitle = item._id ? 'Save Item' : 'Add Item';

  // FUNCTIONS

  const onSubmit = () => {
    // TODO
  };

  // RENDERING

  const renderTitle = () => {
    if (item._id) {
      return 'Edit Item';
    }

    return 'Add Item';
  };

  const renderImage = () => {
    if (imgData || item.img) {
      return (
        <Image style={styles.image} source={{ uri: imgData || item.img }} />
      );
    } else {
      return <Text style={styles.imagePlaceholder}>Add{'\n'}Image</Text>;
    }
  };

  const renderLoading = (props) => {
    if (isLoading) {
      return (
        <View style={[props.style, styles.loading]}>
          <Spinner size="small" status="control" />
        </View>
      );
    }

    return null;
  };

  const renderContent = () => {
    return (
      <>
        <TouchableOpacity style={styles.imageContainer}>
          {renderImage()}
        </TouchableOpacity>
        <Input
          label="Item name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Input
          label="Restock threshold"
          placeholder="0"
          value={restock}
          onChangeText={setRestock}
          keyboardType="number-pad"
          style={styles.input}
        />
        <Input
          label="Current quantity"
          placeholder="0"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
          style={styles.input}
        />
        <Button
          onPress={onSubmit}
          accessoryLeft={renderLoading}
          style={styles.submitButton}
        >
          {!isLoading && submitTitle}
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={renderTitle()} leftAction={BACK_ACTION} />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>{renderContent()}</View>
      </SafeAreaView>
    </View>
  );
};

export default ItemScreen;
