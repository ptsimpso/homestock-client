import FormData from 'form-data';

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

const saveItemImage = async (itemId, uri, fileName) => {
  const base = createBase();
  base.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  base.defaults.headers.post.Accept = 'application/json';

  const data = new FormData();
  data.append('img', {
    name: fileName,
    uri,
  });

  try {
    await base.post(`/items/${itemId}/image`, data);
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
  saveItemImage,
};
