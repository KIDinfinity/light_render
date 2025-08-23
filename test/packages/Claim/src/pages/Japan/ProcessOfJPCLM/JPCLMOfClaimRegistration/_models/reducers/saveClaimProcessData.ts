import lodash from 'lodash';
import { createNormalizeData } from '../../Utils/normalizrUtils';
import { DEFAULTTICK } from '../../Utils/constant';

const saveClaimProcessData = (state: any, action: any) => {
  const staticClaimData = {
    id: '',
    creator: null,
    gmtCreate: null,
    modifier: null,
    gmtModified: null,
    deleted: null,
    transId: null,
    submissionChannel: 'M',
    submissionDate: '',
    claimNo: '',
    caseCategory: 'JP_CLM_CTG01',
    parentClaimNo: null,
    receivedDate: null,
    appealCount: null,
    taskId: '',
    processInstanceId: '',
    sfdcNo: null,
    reporter: null,
    agentNotification: null,
    recipientName: '',
    recipientPostCode: '',
    recipientAddress: '',
    agentRequest: '',
    medicalCertificateGuideline: '',
    insured: {},
    claimant: {},
    incidentList: [],
    policyList: [],
    applicationList: [],
    activityKey: null,
    notificationList: null,
  };
  const claimData = { ...staticClaimData, ...action.payload };
  const { policyCategoryMap = {} } = claimData;

  const claimant = lodash.get(claimData, 'claimant.claimant', '');
  if (DEFAULTTICK[claimant]) {
    claimData.agentNotification = true;
  }
  const noPolicyCategoryMap = lodash.isEmpty(policyCategoryMap);
  if (lodash.isArray(claimData.policyList)) {
    const newPolicyList = lodash.map(claimData.policyList, (policyItem) => {
      const temp = { ...policyItem };
      if (temp.confirmed === null) {
        temp.confirmed = 0;
      }
      if (noPolicyCategoryMap) {
        policyCategoryMap[policyItem.policyNo] = policyItem.policyCategory;
      }

      return temp;
    });
    claimData.policyList = newPolicyList;
  } else {
    claimData.policyList = [];
  }
  claimData.policyCategoryMap = policyCategoryMap;
  const result = createNormalizeData(claimData);
  return {
    ...state,
    ...result,
    policyCategoryMap,
  };
};

export default saveClaimProcessData;
