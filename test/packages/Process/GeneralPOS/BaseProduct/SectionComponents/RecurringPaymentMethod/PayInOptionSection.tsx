import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import styles from './index.less';
import { Fields, SectionDafault } from './Section';

const PayInOptionSection = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  return (
    <div className={styles.checkoutBox}>
      <SectionDafault
        form={form}
        editable={editable}
        section="RecurringPaymentMethod"
        tableCollect={() => {}}
      >
        <Fields.PayInOption transactionId={transactionId} />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  paymentInMethodList:
    modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.paymentInMethodList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'recurringPaymentMethodUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { paymentInMethodList } = props;
      const recurringPaymentMethod = paymentInMethodList?.[0]?.txPmCreditCardList?.[0];
      return formUtils.mapObjectToFields({
        ...recurringPaymentMethod,
        payinOption: paymentInMethodList?.[0]?.payinOption,
      });
    },
  })(PayInOptionSection)
);
