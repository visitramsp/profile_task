const isRequired = (value, message) => {
  return value ? { status: false, msg: null } : { status: true, msg: message };
};

const validateAlphanumeric = (value, errMsg1, errMsg2) => {
  const result = value.trim();
  const regex = /^[a-zA-Z0-9 ]$/;
  if (result && regex.test(result)) {
    return { status: false, msg: null };
  }
  return value
    ? { status: false, error: errMsg1 }
    : { status: false, error: errMsg2 };
};

const validationRule = {
  isRequired,
  validateAlphanumeric
};

export default validationRule;
