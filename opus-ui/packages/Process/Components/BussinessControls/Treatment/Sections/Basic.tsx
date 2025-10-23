import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import { TreatmentListitemOfBasicInfoArrayHK } from 'claim/pages/Enum/TreatmentItemBasicInfoArr';
import Treatment, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Treatment';

const Basic = ({ form, NAMESPACE, incidentId, treatmentId }: any) => {
  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );
  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]
  );

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const isTreatmentTypeIP = formUtils.queryValue(treatmentItem.treatmentType) === ClaimType.IPD;
  const medicalProviderValue = form.getFieldValue('medicalProvider');
  const isOtherMedicalProvider = lodash.some(
    TreatmentListitemOfBasicInfoArrayHK,
    (item) => item === medicalProviderValue
  );

  return (
    <Treatment.Section
      form={form}
      editable={editable}
      section="Treatment"
      NAMESPACE={NAMESPACE}
      id={treatmentId}
    >
      <Fields.DateOfConsultation incidentItem={incidentItem} />
      <Fields.DateOfAdmission isTreatmentTypeIP={isTreatmentTypeIP} incidentItem={incidentItem} />
      <Fields.DateOfDischarge isTreatmentTypeIP={isTreatmentTypeIP} incidentItem={incidentItem} />
      <Fields.TimeOfConsultation />
      <Fields.TimeOfAdmission />
      <Fields.TimeOfDischarge />
      <Fields.Department />
      <Fields.Doctor />
      <Fields.HospitalType incidentId={incidentId} />
      <Fields.IsHospitalInDevelopedCountry />
      <Fields.MedicalProvider incidentId={incidentId} treatmentId={treatmentId} />
      <Fields.MedicalProviderDescription isOtherMedicalProvider={isOtherMedicalProvider} />
      <Fields.MedicalProviderPlace incidentId={incidentId} />
      <Fields.RoomType isTreatmentTypeIP={isTreatmentTypeIP} treatmentId={treatmentId} />
      <Fields.ChargableDays />
    </Treatment.Section>
  );
};

export default connect((state: any, { NAMESPACE, treatmentId }: any) => ({
  validating: state?.formCommonController.validating,
  treatmentItem: state?.[NAMESPACE]?.claimEntities?.treatmentListMap?.[treatmentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, NAMESPACE, incidentId, treatmentId, validating } = props;
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
