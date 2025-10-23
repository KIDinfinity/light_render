import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const {
    value,
    coverageId,
    productCode,
    changedFields,
    isAddProductExclusion,
  } = lodash.pick(action?.payload, [
    'value',
    'coverageId',
    'productCode',
    'changedFields',
    'isAddProductExclusion',
  ]);
  const ownCoverageList = lodash.get(state, 'processData.coverageList', []) || [];
  let ownCoverageItem: any;
  let index: any;

  if (coverageId) {
    ownCoverageItem = lodash.find(ownCoverageList, (item: any) => item?.id === coverageId);
    index = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);
  }

  const nextState = produce(state, (draftState: any) => {
    if (value) {
      if (value === 'NS') {
        if (coverageId && (!isAddProductExclusion || lodash.size(changedFields) === 1)) {
          lodash.set(draftState, `processData.coverageList[${index}]`, {
            ...ownCoverageItem,
            isShowLoading: true,
          });
        }
        if (productCode && isAddProductExclusion) {
          lodash.set(
            draftState,
            'processData.coverageList',
            lodash.map(lodash.get(draftState, 'processData.coverageList'), (item: any) => {
              if (item.coreCode === productCode) {
                return {
                  ...item,
                  isShowLoading: true,
                };
              }
              return item;
            })
          );
        }
      } else {
        lodash.set(draftState, `processData.coverageList[${index}]`, {
          ...ownCoverageItem,
          isShowLoading: false,
        });
      }
    }
  });
  return { ...nextState };
};
