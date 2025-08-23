import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields, localConfig } from './Section/Basic';

interface IParams {
  form: any;
  showOnly?: boolean;
}

const Item = ({ form, showOnly = false, id }: IParams) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={editable && !showOnly}
      section="CharityOrganization-Table"
      formId="CharityOrganization-Table"
      localConfig={localConfig}
    >
      <Fields.Charityorganizationcode />

      <Fields.Donationpercentage id={id} />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveCharityOrganizationList',
          payload: {
            changedFields,
            id,
            type: 'change',
            errorId: id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Item)
);
