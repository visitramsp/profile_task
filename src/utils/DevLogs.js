export const LogEvents = ({ label, msg, enableLogs = true }) => {
  if (__DEV__) {
    if (enableLogs) {
      // eslint-disable-next-line no-restricted-syntax
      console.log({
        label,
        msg: JSON.stringify(msg)
      });
    }
  }
};
