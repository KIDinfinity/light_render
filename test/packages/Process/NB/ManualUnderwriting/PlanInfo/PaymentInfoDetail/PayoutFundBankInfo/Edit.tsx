import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from '../../../activity.config';
import { Fields, localConfig } from './Section';
import styles from './index.less';

const PayoutFundBankInfoTable = ({ form }: any) => {
  return (
    <div className={styles.editWrap}>
      <div className={styles.title}>Payout Fund Bank Info</div>
      <Section section="PayoutFundBankInfo-Table" form={form} localConfig={localConfig}>
        <Fields.BankAcctName />

        <Fields.BankAccountNo />

        <Fields.BankCode />

        <Fields.BankAcctFactoryHouse />

        <Fields.BranchName />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  factoringHousesList: lodash.get(modelnamepsace, 'factoringHousesList', []),
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, factoringHousesList, bankInfoIndex } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setPayoutBankInfoFieldData',
              payload: {
                bankInfoIndex,
                changedFields,
                factoringHousesList,
                bankInfoType: 'P',
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPayoutBankInfoFieldData',
            payload: {
              bankInfoIndex,
              changedFields,
              factoringHousesList,
              bankInfoType: 'P',
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { payoutFundBankInfoTableData } = props;
      return formUtils.mapObjectToFields(payoutFundBankInfoTableData);
    },
  })(PayoutFundBankInfoTable)
);
