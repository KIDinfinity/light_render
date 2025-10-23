import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any = {}) => {
  const { documentItem } = payload;
  return produce(state, (draftState: any) => {
    const draft = draftState;

    if (!lodash.isEmpty(documentItem)) {
      draft.fileObject = {
        imageId: documentItem?.image,
        name: documentItem?.name,
        mimeType: documentItem?.mimeType,
      };
    } else {
      draft.fileObject = {};
    }
  });
};
