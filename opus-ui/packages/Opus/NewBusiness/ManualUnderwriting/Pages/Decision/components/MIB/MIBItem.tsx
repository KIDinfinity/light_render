import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import Section, { Fields } from './Section';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

interface IProps {
  form: any;
  id: string;
  dataItem: any;
  dispatch: any;
}
const MIBItem = ({ form, id }: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable}>
      <Fields.ClientId id={id} />
      <Fields.Customerrole />
      <Fields.Decisioncode />
      <Fields.ImpairmentCodeList />
      <Fields.Remark />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: IProps, changedFields) {
      const { dispatch, validating, id } = props;
      if (validating) {
        dispatch({
          type: `${NAMESPACE}/saveEntry`,
          target: 'saveMibInformation',
          payload: {
            changedFields,
            id,
          },
        });
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveMibInformation',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { dataItem } = props;
      return formUtils.mapObjectToFields({
        ...dataItem,
      });
    },
  })(MIBItem)
);
