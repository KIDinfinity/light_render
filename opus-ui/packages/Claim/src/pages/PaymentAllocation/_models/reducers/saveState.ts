export default (_: any, action: any) => {
  return { ...action.payload };
};
