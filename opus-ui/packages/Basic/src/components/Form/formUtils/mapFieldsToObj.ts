const mapFieldsToObj = (changedFields: any) => {
  const result = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, changedField] of Object.entries(changedFields)) {
    // 注意：有验证的数据 与 无验证的数据 的区别
    result[key] = changedField;
  }
  return result;

};

export default mapFieldsToObj;
