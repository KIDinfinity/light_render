import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Treatment, { FieldsCheck as Fields } from 'process/Components/BussinessControls/Treatment';

const Basic = ({ form, NAMESPACE, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Treatment.Section form={form} editable={editable} section="Treatment" NAMESPACE={NAMESPACE} id={treatmentId}>
      <Fields.IsClaimWithOtherInsurer />
      <Fields.IsHospitalInDevelopedCountry />
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
