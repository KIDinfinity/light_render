import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields', {});
  const nextState = produce(state, (draftState: any) => {
    if (lodash.isString(changedFields.productName)) {
      const coverageList = lodash.get(draftState, 'businessData.policyList[0].coverageList');
      const coverageItem = lodash
        .chain(coverageList)
        .find((c) => c.coreCode === changedFields.productName)
        .value();
      lodash.set(draftState, 'addLoadingModalDependencies', {
        coverageId: lodash.get(coverageItem, 'id'),
        productId: lodash.get(coverageItem, 'coverageLoadingList[0].id', null),
      });
    }
    lodash.set(draftState, 'addingLoadingSelectedProduct', {
      ...state.addingLoadingSelectedProduct,
      ...changedFields,
    });
  });
  return { ...nextState };
};
