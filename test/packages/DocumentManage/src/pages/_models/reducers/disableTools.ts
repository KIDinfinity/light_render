import { produce }  from 'immer';
import lodash from 'lodash';
import { listenerTools } from '../state';
import type { ToolDataModel } from '../../_dto/model';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { toolsData } = draft;
    const { disabled } = payload;

    draft.toolsData = lodash.reduce(
      toolsData,
      (result, _: ToolDataModel, toolId: any) => {
        if (listenerTools.includes(toolId)) {
          lodash.set(result, `${toolId}.disabled`, disabled);
        }
        return result;
      },
      toolsData
    );
  });
};
