import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import Section, { RelationPayableFields as Fields } from '../../Section';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import styles from './index.less';

const Item = ({ form, layoutName, treatmentPayableItem, opTreatmentPayableItem }: any) => {
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.AdjItem}>
      <CardOfClaim
        cardStyle={
          policyBackgrounds && treatmentPayableItem?.policyNo
            ? { width: '6px', background: policyBackgrounds[treatmentPayableItem?.policyNo] }
            : {}
        }
      >
        <Section
          form={form}
          editable={editable}
          layoutName={layoutName}
          section="Treatment.RelationPayable"
        >
          <Fields.SystemCalculationDays />
          <Fields.SystemCalculationAmount />
          <Fields.AssessorOverrideDays opTreatmentPayableItem={opTreatmentPayableItem} />
          <Fields.AssessorOverrideAmount />
          <Fields.PayableDays />
          <Fields.PayableAmount />
          <Fields.HospitalizationSequentialNo />
          <Fields.ReversalFlag treatmentPayableId={treatmentPayableItem.id} />
          <Fields.ChangeObjectAmount />
          <Fields.DiagnosisCode />
          <Fields.Remark />
        </Section>
      </CardOfClaim>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, validating, treatmentPayableItem, opTreatmentPayableItem } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveFormData',
              target: 'saveAdjOpTreatmentPayableItem',
              payload: {
                changedFields,
                treatmentPayableItem,
                id: opTreatmentPayableItem?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveAdjOpTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItem,
              id: opTreatmentPayableItem?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { opTreatmentPayableItem }: any = props;
      return formUtils.mapObjectToFields({
        ...opTreatmentPayableItem,
        remark: transRemarkCodeToMsg(opTreatmentPayableItem.remark, true),
      });
    },
  })(Item)
);
