import React, { useEffect } from 'react';
import { connect } from 'dva';
import RuleFlowEditor from './RuleFlowEditor';

export default connect(({ ruleEngineController }) => ({
  ruleSetModalData: ruleEngineController.ruleSetModalData,
}))((props) => {
  const { ruleSetModalData, dispatch } = props;

  useEffect(() => {
    if (ruleSetModalData) {
      dispatch({
        type: 'ruleEngineController/flowModalInit',
      });
    }

    return () => {
      dispatch({
        type: 'ruleEngineController/flowClearGraph',
      });
    };
  }, []);

  return (
    ruleSetModalData && (
      <RuleFlowEditor
        submitRuleSet={ruleSetModalData}
        flowNodeVOs={ruleSetModalData.flowNodeVOs}
        branchVOs={ruleSetModalData.branchVOs}
      />
    )
  );
});
