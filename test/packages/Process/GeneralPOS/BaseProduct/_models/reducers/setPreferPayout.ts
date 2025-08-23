import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { dataKey, setPreferredPayout, transactionId } = action?.payload;
  const dataPath = `entities.transactionTypesMap[${transactionId}].paymentMethodList[0]`;

  const next = produce(state, (draftState: any) => {
    lodash.set(draftState, `${dataPath}.setPreferredPayout`, setPreferredPayout);
  });

  return { ...next };
};
