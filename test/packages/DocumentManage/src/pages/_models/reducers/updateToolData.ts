import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { toolsData } = draft;
    const { toolId, dataKey, dataVal } = payload;

    lodash.set(toolsData, `${toolId}.${dataKey}`, dataVal);

    draft.toolsData = toolsData;
  });
};
