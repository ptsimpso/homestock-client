import createBase from './helpers/createBase';
import handleError from './helpers/handleError';

const createHome = async (name, joinCode) => {
  const base = createBase();

  try {
    const { data } = await base.post('/homes', {
      name,
      joinCode,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

const joinHome = async (joinCode) => {
  const base = createBase();

  try {
    const { data } = await base.post('/homes/join', {
      joinCode,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

const fetchHomes = async () => {
  const base = createBase();

  try {
    const { data } = await base.get('/homes');

    return data;
  } catch (error) {
    handleError(error);
  }
};

const leaveHome = async (id) => {
  const base = createBase();

  try {
    await base.post(`/homes/${id}/leave`);
  } catch (error) {
    handleError(error);
  }
};

export default {
  createHome,
  joinHome,
  fetchHomes,
  leaveHome,
};
