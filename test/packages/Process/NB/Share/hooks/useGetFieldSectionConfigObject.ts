import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import { fieldConfig as paymentAmountFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationField/Section/Fields/PaymentAmount.config';
import { fieldConfig as paymentBankedInDateFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationField/Section/Fields/PaymentBankedInDate.config';
import { fieldConfig as paymentSlipCurrencyFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationField/Section/Fields/PaymentSlipCurrency.config';
import { fieldConfig as paymentSlipForMultipleApplicationFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationField/Section/Fields/PaymentSlipForMultipleApplication.config';
import { fieldConfig as paymentSlipTransactionNoFieldConfig } from 'process/NB/Share/Components/Cheque/ChequeInformationField/Section/Fields/PaymentSlipTransactionNo.config';
import PaymentOption from 'process/NB/ManualUnderwriting/Enum/PaymentOption';
import PayType from 'process/NB/Enum/PayType';

const PAYMENT_SLIP_CONFIG = {
  configs: [
    paymentSlipTransactionNoFieldConfig,
    paymentBankedInDateFieldConfig,
    paymentAmountFieldConfig,
    paymentSlipForMultipleApplicationFieldConfig,
    paymentSlipCurrencyFieldConfig,
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
        section: 'DirectTransferInformation-Field',
        localConfig: {},
      };
    }
    switch (paymentOption) {
      case PaymentOption.PaymentSlip:
        return {
          section: 'PaymentSlipInformation-Field',
          localConfig: PAYMENT_SLIP_CONFIG,
        };
      default:
        return {
          section: 'ChequeInformation-Field',
          localConfig: {},
        };
    }
  }, [paymentOption, payType]);
};
