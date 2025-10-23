import React from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/TakeOverField';
import { Fields } from './Fields';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { connect } from 'dva';
import Section from 'opus/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { v4 as uuid } from 'uuid';

const TakeOverTableItem = ({ form }: any) => {
  const formId = `TakeOver-Table_${uuid()}`;
  return (
    <Section section="TakeOver-Table" formId={formId} form={form} localConfig={localConfig}>
      <Fields.Policyno />
      <Fields.Planname />
      <Fields.Productcode />
      <Fields.Takeoverproducttype />
    </Section>
  );
};
export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setTakeOverItem',
          payload: {
            id: data.id,
            errorId: data.id,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data, index } = props;
      return formUtils.mapObjectToFields({
        ...data,
        index,
      });
    },
  })(TakeOverTableItem)
);
