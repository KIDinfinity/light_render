import React from 'react';

import { Form } from 'antd';
import { useSelector, connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from '../Sections/Address';

interface IParams {
  form: any;
}

const Basic = ({ form }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      section="PlanInfoAddress-Field"
      formId="PlanInfoAddress-Field"
    >
      <Fields.Policyaddress7 />
      <Fields.Policyaddress6 />
      <Fields.Policyaddress5 />
      <Fields.Policyaddress4 />
      <Fields.Policyaddress3 />
      <Fields.Policyaddress2 />
      <Fields.Policyaddress1 />
      <Fields.Policyzipcode />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePlanInfoData',
          payload: {
            changedFields,
            type: 'change',
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
