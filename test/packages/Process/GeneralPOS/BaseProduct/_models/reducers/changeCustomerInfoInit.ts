/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const changeCustomerInfoList = lodash.get(state, `${transactionPath}.changeCustomerInfoList`);
    if (lodash.isEmpty(changeCustomerInfoList)) {
      lodash.set(draftState, `${transactionPath}.changeCustomerInfoList`, []);
      lodash.set(draftState, `${transactionPath}.clientInfoList`, []);
    }
  });
