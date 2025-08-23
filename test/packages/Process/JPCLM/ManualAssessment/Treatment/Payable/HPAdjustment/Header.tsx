import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { AdjIpHeaderPayableFields as Fields } from '../../Section';

const HPAdjustment = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable} section="Treatment.AdjIpHeaderPayable">
      <Fields.BenefitTypeCode />
      <Fields.AdjustOriginPayableDays />
      <Fields.AdjustOriginPayableAmount />
      {/* <Fields.AssessorOverrideDays />
      <Fields.AssessorOverrideAmount /> */}
      <Fields.HospitalizationSequentialNo />
      <Fields.ChangeHospitalizationSequentialNo />
      <Fields.ChangeObjectAmount />
    </Section>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { treatmentPayableItemId }: any) => ({
    validating: formCommonController.validating,
    treatmentPayableItem:
      JPCLMOfClaimAssessment?.claimEntities?.treatmentPayableListMap?.[treatmentPayableItemId],
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, totalItem, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveAdjHPChangeNo',
              payload: {
                changedFields,
                treatmentPayableList: totalItem.treatmentPayableList,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveAdjHPChangeNo',
            payload: {
              changedFields,
              treatmentPayableList: totalItem.treatmentPayableList,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { totalItem }: any = props;

      return formUtils.mapObjectToFields(totalItem);
    },
  })(HPAdjustment)
);
