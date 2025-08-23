import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import getDecisionBranch from '../../Utils/getDecisionBranch';
import { ModalType } from '../../Enum';

export default (state: any, action: any) => {
  const {
    params: { nodeId, onDecisionOk },
  } = action.payload;
  const branchList =
    lodash
      .chain(state)
      .get('submitRuleSet.branchVOs')
      .filter((el: any) => el.nodeId === nodeId)
      .value() || [];
  const flowNodeVO =
    lodash
      .chain(state)
      .get('submitRuleSet.flowNodeVOs')
      .find((el: any) => el.nodeId === nodeId)
      .value() || {};


  const newNodeId = uuidv4();

  const decisionEditData = lodash.isEmpty(branchList)
    ? {
      action: action.payload.action,
      flowNodeVO: {
        nodeId: newNodeId,
        nodeNameTemp: '',
        nodeDescription: '',
      },
      branchVO: {
        branchList: [getDecisionBranch({ nodeId: newNodeId })],
      },
    }
    : {
      action: action.payload.action,
      flowNodeVO: {
        ...flowNodeVO,
        nodeNameTemp: flowNodeVO.nodeName,
      },
      branchVO: {
        branchList,
      },
    };

  return {
    ...state,
    decisionEditData,
    modalOptions: {
      ...state.modalOptions,
      edit: {
        show: true,
        type: ModalType.EditDecision,
      },
    },
    actionCallBack: {
      ...state.actionCallBack,
      onDecisionOk,
    },
  };
};
