import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Claimant, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Claimant';

const ClaimantSection = ({ form, NAMESPACE }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Claimant.Section form={form} editable={editable} section="Claimant" NAMESPACE={NAMESPACE}>
      <Fields.CompanyName />
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
      <Fields.IDType NAMESPACE={NAMESPACE} />
      <Fields.DateOfIssue NAMESPACE={NAMESPACE} />
      <Fields.AgeAdmit />
      <Fields.OCRResult />
      <Fields.DateOfExpiry NAMESPACE={NAMESPACE} />
      <Fields.NoExpiryDate />
      <Fields.Exempty />
      <Fields.ValidID />
    </Claimant.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  claimant: state?.[NAMESPACE]?.claimProcessData?.claimant,
  userId: state?.user?.currentUser?.userId,
  validating: state?.formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, NAMESPACE, userId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveClaimant',
              payload: {
                changedFields,
                userId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveClaimant',
            payload: {
              changedFields,
              userId,
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
