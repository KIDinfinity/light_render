import React, { useEffect } from 'react';
import { connect } from 'dva';
import RuleFlowEditor from './RuleFlowEditor';

export default connect(({ claimEditable, ruleEngineController }) => ({
  submitRuleSet: ruleEngineController.submitRuleSet,
  modalStatus: ruleEngineController.modalStatus,
  taskNotEditable: claimEditable.taskNotEditable,
}))((props) => {
  const { submitRuleSet, modalStatus, taskNotEditable, dispatch } = props;

  useEffect(() => {
    if (submitRuleSet) {
      dispatch({
        type: 'ruleEngineController/flowInit',
      });
    }

    return () => {
      dispatch({
        type: 'ruleEngineController/flowClearGraph',
      });
    };
  }, []);

  return (
    <>
      {submitRuleSet && submitRuleSet.flowNodeVOs && submitRuleSet.branchVOs && (
        <RuleFlowEditor
          submitRuleSet={submitRuleSet}
          flowNodeVOs={submitRuleSet.flowNodeVOs}
          branchVOs={submitRuleSet.branchVOs}
          modalStatus={modalStatus}
          taskNotEditable={taskNotEditable}
        />
      )}
    </>
  );
});
