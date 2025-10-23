import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import { useSelector, connect } from 'dva';
import { TreatmentType } from 'claim/pages/utils/claim';

const Basic = ({ form, incidentId, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.treatmentListMap[treatmentId]?.treatmentType
  );

  const isAdjustmentValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.treatmentListMap[treatmentId]?.isAdjustment
  );

  const isTreatmentTypeIP = formUtils.queryValue(treatmentType) === TreatmentType.InPatient;
  const isTreatmentTypeOP = formUtils.queryValue(treatmentType) === TreatmentType.OutPatient;

  return (
    <>
      <Section
        form={form}
        editable={!isAdjustmentFun(isAdjustmentValue) && editable}
        section="Treatment.Basic"
      >
        <Fields.TreatmentType />
        <Fields.HospitalizationInstructionDate />
      </Section>
      <Section
        form={form}
        editable={!isAdjustmentFun(isAdjustmentValue) && editable}
        section="Treatment.Basic"
      >
        <Fields.DateOfAdmission incidentId={incidentId} isTreatmentTypeIP={isTreatmentTypeIP} />
        <Fields.DateOfDischarge isTreatmentTypeIP={isTreatmentTypeIP} />
        <Fields.IsDischarged isTreatmentTypeIP={isTreatmentTypeIP} />
        <Fields.Department />
        <Fields.Doctor />
        <Fields.MedicalProvider isTreatmentTypeIP={isTreatmentTypeIP} treatmentId={treatmentId} />
        <Fields.MedicalProviderDescription />
      </Section>
    </>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, treatmentId }: any = props;
      const temChangedFields = { ...changedFields };
      if (lodash.has(changedFields, 'icu')) {
        temChangedFields.icu = changedFields.icu.value ? 1 : 0;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveTreatmentItem',
          payload: {
            changedFields: temChangedFields,
            incidentId,
            treatmentId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;

      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Basic)
);
