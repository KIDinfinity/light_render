import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Insured, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Insured';

const Basic = ({ form, NAMESPACE }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Insured.Section form={form} editable={editable} section="Insured" NAMESPACE={NAMESPACE}>
      <Fields.Address />
      <Fields.DateOfBirth />
      <Fields.DateTimeOfDeath />
      <Fields.FirstName />
      <Fields.MiddleName />
      <Fields.Surname />
      <Fields.ExtName />
      <Fields.Gender />
      <Fields.Age />
      <Fields.IdentityNo />
      <Fields.IdentityType />
      <Fields.InsuredId />
      <Fields.Nationality />
      <Fields.Occupation />
      <Fields.Email />
      <Fields.PhoneNo />
      <Fields.PolicyId />
      <Fields.IssueAge />
      <Fields.CurrentAge />
      <Fields.CompanyRepresentative />
      <Fields.CompanyAddress />
      <Fields.Position />
    </Insured.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  validating: state?.formCommonController.validating,
  insured: state?.[NAMESPACE]?.claimProcessData?.insured,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveInsured',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveInsured',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { insured } = props;

      return formUtils.mapObjectToFields(insured);
    },
  })(Basic)
);
