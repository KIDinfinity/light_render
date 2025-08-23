import React, { useEffect } from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/TakeOverField';
import { Fields } from './Fields';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { formUtils } from 'basic/components/Form';
import { v4 as uuid } from 'uuid';

const TakeOverTableItem = ({ form, takeoverList }: any) => {
  useEffect(() => {
    const value = formUtils.queryValue(form.getFieldValue('policyNo'));
    if (!!value) {
      form.resetFields();
    }
  }, [form]);
  const formId = `TakeOver-Table_${uuid()}`;
  return (
    <Section section="TakeOver-Table" form={form} formId={formId} localConfig={localConfig}>
      <Fields.Policyno isTakeOverListEmpty={lodash.isEmpty(takeoverList)} />
    </Section>
  );
};
export default connect(({ formCommonController, [NAMESPACE]: namespaceModel }: any) => ({
  validating: formCommonController.validating,
  takeoverList: namespaceModel?.modalData?.takeOver?.takeOverList,
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
