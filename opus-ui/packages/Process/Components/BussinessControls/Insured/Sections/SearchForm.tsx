import React from 'react';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import Insured, { FieldsForm as Fields } from 'process/Components/BussinessControls/Insured';

const SearchForm = ({ form, NAMESPACE }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Insured.Section form={form} editable={editable} section="Insured.Form" NAMESPACE={NAMESPACE}>
      <Fields.ClientId />
      <Fields.DateOfBirth />
      <Fields.FirstName />
      <Fields.Gender />
      <Fields.MiddleName />
      <Fields.PolicyId />
      <Fields.PolicySource />
      <Fields.Surname />
      <Fields.IdentityNo />
      <Fields.IdentityType />
    </Insured.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  validating: state?.formCommonController.validating,
  searchInsuredObj: state?.[NAMESPACE]?.searchInsuredObj,
}))(
  Form.create({
    async onFieldsChange(props: any, changedFields: any) {
      const { NAMESPACE, validating, dispatch }: any = props;

      if (!formUtils.shouldUpdateState(changedFields)) return;

      if (!validating || lodash.size(changedFields) === 1) {
        dispatch({
          type: `${NAMESPACE}/saveSearchInsuredInfo`,
          payload: {
            changedFields,
          },
        });
      }
    },
    // @ts-ignore
    mapPropsToFields(props: IProps) {
      const { searchInsuredObj } = props;
      return formUtils.mapObjectToFields(searchInsuredObj);
    },
  })(SearchForm)
);
