import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Basic = ({ form, editable }: any) => {
  return (
    <Section
      form={form}
      editable={editable}
      section="ClaimEstimation-Incident"
      formId="ClaimEstimation-Incident"
    >
      <Fields.DiagnosisName />
      <Fields.DiagnosisNo />
      <Fields.WithAntiCanceTreatment />
      <Fields.WithOutpatientTreatment />
    </Section>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'claimEstimateIncidentUpdate',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { data } = props;

      return formUtils.mapObjectToFields(data);
    },
  })(Basic)
);
