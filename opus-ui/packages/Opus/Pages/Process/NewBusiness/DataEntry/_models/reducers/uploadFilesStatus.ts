import { produce } from 'immer';
import type { StateModel } from 'packages/Opus/Modules/Document/_dto/model';

/**
 * 更新document数据
 */
export default (state: any, { payload = {} }: any) => {
  return produce(state, (draftState: any) => {
    const draft: StateModel = draftState;
    const { uploadFilesStatus } = payload;
    draft.uploadFilesStatus = { ...uploadFilesStatus };
  });
};
