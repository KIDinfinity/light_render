import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const map = {
  A: '01',
  H: '02',
  Q: '04',
  M: '12',
};

const Item = ({ form, id }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/paymentModeUpdate`,
      payload: {
        changePolicyId: true,
        id,
      },
    });
  }, [servicingInit]);

  useEffect(() => {
    // TODO 当有多个PaymentMode时，会调用多次
    dispatch({
      type: `${NAMESPACE}/getPolicyPmMode`,
      payload: {
        id,
      },
    });

    return () => {
      dispatch({
        type: `${NAMESPACE}/paymentModeClear`,
        payload: {
          id,
        },
      });
    };
  }, []);

  return (
    <Section form={form} editable={editable} section="PaymentMode">
      <Fields.CurrentPaymentMode />
      <Fields.NextPaymentMode id={id} />
      <Fields.PremiumAmount />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    paymentMode: modelnamepsace.entities?.transactionTypesMap?.[id]?.paymentMode,
    originPaymentMode: modelnamepsace?.policyPmMode,
    billingCurrency: modelnamepsace?.processData?.policyInfo?.applyToPolicyInfoList.find(
      (item: any) => item?.policyId === modelnamepsace?.processData?.mainPolicyId
    )?.billingCurrency,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'paymentModeUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'paymentModeUpdate',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { paymentMode, billingCurrency } = props;

      return formUtils.mapObjectToFields({ ...paymentMode, billingCurrency });
    },
  })(Item)
);
