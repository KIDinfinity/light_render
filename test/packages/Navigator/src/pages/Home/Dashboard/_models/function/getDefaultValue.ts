export default (searchFields: any[]) => {
  return searchFields?.reduce(
    (result: any, item: any) => ({
      ...result,
      [item.fieldName]: item.defaultValue,
    }),
    {}
  );
};
