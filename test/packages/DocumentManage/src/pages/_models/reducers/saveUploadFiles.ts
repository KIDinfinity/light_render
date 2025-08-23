import { produce }  from 'immer';
import lodash from 'lodash';
import { documentInfoInit } from '../state';

const saveUploadFiles = (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { files, fileId, image, uploadList } = payload;

    if (lodash.isArray(files)) {
      draft.uploadFiles = lodash
        .chain(draft.uploadFiles)
        .concat(files)
        .compact()
        .map((file: any) => {
          const list = uploadList || [];
          const resDocsItem = lodash.find(list, (item: any) => item.fileId === file.fileId);
          return resDocsItem ? { ...file, ...resDocsItem } : { ...documentInfoInit, ...file };
        })
        .value();
    } else {
      draft.uploadFiles = [
        ...draft.uploadFiles,
        { ...documentInfoInit, file: files, fileId, image, name: files?.name },
      ];
    }
  });
};

export default saveUploadFiles;
