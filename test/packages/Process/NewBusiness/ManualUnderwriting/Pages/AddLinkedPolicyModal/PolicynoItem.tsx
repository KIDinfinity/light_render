import React, { useEffect } from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from './AddLinkedPolicy-Field/index';
import Fields from './AddLinkedPolicy-Field/Fields';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import Section from './AddLinkedPolicy-Field';
import { formUtils } from 'basic/components/Form';

const PolicynoItem = ({ form, isLast, linkedPolicyForms, setLinkedPolicyForms }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  useEffect(() => {
    if (isLast) {
      form.resetFields();
    }
  }, [form]);
  useEffect(() => {
    if (!isLast) {
      setLinkedPolicyForms([...linkedPolicyForms, form]);
    }
  }, []);
  return (
    <Section
      section="AddLinkedPolicy-Field"
      form={form}
      register={false}
      localConfig={localConfig}
      editable={editable}
    >
      <Fields.Policyno isLast={isLast} />
    </Section>
  );
};
export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, policyNoIndex, isLast } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveLinkedPolicy',
          payload: {
            changedFields,
            policyNoIndex,
            isLast,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policyNo, isLast } = props;
      if (!isLast) {
        return formUtils.mapObjectToFields({ policyNo });
      }
    },
  })(PolicynoItem)
);
