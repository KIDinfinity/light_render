import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form, incidentId, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="Treatment.Basic">
      <Fields.DateOfConsultation />
      <Fields.DateOfAdmission />
      <Fields.DateOfDischarge />
      <Fields.TimeOfConsultation />
      <Fields.TimeOfAdmission />
      <Fields.TimeOfDischarge />
      <Fields.Department />
      <Fields.Doctor />
      <Fields.HospitalType incidentId={incidentId} />
      <Fields.IsHospitalInDevelopedCountry />
      <Fields.MedicalProvider incidentId={incidentId} treatmentId={treatmentId} />
      <Fields.MedicalProviderDescription />
      <Fields.MedicalProviderPlace />
      <Fields.RoomType />
      <Fields.ChargableDays />
      <Fields.Icu />
      <Fields.IcuFromDate />
      <Fields.IcuToDate />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      const temChangedFields = { ...changedFields };
      if (lodash.has(changedFields, 'icu')) {
        temChangedFields.icu = changedFields.icu.value ? 1 : 0;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
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
            type: `${NAMESPACE}/saveFormData`,
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
