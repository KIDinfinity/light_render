import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any) => {
  const id = uuidv4();
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList =
      lodash.get(draftState, 'businessData.policyList[0].clientInfoList', []) || [];

    // isManuallyAdded用来识别是否手动添加的client，删除的时候方便过滤掉，不然confirm的时候这条数据还在，会报错
    lodash.set(draftState, 'businessData.policyList[0].clientInfoList', [
      {
        id,
        isManuallyAdded: 1,
      },
      ...clientInfoList,
    ]);
    lodash.set(draftState, 'expendedClient', '');
  });
  return { ...nextState };
};
