import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const branchCodeList = lodash.get(action, 'payload.branchCodeList', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'branchCodeList',
      branchCodeList.map((item: any) => ({
        ...item,
        dictCode: item.branchCode,
        dictName: item.branchName,
      }))
    );
  });
  return {
    ...nextState,
  };
};
