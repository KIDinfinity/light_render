import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import styles from './index.less';
import {
  EditSectionCodeEnum,
  OperationTypeEnum,
  TransactionTypeEnum,
} from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const PayoutOptionSection = ({ form, transactionId, payoutPaymentMethod, payoutOption }: any) => {
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.transactionTypeCode
  );

  const onlyTransactionRead =
    formUtils.queryValue(transactionTypeCode) === TransactionTypeEnum.SRV015;

  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod, onlyTransactionRead);

  return (
    <div className={styles.checkoutBox} id="PayoutOptionSection">
      <SectionDafault
        form={form}
        editable={editable}
        section="PaymentMethod"
        tableCollect={() => {}}
      >
        <Fields.PayoutOption
          transactionId={transactionId}
          payoutPaymentMethod={payoutPaymentMethod}
          payoutOption={payoutOption}
        />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  item: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0],
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentMethodUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.UPDATE,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(PayoutOptionSection)
);
