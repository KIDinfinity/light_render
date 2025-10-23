export default (formData: any) => {
  const objData = {};
  formData.forEach((value: any, key: any) => {
    objData[key] = value;
    return null;
  });
  return objData;
};
