import { produce }  from 'immer';
import { toolDataInit } from '../state';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { toolsData = {} } = draft;
    const { toolId } = payload;

    // 若tool data不存在 则创建
    if (!toolsData?.[toolId]) {
      toolsData[toolId] = { ...toolDataInit };
    }
    // 加这个逻辑是因为下载不需要选中的状态
    toolsData[toolId].selected = toolId === 'download' ? false : !toolsData[toolId].selected;

    draft.toolsData = toolsData;
  });
};
