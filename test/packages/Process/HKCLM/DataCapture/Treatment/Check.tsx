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
      <Fields.HasEinvoice />
      <Fields.GuaranteeOfPayment />
    </Section>
  );
};

export default connect(({ HKCLMOfDataCaptureController }: any, { treatmentId }: any) => ({
  treatmentItem: HKCLMOfDataCaptureController.claimEntities.treatmentListMap[treatmentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId } = props;
      const temChangedFields = { ...changedFields };

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'HKCLMOfDataCaptureController/saveFormData',
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
