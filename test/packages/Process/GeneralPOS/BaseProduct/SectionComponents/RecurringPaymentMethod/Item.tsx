import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';
import lodash from 'lodash';

const Item = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section
      form={form}
      editable={editable}
      section="RecurringPaymentMethod"
      className={'RecurringPaymentMethod'}
    >
      <Fields.CardType />
      <Fields.CardHolderName />
      <Fields.CreditCardNumber />
      <Fields.ExpiryDate />
      <Fields.BankCode />
    </Section>
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
        expiryDate:
          recurringPaymentMethod?.expiryDateYear &&
          recurringPaymentMethod?.expiryDateMonth &&
          lodash.isEmpty(recurringPaymentMethod?.expiryDate)
            ? `${recurringPaymentMethod?.expiryDateYear}-${recurringPaymentMethod?.expiryDateMonth}-15T00:00:00+08:00`
            : recurringPaymentMethod?.expiryDate,
      });
    },
  })(Item)
);
