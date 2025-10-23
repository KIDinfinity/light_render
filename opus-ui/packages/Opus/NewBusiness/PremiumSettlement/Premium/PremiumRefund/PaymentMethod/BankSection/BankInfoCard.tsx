import Section, { Fields } from '../Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import React from 'react';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';

const BankSection = ({ form, isSelected, bankInfoIndex, id, disabled }: any) => {
  // const rejected = useGetRejected();

  return (
    <>
      <Section
        form={form}
        // editable={!rejected && !disabled}
        editable={!disabled}
        required={isSelected}
        bankInfoIndex={bankInfoIndex}
      >
        <Fields.Bankname />
        <Fields.BranchName />
        <Fields.FactoryHouse />
        <Fields.Accountnumber />
        <Fields.BankAcctName />
        <Fields.EffectiveDate />
        <Fields.ExpiryDate />
        <Fields.AccountHolderType bankInfoIndex={bankInfoIndex} id={id} />
        <Fields.RelationshipWithInsured />
      </Section>
    </>
  );
};

const BankinfoCard = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveBankSection',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveBankSection',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { bankSectionData } = props;
      return formUtils.mapObjectToFields(bankSectionData);
    },
  })(BankSection)
);

export default BankinfoCard;
