import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { fileId } = payload;
    draftState.uploadFiles = lodash.filter((item: any) => item.fileId !== fileId);
  });
};
