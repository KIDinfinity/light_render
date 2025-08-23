import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { list } = payload;
  const auditList = lodash.orderBy(lodash.uniqBy([...list, ...state.auditList], 'id'), 'date', 'desc');
  return {
    ...state,
    auditList,
  };
};
