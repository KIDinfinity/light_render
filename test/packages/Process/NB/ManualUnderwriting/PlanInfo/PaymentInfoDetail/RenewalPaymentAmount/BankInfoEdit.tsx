import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from '../../../activity.config';
import { Fields, localConfig } from './Section';
import styles from './index.less';

const RenewalPaymentBankInfoTable = ({ form }: any) => {
  return (
    <div className={styles.editWrap}>
      <div className={styles.title}>Bank Info</div>
      <Section section="RenewalPaymentInfo-Table" form={form} localConfig={localConfig}>
        <Fields.BankAcctName />

        <Fields.Bankcode />

        <Fields.Businessbankcode />

        <Fields.Accountno />

        <Fields.Bankacctfactoryhouse />

        <Fields.AccountHolderType />

        <Fields.RelationshipWithInsured />

        <Fields.Bankcity />
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
      const { dispatch, validating, factoringHousesList, bankInfoIndex, id } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setBankInfoFieldData',
              payload: {
                bankInfoIndex,
                changedFields,
                factoringHousesList,
                bankInfoType: 'R',
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setBankInfoFieldData',
            payload: {
              bankInfoIndex,
              changedFields,
              factoringHousesList,
              bankInfoType: 'R',
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { renewalPaymentBankInfoTableData } = props;
      return formUtils.mapObjectToFields(renewalPaymentBankInfoTableData);
    },
  })(RenewalPaymentBankInfoTable)
);
