export default (state: any, action: any) => {
  return {
    ...state,
    reminderIndex: action?.payload?.reminderIndex,
  };
};
