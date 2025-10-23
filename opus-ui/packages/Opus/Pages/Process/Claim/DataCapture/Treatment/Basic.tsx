import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { has } from 'lodash';
import { ClaimType } from 'claim/enum';
import lodash from 'lodash';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';
import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields } from './Section';

const Treatment = ({ form, treatmentId, incidentId, treatmentItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentItem = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimEntities.incidentListMap[incidentId]
  );
  const insured = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimProcessData?.insured
  );

  const isTreatmentTypeIP = formUtils.queryValue(treatmentItem.treatmentType) === ClaimType.IPD;
  const medicalProviderValue = form.getFieldValue('medicalProvider');
  const isOtherMedicalProvider = lodash.some(
    TreatmentListitemOfBasicInfoArray,
    (item) => item === medicalProviderValue
  );
  const isICU = form.getFieldValue('icu');

  return (
    <Section
      form={form}
      editable={editable}
      section={'Treatment.Basic'}
    >
      <BasicFields.TreatmentType />
      <BasicFields.DateOfConsultation incidentItem={incidentItem} insured={insured} />
      <BasicFields.HospitalizationInstructionDate />
      <BasicFields.DateOfAdmission
        insured={insured}
        incidentItem={incidentItem}
        isTreatmentTypeIP={isTreatmentTypeIP}
      />
      <BasicFields.DateOfDischarge insured={insured} isTreatmentTypeIP={isTreatmentTypeIP} />
      <BasicFields.IsDischarged isTreatmentTypeIP={isTreatmentTypeIP} />
      <BasicFields.MedicalProvider
        incidentId={incidentId}
        treatmentId={treatmentId}
        isTreatmentTypeIP={isTreatmentTypeIP}
      />
      <BasicFields.Department />
      <BasicFields.MedicalProviderDescription isOtherMedicalProvider={isOtherMedicalProvider} />
      <BasicFields.Doctor />
      <BasicFields.ICU isTreatmentTypeIP={isTreatmentTypeIP} />
      <BasicFields.ICUFromDate required={isICU} isTreatmentTypeIP={isTreatmentTypeIP} />
      <BasicFields.ICUToDate required={isICU} isTreatmentTypeIP={isTreatmentTypeIP} />
    </Section>
  );
};

export default connect(
  ({ opusClaimDataCapture, formCommonController }: any, { treatmentId }: any) => ({
    treatmentItem: opusClaimDataCapture.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      const temChangedFields = { ...changedFields };
      if (has(changedFields, 'icu')) {
        temChangedFields.icu = changedFields.icu.value ? 1 : 0;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveEntry',
              target: 'treatmentUpdate',
              payload: {
                changedFields: temChangedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'opusClaimDataCapture/saveFormData',
            target: 'treatmentUpdate',
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
      return formUtils.mapObjectToFields(props?.treatmentItem);
    },
  })(FormRegist()(Treatment))
);
