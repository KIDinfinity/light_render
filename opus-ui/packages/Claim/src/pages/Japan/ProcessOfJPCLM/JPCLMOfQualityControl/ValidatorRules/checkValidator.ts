export default ({ validator, checkValue, value, field, isShowErrors }: any) => {
  const message = validator({ checkValue, isCheck: true, value, isShowErrors });
  if (message) {
    return [
      {
        field,
        message,
      },
    ];
  }
  return undefined;
};
