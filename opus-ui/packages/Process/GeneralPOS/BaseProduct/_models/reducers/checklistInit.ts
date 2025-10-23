/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, remark, doubleTransaction } = payload;

    const checkList = draftState.entities.transactionTypesMap[transactionId].checkList;
    // 初始化没有值，或者选择其他条件后导致checklist的数量变更导致的初始化。
    if (
      (!lodash.isArray(checkList) ||
        checkList?.length !== remark?.length ||
        !lodash.isEqual(
          lodash.sortBy(checkList?.map((i) => i?.code)),
          lodash.sortBy(remark.map((item) => item?.checkCode || item))
        )) &&
      lodash.isArray(remark)
    ) {
      if (doubleTransaction) {
        const transactionIds = lodash.keys(draftState.entities.transactionTypesMap);
        lodash.forEach(transactionIds, (transactionIdItem) => {
          draftState.entities.transactionTypesMap[transactionIdItem].checkList = remark.map(
            (r) => ({
              code: r?.checkCode || r,
              value: 'N',
            })
          );
        });
      }
      if (!doubleTransaction) {
        draftState.entities.transactionTypesMap[transactionId].checkList = remark.map((r) => ({
          code: r?.checkCode || r,
          value: 'N',
        }));
      }
    }
  });
