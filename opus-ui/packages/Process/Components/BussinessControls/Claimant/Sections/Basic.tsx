import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Claimant, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Claimant';

const ClaimantSection = ({ form, NAMESPACE }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Claimant.Section form={form} editable={editable} section="Claimant" NAMESPACE={NAMESPACE}>
      <Fields.Address />
      <Fields.DateOfBirth />
      <Fields.Email />
      <Fields.FirstName />
      <Fields.MiddleName />
      <Fields.Surname />
      <Fields.Gender />
      <Fields.IdentityNo />
      <Fields.IdentityType />
      <Fields.Nationality />
      <Fields.Occupation />
      <Fields.PhoneNo />
      <Fields.RelationshipWithInsured />
      <Fields.ExtName />
    </Claimant.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  claimant: state?.[NAMESPACE]?.claimProcessData?.claimant,
  validating: state?.formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveClaimant',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveClaimant',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { claimant } = props;
      return formUtils.mapObjectToFields(claimant);
    },
  })(ClaimantSection)
);
