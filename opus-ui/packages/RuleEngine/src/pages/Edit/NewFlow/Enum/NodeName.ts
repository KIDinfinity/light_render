/**
 * 枚举 - 节点类型名字
 */
enum NodeName {
  /** 流程模式的基础节点 */
  BaseNode = 'baseNode',
  /** 流程模式的可编辑节点 - 查看|删|编辑 */
  EditNode = 'editNode',
  /** 流程模式的空节点 - 可以转换为DoNode或DecisionNode */
  EmptyNode = 'emptyNode',
  /** 流程模式的行为节点 */
  DoNode = 'doNode',
  /** 流程模式的分支节点 */
  DecisionNode = 'decisionNode',
  /** 流程模式的开始节点 */
  StartNode = 'startNode',
  /** 流程模式的结束节点 */
  EndNode = 'endNode',
  /** 流程模式的汇合节点 */
  JoinNode = 'joinNode',
  /** RuleSet节点 */
  RuleSetNode = 'ruleSetNode',
  /** 流程模式的分支节点的加号节点 */
  DecisionAddNode = 'DecisionAddNode',
}

export default NodeName;
