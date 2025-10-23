import React from 'react';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Treatment, { FieldsHeader as Fields } from 'process/Components/BussinessControls/Treatment';

interface IProps {
  NAMESPACE: string;
  form: any;
  incidentId: string;
  treatmentId: string;
}
const Header = ({ form, NAMESPACE, incidentId, treatmentId }: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Treatment.Section
      form={form}
      editable={editable}
      section="Treatment"
      NAMESPACE={NAMESPACE}
      id={treatmentId}
    >
      <Fields.TreatmentType incidentId={incidentId} treatmentId={treatmentId} />
    </Treatment.Section>
  );
};

export default connect((state: any, { NAMESPACE, incidentId, treatmentId }: any) => ({
  validating: state?.formCommonController.validating,
  treatmentList: state?.[NAMESPACE]?.claimEntities?.incidentListMap?.[incidentId]?.treatmentList,
  claimNo: state?.[NAMESPACE]?.claimProcessData?.claimNo,
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
  })(Header)
);
