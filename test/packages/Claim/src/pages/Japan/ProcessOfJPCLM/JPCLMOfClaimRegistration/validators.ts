import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  VLD_000039,
  VLD_000064,
  VLD_000038,
  // VLD_000071,
} from 'claim/pages/validators/sectionValidators';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000051 } from '@/utils/validations';

const getPolicyNoList = (policyListMap) => {
  const policyListEntries = policyListMap && Object.entries(policyListMap);
  const policyNoList = [];
  lodash.map(policyListEntries, (item) => {
    if (formUtils.queryValue(item[1].confirmed) === 1) {
      policyNoList.push({ policyNo: formUtils.queryValue(item[1].policyNo) });
    }
  });

  return policyNoList;
};

const getPolicyNo = (policyListMap) => {
  const policyListEntries = policyListMap && Object.entries(policyListMap);
  const policyNoList = [];
  lodash.map(policyListEntries, (item) => {
    policyNoList.push(formUtils.queryValue(item[1].policyNo));
  });

  return policyNoList;
};

const getPolicyNoArray = (applicationListMap) => {
  const applicationListEntries = applicationListMap && Object.entries(applicationListMap);
  const existPolicyNoList = [];
  lodash.map(applicationListEntries, (item) => {
    existPolicyNoList.push({ policyNoArray: formUtils.queryValue(item[1].policyNoArray) });
  });

  return existPolicyNoList;
};
// 统计section错误
const collectSectionErrors = (claimProcessData: any, claimEntities: any, nextSubmited: boolean) => {
  if (!claimProcessData || !claimEntities) {
    return [];
  }
  const { parentClaimNo } = claimProcessData;
  const policyNoList = getPolicyNoList(claimEntities.policyListMap);
  const policyNo = getPolicyNo(claimEntities.policyListMap);
  const existPolicyNoList = getPolicyNoArray(claimEntities.applicationListMap);
  const errors: string[] = [];
  const error1 = VLD_000039(claimProcessData.policyList);
  const error2 = VLD_000064(claimEntities.applicationListMap);
  const error3 = VLD_000038(policyNoList, existPolicyNoList);
  // const error4 = VLD_000071(policyNo);

  if (parentClaimNo && error1) {
    errors.push(error1);
  }
  if (parentClaimNo && error2) {
    errors.push(error2);
  }
  if (parentClaimNo && nextSubmited && error3.length) {
    errors.push(error3.join(','));
  }
  // if (parentClaimNo && error4.length) {
  //   errors.push(error4.join(','));
  // }

  if (VLD_000051(claimProcessData?.incidentList, nextSubmited)) {
    errors.push(
      formatMessageApi({
        Label_COM_WarningMessage: 'ERR_000070',
      })
    );
  }

  return errors;
};

export { collectSectionErrors };
