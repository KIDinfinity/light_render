import IdentificationNo, { localFieldConfig as IdentificationNoConfig } from './IdentificationNo';
import CardNo, { localFieldConfig as CardNoConfig } from './CardNo';
import TaxDeclarationsFlag, {
  localFieldConfig as TaxDeclarationsFlagConfig,
} from './TaxDeclarationsFlag';
import ResidenceAddress, { localFieldConfig as ResidenceAddressConfig } from './ResidenceAddress';
import USTaxDeclarations, {
  localFieldConfig as USTaxDeclarationsConfig,
} from './USTaxDeclarations';

export const localFieldConfigs = [
  IdentificationNoConfig,
  CardNoConfig,
  TaxDeclarationsFlagConfig,
  ResidenceAddressConfig,
  USTaxDeclarationsConfig,
];

export default {
  IdentificationNo,
  CardNo,
  TaxDeclarationsFlag,
  ResidenceAddress,
  USTaxDeclarations,
};
