import React from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/TakeOverField';
import { Fields } from './Fields';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { connect } from 'dva';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';

const TakeOverInfo = ({ form }: any) => {
  return (
    <Section section="TakeOver-Field" form={form} localConfig={localConfig} formId="TakeOver-Field" >
      <Fields.Takeoverflag />
      <Fields.ExternalTakeOverFlag />
    </Section>
  );
};
export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: `updateTakeOverFlag`,
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(TakeOverInfo)
);
