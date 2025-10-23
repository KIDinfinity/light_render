import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
// import Item from './Item';
import { NAMESPACE } from '../../activity.config';
// import styles from './index.less';
import Section, { Fields } from './Section';
import { useSelector, useDispatch, connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const ChangePayment = ({ transactionId, form, isNotDataCapture }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    if (isNotDataCapture)
      dispatch({
        type: `${NAMESPACE}/paymentModeUpdate`,
        payload: {
          changePolicyId: true,
          id: transactionId,
        },
      });
  }, [servicingInit, isNotDataCapture]);

  useEffect(() => {
    if (!isNotDataCapture) return void 0;

    dispatch({
      type: `${NAMESPACE}/getPolicyPmMode`,
      payload: {
        id: transactionId,
      },
    });

    return () => {
      dispatch({
        type: `${NAMESPACE}/paymentModeClear`,
        payload: {
          id: transactionId,
        },
      });
    };
  }, [isNotDataCapture]);

  return (
    <Section form={form} editable={editable} section="PaymentMode" formId={'PaymentMode'}>
      <Fields.NextPaymentMode id={transactionId} isNotDataCapture={isNotDataCapture} />
      <Fields.PremiumAmount />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  paymentMode: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMode,
  billingCurrency: modelnamepsace?.processData?.policyInfo?.applyToPolicyInfoList?.find(
    (item: any) => item?.policyId === modelnamepsace?.processData?.mainPolicyId
  )?.policyCurrency,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId: id }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentModeUpdate',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { paymentMode, billingCurrency } = props;

      const nextPremiumAmount = paymentMode?.nextPremiumAmount;

      return formUtils.mapObjectToFields({
        ...paymentMode,
        nextPremiumAmount:
          lodash.isNumber(nextPremiumAmount) || lodash.isString(nextPremiumAmount)
            ? Number(nextPremiumAmount).toFixed(2)
            : nextPremiumAmount,
        billingCurrency: paymentMode?.currency || billingCurrency,
      });
    },
  })(ChangePayment)
);
