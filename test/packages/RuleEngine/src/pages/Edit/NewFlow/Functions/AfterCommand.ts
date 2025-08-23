/**
 * 操作命令之后
 */
import lodash from 'lodash';
import AddEnd from './AddEnd';
import AddJoin from './AddJoin';
import AddEdgeDefalt from './AddEdgeDefalt';
import RemoveRule from './RemoveRule';
import RemoveBranch from './RemoveBranch';
import RemoveEnd from './RemoveEnd';
import { CommandName, NodeType } from '../Enum';

interface IProps {
  name: string;
  type: string;
  params: any;
  graph: any;
}
// 目前只支持在end节点上添加汇合节点
export default ({ name, type, params, graph }: IProps): any => {
  const submitData = graph?.cfg?.submitData || {};
  if (lodash.isEmpty(submitData)) return;
  const flowNodeVOs = submitData.flowNodeVOs || [];
  const branchVOs = submitData.branchVOs || [];

  let submit = {};

  switch (name) {
    case CommandName.REMOVE: {
      if (type !== 'node') return;
      const nodeList = Object.values(params?.nodes) || [];
      nodeList.forEach((el: any) => {
        const { item, id }: any = el;
        const { nodeType } = item;
        switch (nodeType) {
          case NodeType.SubRuleSet: {
            submit = {
              ...RemoveRule({ flowNodeVOs, item, id }),
            };
            break;
          }
          case NodeType.Branch: {
            submit = {
              ...RemoveBranch({ branchVOs, flowNodeVOs, item, id }),
            };
            break;
          }
          default:
            break;
        }
        // end节点
        if (Number(id) === 999) {
          submit = {
            ...RemoveEnd({ flowNodeVOs, item, id, branchVOs }),
          };
        }
      });
      break;
    }
    // 新增end节点
    case CommandName.ADD: {
      submit = { ...AddEnd({ flowNodeVOs, branchVOs }) };
      break;
    }
    // 新增汇合节点
    case CommandName.JoinNode: {
      submit = { ...AddJoin({ flowNodeVOs, branchVOs, edges: params.edges }) };
      break;
    }
    // 新增边(TODO:暂时不处理移动branch的情况)
    case CommandName.DragAddEdge: {
      submit = { ...AddEdgeDefalt({ flowNodeVOs, branchVOs, params }) }

      break;
    }
    default:
      break;
  }

  return submit;
};
