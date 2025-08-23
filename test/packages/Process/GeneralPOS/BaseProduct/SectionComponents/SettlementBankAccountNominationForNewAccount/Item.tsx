import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import styles from './index.less';

const PaymentMethodForNewAccount = ({ form, transactionId, editable }: any) => {
  return (
    <div className={styles.itemBox}>
      <SectionDafault
        form={form}
        editable={editable}
        section="SettlementBankAccountNominationForNewAccount"
        tableCollect={() => {}}
      >
        <Fields.BankCode bankNewAdd transactionId={transactionId} isInline={false} />
        <Fields.BranchCode isInline={false} />
        <Fields.BankAccountNo isInline={false} transactionId={transactionId} />
        <Fields.BankCurrency isInline={false} />
        <Fields.BankAccountName isInline={false} />
        <Fields.SecurityCode isInline={false} />
        <Fields.TypeOfAccount isInline={false} />
        <Fields.CurrentFrom isInline={false} />
        <Fields.CurrentTo isInline={false} />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
  txPmBankList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0]
      ?.txPmBankList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'settlementBankAccountNominationUpdate',
          payload: {
            changedFields,
            transactionId,
            index,
            type: OperationTypeEnum.LISTINFOUPDATE,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { txPmBankList, id: index } = props;
      const item = txPmBankList?.[index];
      return formUtils.mapObjectToFields(item);
    },
  })(PaymentMethodForNewAccount)
);
