import React from 'react';

import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Incident, { FieldsHeader as Fields } from 'process/Components/BussinessControls/Incident';

const ActionBar = ({ form, NAMESPACE, editable, incidentId }: any) => {
  return (
    <Incident.Section
      form={form}
      editable={editable}
      section="Incident"
      NAMESPACE={NAMESPACE}
      id={incidentId}
    >
      <Fields.ClaimTypeArray />
    </Incident.Section>
  );
};

export default connect((state: any, { NAMESPACE, incidentId }: any) => ({
  validating: state.formCommonController.validating,
  claimNo: state?.[NAMESPACE]?.claimProcessData?.claimNo,
  incidentItem: state?.[NAMESPACE]?.claimEntities?.incidentListMap?.[incidentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { NAMESPACE, dispatch, incidentId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveIncidentItem',
              payload: {
                changedFields,
                incidentId,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields(incidentItem, {});
    },
  })(ActionBar)
);
