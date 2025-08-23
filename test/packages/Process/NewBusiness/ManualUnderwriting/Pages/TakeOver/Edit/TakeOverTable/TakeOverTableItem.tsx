import React from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from '../../_config/TakeOverField';
import { Fields } from './Fields';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import { connect } from 'dva';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
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
export default connect(({ formCommonController, [NAMESPACE]: namespaceModel }: any) => ({
  validating: formCommonController.validating,
  takeOverFlag: namespaceModel?.modalData?.takeOver?.takeOverFlag,
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
      const { data, index, takeOverFlag } = props;
      return formUtils.mapObjectToFields({
        ...data,
        index,
        takeOverFlag,
      });
    },
  })(TakeOverTableItem)
);
