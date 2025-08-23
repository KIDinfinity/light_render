import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleMessageModal } from '@/utils/commonMessage';
import { NodeType, DefaultNode } from '../../NewFlow/Enum';

export default function* validateFields(_: any, { select }: any) {
  const flowNodeVOs = yield select(
    (state: any) => state.ruleEngineController.submitRuleSet?.flowNodeVOs || []
  );
  const branchVOs = yield select(
    (state: any) => state.ruleEngineController.submitRuleSet?.branchVOs || []
  );

  let promptMessages: any = [];
  // ruleSet 节点
  const ruleSetNodes = lodash.filter(flowNodeVOs, (el: any) => el.nodeType === NodeType.SubRuleSet);
  // end节点
  const endNode = lodash.find(flowNodeVOs, (el: any) => el.nodeId === DefaultNode.END_NODE_ID);
  // 悬空节点
  const HangingNodes = lodash.filter(
    flowNodeVOs,
    (el: any) =>
      el.nodeType !== DefaultNode.START_NODE_TYPE &&
      el.nodeId !== DefaultNode.END_NODE_ID &&
      el.isEmpty
  );
  // 孤儿节点
  const noParantNodes = lodash.filter(
    flowNodeVOs,
    (el: any) =>
      el.nodeType !== DefaultNode.START_NODE_TYPE &&
      el.nodeId !== DefaultNode.END_NODE_ID &&
      lodash.isEmpty(el.nodeIdParent)
  );

  // 还存在没有填的branch
  const noBranchNameList = lodash.filter(branchVOs, (el: any) => lodash.isEmpty(el.branchName));

  if (lodash.isEmpty(ruleSetNodes)) {
    promptMessages = [
      {
        code: 'MSG_000479',
        content: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000479',
        }),
      },
    ];
  }
  if (!endNode) {
    promptMessages = [
      ...promptMessages,
      {
        code: 'MSG_000479',
        content: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000481',
        }),
      },
    ];
  }
  if (!lodash.isEmpty(HangingNodes)) {
    promptMessages = [
      ...promptMessages,
      ...lodash.map(HangingNodes, (item: any) => {
        return {
          code: `VLD_000555_${item.nodeId}`,
          content: `${formatMessageApi({
            Label_COM_ErrorMessage: 'MSG_000480',
          })}(${item.nodeName})`,
        };
      }),
    ];
  }
  if (!lodash.isEmpty(noParantNodes)) {
    promptMessages = [
      ...promptMessages,
      ...lodash.map(HangingNodes, (item: any) => {
        return {
          code: `VLD_000557_${item.nodeId}`,
          content: `${formatMessageApi({
            Label_COM_ErrorMessage: 'MSG_000480',
          })}(${item.nodeName})`,
        };
      }),
    ];
  }
  if (!lodash.isEmpty(noBranchNameList)) {
    promptMessages = [
      ...promptMessages,
      {
        code: `VLD_000552`,
        content: `${formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000477',
        })}`,
      },
    ];
  }
  handleMessageModal(promptMessages);
  return promptMessages;
}
