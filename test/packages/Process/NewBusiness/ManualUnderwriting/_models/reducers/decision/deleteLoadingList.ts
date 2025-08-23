import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);

  for (const coverageItem of state.processData.coverageList) {
    coverageItem.coverageLoadingList =
      coverageItem.coverageLoadingList?.filter((item) => item.id !== id && item.copyId !== id) ||
      [];
  }
};
