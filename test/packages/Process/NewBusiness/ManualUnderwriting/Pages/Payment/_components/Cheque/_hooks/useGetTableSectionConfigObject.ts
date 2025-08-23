import { useMemo } from 'react';
import { useSelector } from 'dva';
import { fieldConfig as certificateNoFieldConfig } from '../ChequeInformationTable/Section/Fields/CertificateNo.config';
import { fieldConfig as paymentSlipAllocatedAmountFieldConfig } from '../ChequeInformationTable/Section/Fields/PaymentSlipAllocatedAmount.config';
import { fieldConfig as totalContributionFieldConfig } from '../ChequeInformationTable/Section/Fields/TotalContribution.config';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const PAYMENT_SLIP_CONFIG = {
  configs: [
    certificateNoFieldConfig,
    paymentSlipAllocatedAmountFieldConfig,
    totalContributionFieldConfig,
  ],
  remote: true,
};

export default () => {
  const { paymentOption = '', payType = '' }: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
    ) || [];

  return useMemo(() => {
    const config = {
      DBT: {
        section: 'DirectTransferInformation-Table',
        localConfig: {},
      },
      PS: {
        section: 'PaymentSlipInformation-Table',
        localConfig: PAYMENT_SLIP_CONFIG,
      },
      default: {
        section: 'ChequeInformation-Table',
        localConfig: {},
      },
    };
    return config[payType] || config[paymentOption] || config.default;
  }, [paymentOption, payType]);
};
