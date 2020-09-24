import itemApi from '../api/item';

class ItemService {
  constructor() {}

  createItem = async (homeId, name, quantity, restockThreshold) => {
    const quantityNum = parseInt(quantity || 0, 10);
    const restockNum = parseInt(restockThreshold || 0, 10);
    if (!this.validateItemParams(homeId, name, quantity, restockThreshold)) {
      throw new Error('Please provide all parameters.');
    }

    const item = await itemApi.createItem(
      homeId,
      name,
      quantityNum,
      restockNum
    );
    return item;
  };

  editItem = async (itemId, name, quantity, restockThreshold) => {
    const quantityNum = parseInt(quantity || 0, 10);
    const restockNum = parseInt(restockThreshold || 0, 10);
    if (!this.validateItemParams(itemId, name, quantity, restockThreshold)) {
      throw new Error('Please provide all parameters.');
    }

    const item = await itemApi.editItem(itemId, name, quantityNum, restockNum);
    return item;
  };

  deleteItem = async (itemId) => {
    await itemApi.deleteItem(itemId);
  };

  // Helpers
  validateItemParams = (id, name, quantity, restockThreshold) => {
    if (
      !id ||
      id === '' ||
      !name ||
      name === '' ||
      isNaN(quantity) ||
      isNaN(restockThreshold)
    ) {
      return false;
    }

    return true;
  };
}

export default ItemService;
