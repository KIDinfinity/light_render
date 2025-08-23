import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import { fieldConfig as certificateNoFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationTable/Section/Fields/CertificateNo.config';
import { fieldConfig as paymentSlipAllocatedAmountFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationTable/Section/Fields/PaymentSlipAllocatedAmount.config';
import { fieldConfig as totalContributionFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationTable/Section/Fields/TotalContribution.config';
import PaymentOption from 'process/NB/ManualUnderwriting/Enum/PaymentOption';
import PayType from 'process/NB/Enum/PayType';

const PAYMENT_SLIP_CONFIG = {
  configs: [
    certificateNoFieldConfig,
    paymentSlipAllocatedAmountFieldConfig,
    totalContributionFieldConfig,
  ],
  remote: true,
};

export default () => {
  const NAMESPACE = useGetNamespace();
  const paymentOption = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      lodash.get(modelNamespace, 'businessData.policyList[0].paymentOption'),
    shallowEqual
  );
  const payType = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      lodash.get(modelNamespace, 'businessData.policyList[0].payType'),
    shallowEqual
  );
  return useMemo(() => {
    if (payType === PayType.DirectTransfer) {
      return {
        section: 'DirectTransferInformation-Table',
        localConfig: {},
      };
    }
    switch (paymentOption) {
      case PaymentOption.PaymentSlip:
        return {
          section: 'PaymentSlipInformation-Table',
          localConfig: PAYMENT_SLIP_CONFIG,
        };
      default:
        return {
          section: 'ChequeInformation-Table',
          localConfig: {},
        };
    }
  }, [paymentOption, payType]);
};
