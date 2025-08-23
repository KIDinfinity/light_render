import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  const { documentItem } = payload;
  return produce(state, (draftState: any) => {
    const draft = draftState;
    draft.fileObject = {
      imageId: documentItem?.image,
      name: documentItem?.name,
      mimeType: documentItem?.mimeType,
    };
  });
};
