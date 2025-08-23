import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="Treatment.Basic">
      <Fields.DateOfConsultation />
      <Fields.DateOfAdmission />
      <Fields.DateOfDischarge />
      <Fields.Department />
      <Fields.Doctor />
      <Fields.HospitalType />
      <Fields.IsHospitalInDevelopedCountry />
      <Fields.MedicalProvider />
      <Fields.MedicalProviderDescription />
      <Fields.MedicalProviderPlace />
      <Fields.RoomType />
      <Fields.ChargableDays />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
  treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId } = props;
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
