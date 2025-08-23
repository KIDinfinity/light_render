import { fieldConfig as currencyConfig } from './Currency.config';
import { fieldConfig as isNewConfig } from './IsNew.config';
import { fieldConfig as loanContractNumberConfig } from './LoanContractNumber.config';
import { fieldConfig as newLoanAmountConfig } from './NewLoanAmount.config';
import { fieldConfig as numberOfPeriodConfig } from './NumberOfPeriod.config';
import { fieldConfig as periodConfig } from './Period.config';
import { fieldConfig as financingOptionConfig } from './FinancingOption.config';
import { fieldConfig as freeCoverLimitFlagConfig } from './FreeCoverLimitFlag.config';
import { fieldConfig as interestRateConfig } from './InterestRate.config';
import { fieldConfig as interimPeriodConfig } from './InterimPeriod.config';
import { fieldConfig as loanDisbursementDateConfig } from './LoanDisbursementDate.config';
import { fieldConfig as premiumValidityDateConfig } from './PremiumValidityDate.config';

const localSectionConfig = {
  section: 'Load-Table',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    currencyConfig,
    isNewConfig,
    loanContractNumberConfig,
    newLoanAmountConfig,
    numberOfPeriodConfig,
    periodConfig,
    financingOptionConfig,
    freeCoverLimitFlagConfig,
    interestRateConfig,
    interimPeriodConfig,
    loanDisbursementDateConfig,
    premiumValidityDateConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};

export { localConfig };
export default localConfig;
