import React from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/TakeOverField';
import { Fields } from './Fields';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { connect } from 'dva';
import Section from 'opus/NewBusiness/ManualUnderwriting/_components/EditableSection';

const TakeOverInfo = ({ form }: any) => {
  return (
    <Section section="TakeOver-Field" form={form} localConfig={localConfig}>
      <Fields.Takeoverflag />
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
