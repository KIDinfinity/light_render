import React from 'react';
import { connect, useSelector } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import lodash from 'lodash';

import FormRegist from '@/components/FormRegistComponent';
import { ClaimType } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';
import Section, { BasicFields } from './Section';
interface IProps {
  form: any;
  dispatch: Dispatch<any>;
  treatmentId: string;
  incidentId: string;
  validating?: boolean;
  treatmentItem?: any;
}

const BasicTreatment = ({ form, incidentId, treatmentItem, treatmentId }: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.incidentListMap[incidentId]
  );
  const insured = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.insured
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
      section={'treatment.basic'}
      layoutName={'no-invoice-layout'}
    >
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
  ({ JPCLMOfDataCapture, formCommonController }: any, { treatmentId, incidentId }: any) => ({
    treatmentItem: JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<IProps>({
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
              type: 'JPCLMOfDataCapture/saveEntry',
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
            type: 'JPCLMOfDataCapture/saveFormData',
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
  })(FormRegist()(BasicTreatment))
);
