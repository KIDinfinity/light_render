import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (action: any, { call, put, select }) {
  const { policyInfo, selectedTransactionTypes, processList } = yield select((state) => ({
    policyInfo: state.batchCreateProcess.policyInfo,
    ...lodash.pick(state.batchCreateProcess, [
      'polickInfo',
      'selectedTransactionTypes',
      'processList',
    ]),
  }));

  return {
    policyInfo: {
      ...policyInfo,
      posRequestInformation: formUtils.cleanValidateData(policyInfo?.posRequestInformation),
    },
    selectedTransactionTypes,
    processList,
  };
}
