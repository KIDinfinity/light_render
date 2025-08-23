import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { isEmpty, has } from 'lodash';

import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import Section, { HeaderFields } from './Section';

const TreatmentHeader = ({ form, treatmentId, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.incidentListMap[incidentId]
  );
  const insured = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.insured
  );
  const invoiceList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId].invoiceList
  );

  return (
    <Section
      form={form}
      editable={editable}
      section={'treatment.header'}
      layoutName={isEmpty(invoiceList) ? 'no-invoice-layout' : ''}
    >
      <HeaderFields.TreatmentType />
      <HeaderFields.DateOfConsultation incidentItem={incidentItem} insured={insured} />
      <HeaderFields.HospitalizationInstructionDate />
    </Section>
  );
};

export default connect(
  ({ JPCLMOfDataCapture, formCommonController }: any, { treatmentId }: any) => ({
    treatmentItem: JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId],
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
  })(FormRegist()(TreatmentHeader))
);
