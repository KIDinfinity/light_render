import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields, id, dicts, transactionId, validating } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const riderList =
      draftState.entities.transactionTypesMap?.[transactionId]?.deleteRider?.riderList || [];

    const productCode = formUtils.queryValue(changedFields.productCode);
    const productName = lodash
      .chain(dicts)
      .find(({ dictCode }: any) => dictCode === productCode)
      .get('dictName')
      .value();

    draftState.entities.transactionTypesMap[transactionId].deleteRider.riderList = lodash
      .chain(riderList)
      .map((el: any) => {
        if (el.id === id && validating) {
          return {
            ...el,
            ...changedFields,
          };
        }

        if (el.id === id && !validating) {
          return {
            ...el,
            ...changedFields,
            productName,
          };
        }

        return el;
      })
      .value();
  });
  return { ...nextState };
};
