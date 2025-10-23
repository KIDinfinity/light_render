import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { CheckFields as Fields } from './Section';

const Basic = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="Treatment.Check">
      <Fields.IsClaimWithOtherInsurer />
      <Fields.IsHospitalInDevelopedCountry />
    </Section>
  );
};

export default connect(
  ({ formCommonController, THCLMOfDataCaptureController }: any, { treatmentId }: any) => ({
    treatmentItem: THCLMOfDataCaptureController.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      const temChangedFields = { ...changedFields };

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'THCLMOfDataCaptureController/saveEntry',
              target: 'saveTreatmentItem',
              payload: {
                changedFields: temChangedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'THCLMOfDataCaptureController/saveFormData',
            target: 'saveTreatmentItem',
            payload: {
              changedFields: temChangedFields,
              incidentId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;

      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Basic)
);
