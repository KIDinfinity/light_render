import Authorizedrepresentative, {
  fieldConfig as authorizedRepresentativeConfig,
} from './Authorizedrepresentative';
import Representativeidtype, {
  fieldConfig as representativeIdTypeConfig,
} from './Representativeidtype';
import Representativeidno, { fieldConfig as representativeIdNoConfig } from './Representativeidno';
import Representativeidexpirydate, {
  fieldConfig as representativeIdExpiryDateConfig,
} from './Representativeidexpirydate';
import Representativeposition, {
  fieldConfig as representativePositionConfig,
} from './Representativeposition';
import Artitle, { fieldConfig as aRTitleConfig } from './Artitle';
import Arfirstname, { fieldConfig as aRFirstNameConfig } from './Arfirstname';
import Armiddlename, { fieldConfig as aRMiddleNameConfig } from './Armiddlename';
import Arsurname, { fieldConfig as aRSurnameConfig } from './Arsurname';
import Arextensionname, { fieldConfig as aRExtensionNameConfig } from './Arextensionname';

export const localFieldConfigs = [
  authorizedRepresentativeConfig,
  representativeIdTypeConfig,
  representativeIdNoConfig,
  representativeIdExpiryDateConfig,
  representativePositionConfig,
  aRTitleConfig,
  aRFirstNameConfig,
  aRMiddleNameConfig,
  aRSurnameConfig,
  aRExtensionNameConfig,
];

export default {
  Authorizedrepresentative,
  Representativeidtype,
  Representativeidno,
  Representativeidexpirydate,
  Representativeposition,
  Artitle,
  Arfirstname,
  Armiddlename,
  Arsurname,
  Arextensionname,
};
