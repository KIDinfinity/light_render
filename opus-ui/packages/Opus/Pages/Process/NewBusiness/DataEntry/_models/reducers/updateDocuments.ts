import { produce } from 'immer';
import lodash from 'lodash';

/**
 * 更新document数据
 */
export default (state: any, { payload = {} }: any) => {
  return produce(state, (draftState: any) => {
    if(!draftState.processData.uploadDocuments?.uploadDocList){
      lodash.set(draftState, 'processData.uploadDocuments.uploadDocList', [])
    }
    draftState.processData.uploadDocuments.uploadDocList.push(...payload.documents)
  })
};
