import React, { useContext } from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useSelector } from 'dva';

import Section, { Fields } from './Section';

const DeliveryMethod = ({ form }: any) => {
  const editable = !useSelector(
    (state: any) =>
      state.claimEditable.taskNotEditable ||
      state[NAMESPACE]?.processData?.submissionChannel === 'Omne'
  );
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.PolicyDeliveryMethod />
      <Fields.DocDeliveryMethod />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.deliveryMethod,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveDeliveryMethod',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data }: any = props;
      return formUtils.mapObjectToFields(data);
    },
  })(DeliveryMethod)
) as React.ComponentType<any>;
