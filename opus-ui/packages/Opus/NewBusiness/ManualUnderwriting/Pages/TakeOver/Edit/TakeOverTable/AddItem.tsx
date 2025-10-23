import React, { useEffect } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/TakeOverField';
import { Fields } from './Fields';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import Section from 'opus/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { formUtils } from 'basic/components/Form';

const TakeOverTableItem = ({ form }: any) => {
  useEffect(() => {
    form.resetFields();
  }, [form]);
  return (
    <Section section="TakeOver-Table" form={form} register={false} localConfig={localConfig}>
      <Fields.Policyno />
    </Section>
  );
};
export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onValuesChange(props: any, changedValues: any) {
      const { dispatch } = props;
      if (!lodash.isEmpty(formUtils.queryValue(changedValues.policyNo))) {
        dispatch({
          type: `${NAMESPACE}/addTakeOverItem`,
          payload: {
            changedValues,
          },
        });
      }
    },
  })(TakeOverTableItem)
);
