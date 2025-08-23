import { produce } from 'immer';
import { initSplitDocumentData } from '../utils';

export default (state: any, { payload: { claimProcessData, applicationType } }: any) => {
  return produce(state, (draft: any) => {
    draft.originalData = initSplitDocumentData(claimProcessData, applicationType);
    draft.newData = {};
    draft.claimProcessData = claimProcessData;
  });
};
