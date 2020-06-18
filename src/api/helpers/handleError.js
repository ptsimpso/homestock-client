const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.error);
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
};

export default handleError;
