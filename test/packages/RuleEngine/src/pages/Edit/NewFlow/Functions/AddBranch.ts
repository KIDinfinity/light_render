/**
 * 数据处理 - 添加- 元件 - Branch
 */
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NodeType } from '../Enum';

export default ({ flowNodeVOs, branchVOs, branchId, conditionList, branchInfo }: any) => {

  const flowBranch =
    lodash
      .chain(flowNodeVOs)
      .find((el: any) => el.nodeId === lodash.find(branchVOs, (item: any) => item.id === branchId)?.nodeId || '')
      .value() || {};

  if (!lodash.isEmpty(flowBranch)) {

    const newBranch = {
      id: uuidv4(),
      nodeId: flowBranch.nodeId,
      branchName: formUtils.queryValue(branchInfo?.branchName || ''),
      conditions: conditionList,
      // branch不需要类型
      nodeType: NodeType.Branch,
    };
    return {
      flowNodeVOs,
      branchVOs: lodash.reduce(branchVOs, (arr: any, item: any) => {
        if (item.id === branchId) {
          return [...arr, item, newBranch]
        }
        return [...arr, item]

      }, []),
    };
  }
  return {
    flowNodeVOs,
    branchVOs,
  };
};
