/**
 * 数据处理 - 添加- 边 - combo
 */
import lodash from 'lodash';

export default ({ flowNodeVOs, params }: any) => {
  const { sourceId, targetItem } = params;

  return {
    flowNodeVOs: lodash.map(flowNodeVOs, (flowVo: any) => ({
      ...flowVo,
      nodeIdParent:
        flowVo.nodeId === sourceId && !lodash.isEmpty(targetItem) && flowVo.nodeId === sourceId
          ? targetItem.id
          : flowVo.nodeIdParent,
    })),
  };
};
