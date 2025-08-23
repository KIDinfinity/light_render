import ResidenceTelNo, {localFieldConfig as ResidenceTelNoConfig} from './ResidenceTelNo'
import PreferredMailingAddress, {localFieldConfig as PreferredMailingAddressConfig} from './PreferredMailingAddress'
import BusinessTelNo, {localFieldConfig as BusinessTelNoConfig} from './BusinessTelNo'
import MobileTelNo, {localFieldConfig as MobileTelNoConfig} from './MobileTelNo'
import PreferredMailingAddressDetails, {localFieldConfig as PreferredMailingAddressDetailsConfig} from './PreferredMailingAddressDetails'


export const localFieldConfigs = [
  ResidenceTelNoConfig,
  PreferredMailingAddressConfig,
  BusinessTelNoConfig,
  MobileTelNoConfig,
  PreferredMailingAddressDetailsConfig,
];

export default {
  ResidenceTelNo,
  PreferredMailingAddress,
  BusinessTelNo,
  MobileTelNo,
  PreferredMailingAddressDetails,
};
