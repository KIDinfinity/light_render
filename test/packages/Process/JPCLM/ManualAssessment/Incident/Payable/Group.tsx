import React from 'react';
import { Form } from 'antd';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { PayableGroupFields as Fields } from '../Section';
import styles from './Group.less';

const ClaimPayableListGroup = ({ form, children, targets }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.ClaimPayableListGroup}>
      <Section form={form} editable={editable} section="Incident.Payable.Group">
        <Fields.PolicyNo />
        <Fields.MainProductCode />
        <Fields.SettlementDecision targets={targets} />
        <Fields.DetailedAssessmentDecision />
        <Fields.PayableAmount />
        <Fields.ChangeObjectAmount />
        <Fields.RefundAmount />
      </Section>
      {children}
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { targets }: any) => ({
    validating: formCommonController.validating,
    refundAmount: JPCLMOfClaimAssessment.claimProcessData?.refundAmount?.[targets?.policyNo] || '',
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, claimPayableListMap, targets, incidentId }: any = props;
      if (
        formUtils.shouldUpdateState(changedFields) &&
        (lodash.has(changedFields, 'settlementDecision') ||
          lodash.has(changedFields, 'detailedAssessmentDecision'))
      ) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveClaimPayableListGroupResult',
              payload: {
                changedFields: lodash.pick(changedFields, [
                  'settlementDecision',
                  'detailedAssessmentDecision',
                ]),
                claimPayableListMap,
                targets,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveClaimPayableListGroupResult',
            payload: {
              changedFields: lodash.pick(changedFields, [
                'settlementDecision',
                'detailedAssessmentDecision',
              ]),
              claimPayableListMap,
              targets,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { policyNo, mainProductCode, payableAmount, changeObjectAmount } = props.targets;
      const { claimPayableGroupList, incidentId, refundAmount } = props;

      return formUtils.mapObjectToFields({
        policyNo,
        mainProductCode,
        payableAmount,
        changeObjectAmount,
        refundAmount,
        ...(claimPayableGroupList?.[`${incidentId}.${policyNo}`] || {}),
      });
    },
  })(ClaimPayableListGroup)
);
