import { RULEENGINENODEENHANCE_PREFIX, RuleEngineNodeEnhanceNodeType } from '@ctc/g6-editor';
import { DefaultNode, NodeType } from '../Enum';

export default ({
  nodeType,
  nodeId,
}: {
  nodeType: NodeType;
  nodeId: string;
}) => {
  if (nodeId === DefaultNode.END_NODE_ID) {
    return `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.EndNode}`;
  }

  switch (nodeType) {
    case NodeType.SubRuleSet:
    case NodeType.SubRuleFlow:
      return `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.RuleSetNode}`;
    case NodeType.Branch:
      return `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.BranchNode}`;
    case NodeType.JoinNode:
      return `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.JoinNode}`;
    default:
      return `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.EmptyNode}`;
  }
};
