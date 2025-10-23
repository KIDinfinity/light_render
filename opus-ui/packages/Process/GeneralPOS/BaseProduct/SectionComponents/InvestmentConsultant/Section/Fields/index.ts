import InvestmentConsultantsFullName, {
  localFieldConfig as InvestmentConsultantsFullNameConfig,
} from './InvestmentConsultantsFullName';
import InvestmentConsultantsICCode, {
  localFieldConfig as InvestmentConsultantsICCodeConfig,
} from './InvestmentConsultantsICCode';
import Requester, { localFieldConfig as RequesterConfig } from './Requester';
import ValidICInformation, {
  localFieldConfig as ValidICInformationConfig,
} from './ValidICInformation';
export const localFieldConfigs = [
  InvestmentConsultantsFullNameConfig,
  InvestmentConsultantsICCodeConfig,
  ValidICInformationConfig,
  RequesterConfig,
];

export default {
  InvestmentConsultantsFullName,
  InvestmentConsultantsICCode,
  ValidICInformation,
  Requester,
};
