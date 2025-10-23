import React, { useContext } from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useSelector } from 'dva';
import Section, { Fields } from './Section';
import { Country } from 'opus/Pages/Process/NewBusiness/DataEntry/enums/country';

const Insured = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.City />
      <Fields.CountryOfTaxResidency />
      <Fields.LastName />
      <Fields.Name />
      <Fields.NonThTaxOption />
      <Fields.Tin />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.payorCrs,
  payorInfo: modelnamespace.processData?.payorInfo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayorCrs',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data, payorInfo }: any = props;
      const { name, lastName, nationality, idCard, passportNo } = payorInfo || {};
      const currentName = formUtils.queryValue(name);
      const currentLastName = formUtils.queryValue(lastName);
      const currentNationality = formUtils.queryValue(nationality);
      const currentIdCard = formUtils.queryValue(idCard);
      const currentPassportNo = formUtils.queryValue(passportNo);
      const tin = currentNationality === Country.TH ? currentIdCard : currentPassportNo;

      return formUtils.mapObjectToFields({
        ...data,
        ...{ name: currentName, lastName: currentLastName, tin },
      });
    },
  })(Insured)
) as React.ComponentType<any>;
