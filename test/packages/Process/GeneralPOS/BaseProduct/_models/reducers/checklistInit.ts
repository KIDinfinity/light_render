/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import filterCheckList from '../../utils/filterCheckList';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, remark, doubleTransaction } = payload;
    const processData = draftState.processData;
    const oldCheckList = draftState.entities.transactionTypesMap[transactionId]?.checkList;

    const checkList = filterCheckList({
      checkList: oldCheckList,
      processData,
    });
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
          lodash.set(
            draftState,
            `entities.transactionTypesMap[${transactionIdItem}].checkList`,
            remark.map((r) => ({
              code: r?.checkCode || r,
              value: 'N',
            }))
          );
        });
      }
      if (!doubleTransaction) {
        lodash.set(
          draftState,
          `entities.transactionTypesMap[${transactionId}].checkList`,
          remark.map((r) => ({
            code: r?.checkCode || r,
            value: 'N',
          }))
        );
      }
    }
  });
