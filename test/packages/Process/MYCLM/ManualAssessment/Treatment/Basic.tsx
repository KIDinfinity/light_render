import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';
import { v4 as uuidv4 } from 'uuid';

const Basic = ({ form, incidentId, treatmentId }: any) => {
  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]
  );

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      formId={'claimRegisterValidation' + uuidv4()}
      form={form}
      editable={editable}
      section="Treatment.Basic"
    >
      <Fields.DateOfConsultation incidentItem={incidentItem} />
      <Fields.DateOfAdmission incidentItem={incidentItem} />
      <Fields.DateOfDischarge incidentItem={incidentItem} />
      {/* <Fields.Department /> */}
      <Fields.Doctor />
      {/* <Fields.HospitalType incidentId={incidentId} /> */}
      {/* <Fields.IsHospitalInDevelopedCountry /> */}
      <Fields.MedicalProvider incidentId={incidentId} treatmentId={treatmentId} />
      {/* <Fields.MedicalProviderDescription /> */}
      {/* <Fields.MedicalProviderPlace incidentId={incidentId} /> */}
      {/* <Fields.RoomType treatmentId={treatmentId} incidentId={incidentId} /> */}
      {/* <Fields.ChargedDay treatmentId={treatmentId} /> */}
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
