import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import React, { useEffect } from 'react';
import Section, { Fields } from '../Section';
import { useGetClientDetailList } from '../../../_hooks';
import CustomerRole from 'basic/enum/CustomerRole';

const PremiumInformation = ({ form }: any) => {
  const { businessData, processData, paymentAmountData } = useSelector(
    ({ [NAMESPACE]: state }: any) => {
      return state;
    }
  );

  const clientDetailList = useGetClientDetailList();

  useEffect(() => {
    if (!paymentAmountData) {
      return;
    }

    const { policyId } = processData;
    const { paidAmount } = paymentAmountData;

    // 兼容premium settlement
    const payor = clientDetailList?.length
      ? clientDetailList?.find((client: any) => client.customerRole.includes(CustomerRole.Payor))
      : businessData?.policyList?.[0]?.clientInfoList?.find(
          (client: any) =>
            !!client.roleList?.find((roleItem: any) => roleItem.customerRole === CustomerRole.Payor)
        );

    form?.setFieldsValue({
      fromPolicy: policyId,
      premiumReceived: paidAmount,
      payor: payor?.name || '',
    });
  }, [paymentAmountData]);

  return (
    <Section form={form} editable={false} section="PremiumInformation">
      <Fields.FromPolicy />
      <Fields.PremiumReceived />
      <Fields.Payor />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({}))(
  Form.create<any>({
    onFieldsChange() {
      // 不可编辑
    },
  })(PremiumInformation)
);
