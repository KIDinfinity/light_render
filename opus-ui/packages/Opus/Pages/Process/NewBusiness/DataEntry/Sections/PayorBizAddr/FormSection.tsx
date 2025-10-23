import React, { useContext } from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useSelector } from 'dva';

import Section, { Fields } from '../AddressSection';

const Insured = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.Address1 />
      <Fields.Address2 />
      <Fields.Address3 />
      <Fields.Address4 />
      <Fields.Address5 />
      <Fields.Address6 />
      <Fields.PostalCode />
      <Fields.Country />
      <Fields.BizAddr />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.payorBizAddr,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayorBizAddr',
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
  })(Insured)
) as React.ComponentType<any>;
