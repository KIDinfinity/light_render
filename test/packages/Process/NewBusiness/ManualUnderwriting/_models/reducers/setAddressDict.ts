import { produce } from 'immer';
import lodash from 'lodash';

import { convertFieldName } from '../../_hooks/useInitAddressList';

export default (state: any, action: any) => {
  const { parentCode, fieldName, addressList, parentFieldName } = action.payload;
  const subFieldNameCoverted = convertFieldName(fieldName);
  const parentFieldNameCoverted = convertFieldName(parentFieldName);
  const nextState = produce(state, (draftState: any) => {
    draftState.addressDict[subFieldNameCoverted] = {
      ...(draftState.addressDict[subFieldNameCoverted] || {}),
      parentFieldName: parentFieldNameCoverted,
      [parentCode || 'dict']: lodash.orderBy(addressList, 'subName'),
    };

    if (parentFieldNameCoverted && lodash.has(draftState.addressDict, parentFieldNameCoverted)) {
      draftState.addressDict[parentFieldNameCoverted].childrenFieldName = subFieldNameCoverted;
    }
  });
  return {
    ...nextState,
  };
};
