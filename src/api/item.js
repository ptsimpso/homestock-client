import createBase from './helpers/createBase';
import handleError from './helpers/handleError';

const createItem = async (homeId, name, quantity, restockThreshold) => {
  const base = createBase();

  try {
    const { data } = await base.post('/items', {
      homeId,
      name,
      quantity,
      restockThreshold,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

const editItem = async (itemId, name, quantity, restockThreshold) => {
  const base = createBase();

  try {
    const { data } = await base.patch(`/items/${itemId}`, {
      name,
      quantity,
      restockThreshold,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

const deleteItem = async (itemId) => {
  const base = createBase();

  try {
    await base.delete(`/items/${itemId}`);
  } catch (error) {
    handleError(error);
  }
};

export default {
  createItem,
  editItem,
  deleteItem,
};
