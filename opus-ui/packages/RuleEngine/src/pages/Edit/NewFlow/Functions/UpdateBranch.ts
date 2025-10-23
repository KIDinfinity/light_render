/**
 * 更新branch元件
 */
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ flowNodeVOs, branchVOs, branchInfo, branchId, conditionList }: any) => {
  const branchName = formUtils.queryValue(branchInfo?.branchName || '');
  const branchDescription = formUtils.queryValue(branchInfo?.branchDescription || '');
  return {
    ...lodash.map(flowNodeVOs, (flowVo: any) => ({
      ...flowVo,
      isEmpty: flowVo.nodeId === branchId ? false : flowVo.isEmpty,
    })),
    branchVOs: lodash.map(branchVOs, (item: any) => {
      return item.id === branchId
        ? {
            ...item,
            branchName,
            branchDescription,
            conditions: conditionList,
            isEmpty: false,
          }
        : item;
    }),
  };
};
