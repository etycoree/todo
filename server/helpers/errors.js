export const checkWithError = (condition, code = 500, errMessage = 'Server Internal Error') => {
  if (condition) {
    const error = new Error(errMessage);
    error.code = code;
    throw error;
  }
};

export const handleRoutesError = (err, res) => {
  if(err.code === 400) {
    return res.status(400).send(err.message);
  }

  console.error(err);
  return res.status(500).send('Server Internal Error');
};