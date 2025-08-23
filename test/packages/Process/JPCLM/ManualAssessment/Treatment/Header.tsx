import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import Section, { BasicHeaderFields as Fields } from './Section';

const TreatmentListItemOfBasicInfoHeader = ({ form, incidentId, treatmentId }: any) => {
  const treatmentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId]
  );
  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) &&
    treatmentItem?.isAdjustment !== EIsAdjustment.Y;

  const layoutName = 'no-invoice-layout';

  return (
    <Section
      form={form}
      editable={editable}
      section="Treatment.Basic.Header"
      layoutName={layoutName}
    >
      <Fields.DateOfConsultation incidentId={incidentId} />
      <Fields.TreatmentType />
      <Fields.HospitalizationInstructionDate />
    </Section>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { treatmentId }: any) => ({
    treatmentItem: JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      const temChangedFields = { ...changedFields };
      if (lodash.has(changedFields, 'icu')) {
        temChangedFields.icu = changedFields.icu.value ? 1 : 0;
      }

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
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
            type: 'JPCLMOfClaimAssessment/saveFormData',
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
  })(TreatmentListItemOfBasicInfoHeader)
);
