import { produce } from 'immer';
import { isBoolean } from 'lodash';

export default (state: any, { payload }: any) => {
  return produce(state, (draft: any) => {
    draft.modalShow =
      payload && isBoolean(payload.modalShow) ? payload.modalShow : !draft.modalShow;
  });
};
