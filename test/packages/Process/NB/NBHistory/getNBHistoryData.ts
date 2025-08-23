import lodash from 'lodash';

import { getUwProposal } from '@/services/owbNbNbInquiryControllerService';
import { businessDataBEToFE } from '@/services/gotConvertService';


export default async ({ businessNo, inquiryBusinessNo, caseCategory }: any) => {
  const response: any = await getUwProposal({
    businessNo,
    inquiryBusinessNo,
    caseCategory,
  });

  if (response?.success && lodash.isPlainObject(response?.resultData?.businessData)) {
    return businessDataBEToFE( { requestData: response?.resultData?.businessData });
  }

  return {success: false, resultData: {}};
};
