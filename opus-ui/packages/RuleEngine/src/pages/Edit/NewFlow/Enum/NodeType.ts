/**
 * 枚举 - 节点类型(排除默认节点)
 */
enum NodeType {
  SubRuleSet = '01',
  SubRuleFlow = '02',
  DecisionNode = '03',
  JoinNode = '04',
  // 下面的后端没用,只用于前端flow流程图的转换
  Branch = 'branch',
}

export default NodeType;
