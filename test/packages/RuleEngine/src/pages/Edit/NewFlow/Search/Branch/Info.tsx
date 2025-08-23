import React, { useEffect } from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';

interface IProps {
  form?: any;
  taskNotEditable: boolean;
  dispatch: any;
  branchId: string;
  optionType: string;
}

const ConditionItem = ({ form, dispatch, taskNotEditable, branchId, optionType }: IProps) => {
  const branchVOs = useSelector(
    (state: any) => state.ruleEngineController.submitRuleSet?.branchVOs || []
  );

  useEffect(() => {
    const flowNodeItem =
      lodash
        .chain(branchVOs)
        .find((el: any) => el.id === branchId)
        .value() || {};
    if (!lodash.isEmpty(flowNodeItem)) {
      dispatch({
        type: 'ruleEngineController/updateNewRuleFlowBranchInfo',
        payload: {
          type: optionType,
          flowNodeItem,
        },
      });
    }
  }, []);
  return (
    <FormSection
      form={form}
      formId="FormData_info"
      title=""
      isHideBgColor
      layConf={{
        default: 16,
        branchName: 8,
      }}
      isMargin={false}
    >
      <FormItemInput
        form={form}
        formName="branchName"
        labelId="Branch Name"
        name="branchName"
        required
        disabled={taskNotEditable}
      />
      <FormItemInput
        form={form}
        formName="branchDescription"
        labelId="Branch Description"
        disabled={taskNotEditable}
      />
    </FormSection>
  );
};

export default connect(({ claimEditable, ruleEngineController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  branchInfo: ruleEngineController.newRulFlow?.branchInfo || {},
}))(
  Form.create<IProps>({
    onFieldsChange(props: IProps, changedFields: any) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch }: any = props;
        dispatch({
          type: 'ruleEngineController/updateNewRuleFlowBranchInfo',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { branchInfo }: any = props;
      return formUtils.mapObjectToFields(branchInfo);
    },
  })(ConditionItem)
);
