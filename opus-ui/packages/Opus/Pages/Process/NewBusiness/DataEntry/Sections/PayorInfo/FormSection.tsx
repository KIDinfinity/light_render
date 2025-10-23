import React, { useContext } from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useSelector } from 'dva';

import Section, { Fields } from './Section';

const PolicyNo = ({ form }: any) => {
  const editable = !useSelector(
    (state: any) =>
      state.claimEditable.taskNotEditable ||
      state[NAMESPACE]?.processData?.submissionChannel === 'Omne'
  );
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.RelationshipOfInsured />
      <Fields.Title />
      <Fields.Name />
      <Fields.Age />
      <Fields.CountryOfNationality />
      <Fields.DateOfBirth />
      <Fields.ExpriyDate />
      <Fields.Gender />
      <Fields.IdCard />
      <Fields.LastName />
      <Fields.PreviousName />
      <Fields.MaritalStatus />
      <Fields.Nationality />
      <Fields.PassportNo />
      <Fields.WholelifeIdCard />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.payorInfo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayorInfo',
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
  })(PolicyNo)
) as React.ComponentType<any>;
