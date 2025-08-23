import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { CloseButton } from 'basic/components/Button';
import Section, { AdjIpExpandFields as Fields } from '../../Section';
import styles from './index.less';

const HPAdjustmentItem = ({ form, treatmentPayable, treatmentPayableList }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const handleDelete = () => {
    const { payableId, id } = treatmentPayable || {};
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeTreatmentPayableItem',
      payload: {
        claimPayableItemId: payableId,
        treatmentPayableItemId: id,
      },
    });
  };

  return (
    <div className={styles.Item}>
      <CloseButton
        handleClick={() => {
          handleDelete();
        }}
      />
      <Section form={form} editable={editable} section="Treatment.AdjIIpExpandPayable">
        <Fields.SystemCalculationAmount treatmentPayableItem={treatmentPayable} />
        <Fields.AssessorOverrideAmount treatmentPayableItem={treatmentPayable} />
        <Fields.DiagnosisCode />

        <Fields.Remark />

        <Fields.PolicyNo policyNoList={listPolicy} />
        <Fields.ProductCode policyNoList={listPolicy} />
        <Fields.BenefitItemCode
          policyNoList={listPolicy}
          curTreatmentPayableList={treatmentPayableList}
          treatmentPayableItem={treatmentPayable}
        />

        <Fields.BenefitTypeCode />
        <Fields.PayableDays />
        <Fields.AssessorOverrideDays treatmentPayableItem={treatmentPayable} />

        <Fields.HospitalizationFlg />
        <Fields.HospitalizationSequentialNo />
        <Fields.ReversalFlag />
        <Fields.ChangeObjectAmount />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, treatmentPayable, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveTreatmentPayableItem',
              payload: {
                changedFields,
                treatmentPayableItemId: treatmentPayable.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveTreatmentPayableItem',
            payload: {
              changedFields,
              treatmentPayableItemId: treatmentPayable.id,
            },
          });
        }
      }
    },

    mapPropsToFields(props) {
      const { treatmentPayable } = props;
      return formUtils.mapObjectToFields(treatmentPayable);
    },
  })(HPAdjustmentItem)
);
