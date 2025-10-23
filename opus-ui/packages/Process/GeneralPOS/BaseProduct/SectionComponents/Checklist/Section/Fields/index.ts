import ActiveIdCard, { fieldConfig as ActiveIdCardConfig } from './ActiveIdCard';
import Signature, { fieldConfig as SignatureConfig } from './Signature';
import IdCardNo, { fieldConfig as IdCardNoConfig } from './IdCardNo';
import CL_ValidSignature, { fieldConfig as CL_ValidSignatureConfig } from './CL_ValidSignature';
import CL_ReceiveCompleteRequest, {
  fieldConfig as CL_ReceiveCompleteRequestConfig,
} from './CL_ReceiveCompleteRequest';
import CL_TrusteeConsent, { fieldConfig as CL_TrusteeConsentConfig } from './CL_TrusteeConsent';
import CL_ILSustainabilityConsent, {
  fieldConfig as CL_ILSustainabilityConsentConfig,
} from './CL_ILSustainabilityConsent';

export const localFieldConfigs = [
  ActiveIdCardConfig,
  IdCardNoConfig,
  SignatureConfig,
  CL_ValidSignatureConfig,
  CL_ReceiveCompleteRequestConfig,
  CL_TrusteeConsentConfig,
  CL_ILSustainabilityConsentConfig,
];

export default {
  ActiveIdCard,
  IdCardNo,
  Signature,
  CL_ValidSignature,
  CL_ReceiveCompleteRequest,
  CL_TrusteeConsent,
  CL_ILSustainabilityConsent,
};
