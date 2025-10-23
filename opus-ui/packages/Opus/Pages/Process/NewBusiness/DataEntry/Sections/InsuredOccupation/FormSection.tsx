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
      <Fields.AnnualIncome />
      <Fields.JobDescription />
      <Fields.NatureOfBusiness />
      <Fields.OtherJobDescription />
      <Fields.OtherNatureOfBusiness />
      <Fields.OtherPosition />
      <Fields.Position />
      <Fields.OccupationClass />
      <Fields.OccupationName />
      <Fields.OtherAnnualIncome />
      <Fields.OtherOccupation />
      <Fields.OtherOccupationClass />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.insuredOccupation,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveInsuredOccupation',
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
