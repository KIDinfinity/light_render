import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import ShowFlag from 'process/NB/ManualUnderwriting/Enum/ShowFlag';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';

const Policyreplacementheader = ({ form }: any) => {
  return (
    <Section
      section="PolicyReplacement-Header"
      form={form}
      localConfig={localConfig}
    >
      <Fields.PolicyReplacementFlag />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, setExpendStatus } = props;
      const policyReplacementFlag = formUtils.queryValue(changedFields?.policyReplacementFlag);
      setExpendStatus(policyReplacementFlag === ShowFlag.Yes);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setPolicyReplacementData',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPolicyReplacementData',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(Policyreplacementheader)
);
