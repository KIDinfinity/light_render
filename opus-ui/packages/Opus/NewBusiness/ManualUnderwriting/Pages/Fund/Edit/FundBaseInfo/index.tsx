import React from 'react';
// import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/FundField';
import { Fields } from './Fields';
import Section from 'opus/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { connect } from 'dva';
import { v4 as uuidv4 } from 'uuid';

const FundBaseInfo = ({ form }: any) => {
  return (
    <Section
      section="Fund-Field"
      formId={`Fund-Field_${uuidv4()}`}
      form={form}
      localConfig={localConfig}
    >
      <Fields.Portfolioid />
      <Fields.Portfoliotype />
      <Fields.Autorebalancingtype />
      <Fields.AutoRebalancingStatus />
      <Fields.Ulreserveunitdate />
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
          target: 'setFundInfo',
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
  })(FundBaseInfo)
);
