import UsCitizen, { localFieldConfig as UsCitizenConfig } from './UsCitizen';
import UsCitizenPassportNo, {
  localFieldConfig as UsCitizenPassportNoConfig,
} from './UsCitizenPassportNo';
import UsCitizenResidenceAddress, {
  localFieldConfig as UsCitizenResidenceAddressConfig,
} from './UsCitizenResidenceAddress';
import UsCitizenTaxIdentityNo, {
  localFieldConfig as UsCitizenTaxIdentityNoConfig,
} from './UsCitizenTaxIdentityNo';

export const localFieldConfigs = [
  UsCitizenConfig,
  UsCitizenPassportNoConfig,
  UsCitizenResidenceAddressConfig,
  UsCitizenTaxIdentityNoConfig,
];

export default {
  UsCitizen,
  UsCitizenPassportNo,
  UsCitizenResidenceAddress,
  UsCitizenTaxIdentityNo,
};
