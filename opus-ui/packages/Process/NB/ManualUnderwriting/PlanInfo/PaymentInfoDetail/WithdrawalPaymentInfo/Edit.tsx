import React, { useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from '../../../activity.config';
import { Fields, localConfig } from './Section';
import styles from './index.less';
import useGetRefundPayType from 'process/NB/ManualUnderwriting/_hooks/useGetRefundPayType';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

const WithdrawalPaymentInfoTable = ({ form }: any) => {
  const refundPayType = useGetRefundPayType();
  // hide in TH
  const isShowBankDetail = useMemo(() => {
    const _refundPayType = lodash.isObject(refundPayType) ? refundPayType.value : refundPayType;
    return tenant.region() !== Region.TH && _refundPayType === PayType.BankTransfer;
  }, [refundPayType]);
  return (
    isShowBankDetail && (
      <div className={styles.editWrap}>
        <div className={styles.title}>Withdrawal Payment Information</div>
        <Section section="WithdrawalPaymentInfo-Table" form={form} localConfig={localConfig}>
          <Fields.BankAcctName />

          <Fields.BankAccountNo />

          <Fields.BankName />
        </Section>
      </div>
    )
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, bankInfoIndex, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setBankInfoFieldData',
              payload: {
                bankInfoIndex,
                changedFields,
                bankInfoType: 'W',
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
              bankInfoType: 'W',
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { withdrawalPaymentInfoTableData } = props;
      return formUtils.mapObjectToFields(withdrawalPaymentInfoTableData);
    },
  })(WithdrawalPaymentInfoTable)
);
