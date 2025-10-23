import { produce } from 'immer';
import { ESplitTypes } from 'claim/pages/CaseSplit/_models/dto/splitTypes';

export default (state: any, { payload: { splitType, init } }: any) => {
  return produce(state, (draft: any) => {
    draft.splitType = init ? ESplitTypes[splitType] : splitType;
  });
};
