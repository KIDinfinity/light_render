import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

export default function revertPreivewModeData(state: any, {}: any) {
  return produce(state, (draftState: any) => {
    draftState.previewModeData.letters = draftState.previewModeData?.letters?.map((item) => ({
      ...item,
      after: {
        ...item.after,
        params: {
          ...item.before.params,
          previewAttachFiles: item.after?.params?.previewAttachFiles,
        },
      },
    }));
    draftState.previewRevert = uuidv4();
    draftState.isChange = false;
  });
}
