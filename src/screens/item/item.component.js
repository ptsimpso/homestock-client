import React, { useState } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input, Button, Spinner, Text } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';

import Header from '../../components/general/header/header.component';
import { BACK_ACTION } from '../../utils/constants';
import HomeService from '../../services/home-service';
import ItemService from '../../services/item-service';
import { showAlert } from '../../redux/actions';

import styles from './styles';

const ItemScreen = ({ navigation, route }) => {

  // Nav params
  const { item = {}, homeId } = route.params || {};

  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [name, setName] = useState(item.name);
  const [restock, setRestock] = useState(
    item.restockThreshold ? item.restockThreshold.toString() : ''
  );
  const [quantity, setQuantity] = useState(
    item.quantity ? item.quantity.toString() : ''
  );
  const [imgData, setImgData] = useState(null);

  const dispatch = useDispatch();

  // FUNCTIONS

  const onImagePress = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const { uri, type } = response;
        setImgData({
          uri,
          type,
        });
      }
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const itemService = new ItemService();
    const homeService = new HomeService();

    try {
      let newItem;
      if (item._id) {
        // Editing an item
        newItem = await itemService.editItem(item._id, name, quantity, restock);
      } else {
        // Adding new item
        newItem = await itemService.createItem(homeId, name, quantity, restock);
      }
      if (imgData) {
        await itemService.saveItemImage(newItem._id, imgData);
      }
      await homeService.fetchHomes(dispatch);
      navigation.goBack();
    } catch (error) {
      dispatch(showAlert('Oops!', error.message));
      setIsLoading(false);
    }
  };

  const onDelete = () => {
    dispatch(
      showAlert('Are you sure?', null, 'Confirm', true, async () => {
        setIsDeleteLoading(true);
        const itemService = new ItemService();
        const homeService = new HomeService();
        try {
          await itemService.deleteItem(item._id);
          await homeService.fetchHomes(dispatch);
          navigation.goBack();
        } catch (error) {
          dispatch(showAlert('Oops!', error.message));
          setIsDeleteLoading(false);
        }
      })
    );
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
        <Image
          style={styles.image}
          source={{ uri: imgData ? imgData.uri : item.img }}
        />
      );
    } else {
      return <Text style={styles.imagePlaceholder}>Add{'\n'}Image</Text>;
    }
  };

  const renderSpinner = (props) => {
    return (
      <View style={[props.style, styles.loading]}>
        <Spinner size="small" status="control" />
      </View>
    );
  };

  const renderLoading = (props) => {
    if (isLoading) {
      return renderSpinner(props);
    }

    return null;
  };

  const renderDeleteLoading = (props) => {
    if (isDeleteLoading) {
      return renderSpinner(props);
    }

    return null;
  };

  const renderDeleteButton = () => {
    if (item._id) {
      return (
        <Button
          onPress={onDelete}
          accessoryLeft={renderDeleteLoading}
          style={styles.submitButton}
          disabled={isDeleteLoading}
          status="danger"
        >
          {!isDeleteLoading && 'Delete'}
        </Button>
      );
    }

    return null;
  };

  const submitTitle = item._id ? 'Save Item' : 'Add Item';

  const renderContent = () => {
    return (
      <>
        <TouchableOpacity style={styles.imageContainer} onPress={onImagePress}>
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
          disabled={isLoading}
        >
          {!isLoading && submitTitle}
        </Button>
        {renderDeleteButton()}
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
