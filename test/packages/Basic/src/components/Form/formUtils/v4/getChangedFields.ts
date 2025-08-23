
const getChangedFields = (changedFields: any[]) => {
  return changedFields?.reduce((res, cur) => ({
    ...res,
    [cur?.name[0]]: {
      ...cur,
      name: cur.name[0]
    }
  }), {})
};

export default getChangedFields;
