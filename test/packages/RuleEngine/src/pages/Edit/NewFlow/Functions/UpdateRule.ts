/**
 * 数据处理 - 添加rule
 */
import lodash from 'lodash';

export default ({ ruleReferenceId, record, flowNodeVOs }: any) => {
  const { id, name, description } = record;

  return {
    flowNodeVOs: lodash.map(flowNodeVOs, (item: any) => {
      return item.ruleReferenceId === ruleReferenceId
        ? {
            ...item,
            decisionBranchId: '',
            ruleReferenceId: id,
            nodeName: name,
            nodeDescription: description,
          }
        : item;
    }),
  };
};
