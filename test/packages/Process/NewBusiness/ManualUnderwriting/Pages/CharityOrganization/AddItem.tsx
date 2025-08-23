import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields, localConfig } from './Section/Basic';

interface IParams {
  form: any;
}

const AddItem = ({ form }: IParams) => {
  return (
    <Section
      form={form}
      editable
      section="CharityOrganization-Table"
      formId="CharityOrganization-Table"
      localConfig={localConfig}
    >
      <Fields.Charityorganizationcode />
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
          target: 'saveCharityOrganizationList',
          payload: {
            type: 'add',
            changedFields,
          },
        });
      }
    },
  })(AddItem)
);
