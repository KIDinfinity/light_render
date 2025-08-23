import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PosRequestInfo">
      <Fields.PolicyNo />
      <Fields.SubmissionDate />
      <Fields.SubmissionTime />
      <Fields.SubmissionChannel />

      <Fields.PolicyName />
      <Fields.PolicyIssueDate />
      <Fields.PolicyStatus />
      <Fields.AgentName />
      <Fields.AgentPhone />
      <Fields.BillToDate />
      <Fields.PaidToDate />
      <Fields.PremiumStatus />
    </Section>
  );
};

export default connect(({ claimEditable, PHBatchCreateProcessController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  sourceSystem: PHBatchCreateProcessController?.processData?.sourceSystem,
  subCaseSubmissionChannel: PHBatchCreateProcessController?.processData?.subCaseSubmissionChannel,
  subCaseSubmissionDate: PHBatchCreateProcessController?.processData?.subCaseSubmissionDate,
  mainPolicyId: PHBatchCreateProcessController?.processData?.mainPolicyId,
  policyInfo: PHBatchCreateProcessController?.processData?.policyInfo,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'PHBatchCreateProcessController/saveFormData',
          target: 'savePosRequestInformation',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const {
        mainPolicyId,
        sourceSystem,
        policyInfo,
        subCaseSubmissionDate,
        subCaseSubmissionChannel,
      } = props;

      const agentInfo =
        lodash.find(policyInfo?.policyAgentList, (item) => item.policyId === mainPolicyId) || {};
      const agentPhone = agentInfo.agentPhone;
      const agentName = [agentInfo.firstName, agentInfo.middleName, agentInfo.surname]
        .filter((item) => item)
        .join(' ');

      const { applyToPolicyInfoList, policyInfoList } = policyInfo || {};
      const info =
        lodash.find(
          applyToPolicyInfoList || policyInfoList,
          (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
        ) || {};
      return formUtils.mapObjectToFields(
        {
          ...info,
          policyNo: mainPolicyId,
          subCaseSubmissionDate,
          subCaseSubmissionChannel,
          subCaseSubmissionTime: subCaseSubmissionDate,
          agentName,
          agentPhone,
        },
        {}
      );
    },
  })(Item)
);
