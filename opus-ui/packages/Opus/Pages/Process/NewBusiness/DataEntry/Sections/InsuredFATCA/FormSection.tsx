import React, { useContext } from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useSelector } from 'dva';

import Section, { Fields } from './Section';

const Insured = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.GreencardExpDate />
      <Fields.GreencardNo />
      <Fields.FatcaQ1 />
      <Fields.FatcaQ1Condition />
      <Fields.FatcaQ2 />
      <Fields.FatcaQ3 />
      <Fields.FatcaQ4 />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.insuredFatca,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveInsuredFatca',
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
