import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) => {
  const { changedFields, validating, transactionId, dicts } = payload || {};

  const productName = lodash
    .chain(dicts)
    .find(({ dictCode }: any) => dictCode === formUtils.queryValue(changedFields.productCode))
    .get('dictName')
    .value();

  const nextState = produce(state, (draftState: any) => {
    const deleteRider = draftState.entities.transactionTypesMap?.[transactionId]?.deleteRider || {};

    if (!validating) {
      draftState.entities.transactionTypesMap[transactionId].deleteRider = {
        riderList: [
          ...(deleteRider?.riderList || []),
          {
            id: uuidv4(),
            insuredId: '',
            ...changedFields,
            productName,
          },
        ],
      };
    }
  });
  return { ...nextState };
};
