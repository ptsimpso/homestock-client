import createBase from './helpers/createBase';
import handleError from './helpers/handleError';

const signUp = async (name, email, password) => {
  const base = createBase();

  try {
    const { data } = await base.post('/auth/signup', {
      name,
      email,
      password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

const signIn = async (email, password) => {
  const base = createBase();

  try {
    const { data } = await base.post('/auth/login', {
      email,
      password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

const signOut = async () => {
  const base = createBase();

  try {
    await base.post('/auth/logout');
  } catch (error) {
    handleError(error);
  }
};

export default {
  signUp,
  signIn,
  signOut,
};
