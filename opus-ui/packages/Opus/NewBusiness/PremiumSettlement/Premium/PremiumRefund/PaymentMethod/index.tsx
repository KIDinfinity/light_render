import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import Bank from './Bank';
import useGetRejected from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetRejected';
import PayType from 'opus/NewBusiness/PremiumSettlement/Enum/payType';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import styles from './index.less';

const RefundPaytypeSection = ({ form, refundEditable, taskNotEditable }: any) => {
  const rejected = useGetRejected();
  const disabledSection = taskNotEditable || (refundEditable ? false : rejected);
  return (
    <Section form={form} editable={!disabledSection} required={true}>
      <Fields.Refundpaytype />
      <Fields.Refundremark />
    </Section>
  );
};

const RefundPaytypeFields = connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace, claimEditable }: any) => ({
    validating: formCommonController.validating,
    refundPayType: lodash.get(modelnamepsace, 'businessData.policyList[0].refundPayType'),
    refundRemark: lodash.get(modelnamepsace, 'businessData.policyList[0].refundRemark') || '',
    refundEditable: modelnamepsace.refundEditable,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'savePremiumPayType',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePremiumPayType',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { refundPayType, refundRemark } = props;
      return formUtils.mapObjectToFields({ refundPayType, refundRemark });
    },
  })(RefundPaytypeSection)
);

const PaymentMethod = ({ paymentMethodType }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const payType = lodash.get(businessData, 'policyList[0].refundPayType');

  return (
    <div className={classnames(styles.payment)}>
      <RefundPaytypeFields />
      {payType === PayType.BankTransfer && <Bank />}
    </div>
  );
};

export default PaymentMethod;
