import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { Form, Select } from 'antd';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';

const Payment = ({ editable, data }: any) => {
  const { id, envoyAuth, status, payment } = data;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'envoyController/getPaymentNoArr',
    });
  }, []);
  const { globalEditAuth, errorInfo, paymentNoArr } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
    ...lodash.pick(state.envoyController, ['errorInfo', 'paymentNoArr']),
  }));

  const paymentErrors = lodash.get(findObj(errorInfo, id), 'payment');

  const saveReasonPayment = (value: string) => {
    dispatch({
      type: 'envoyController/saveReasonPayment',
      payload: {
        groupId: data?.groupId,
        dataId: id,
        value,
      },
    });
  };

  return (
    <Form.Item
      label={
        <>
          {paymentErrors?.length ? <LabelTip title={paymentErrors} /> : null}
          payment no
        </>
      }
      required
    >
      <Select
        name="payment"
        disabled={
          !editable ||
          notAuthOrDraftReason({
            globalAuth: globalEditAuth,
            selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
            status,
          })
        }
        allowClear={false}
        value={payment}
        onChange={(value: string[]) => saveReasonPayment(value)}
      >
        {lodash.map(paymentNoArr, (item: any) => (
          <Select.Option value={item?.dictCode} key={item?.dictCode}>
            {item?.dictName}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Payment;
