/* eslint-disable import/no-unresolved */
import TaskStatus from 'enum/TaskStatus';
import { safeParseUtil } from '@/utils/utils';
import { isString } from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';

export default function* initBusinessData({ payload }: any, { put }: any) {
  const {
    inquiryBusinessNo,
    taskDefKey,
    taskStatus,
    businessData,
    snapshotData,
  } = payload;
  let originalSectionData = isString(businessData?.originalSectionData)
    ? safeParseUtil(businessData?.originalSectionData, {})
    : businessData?.originalSectionData;
  originalSectionData = {
    changeContactInformation: {
      businessTelNo: '',
      residenceTelNo: '',
      mobileTelNo: '',
      ...(originalSectionData?.changeContactInformation || {}),
    },
    changePreferredMailingAddress: {
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      city: '',
      country: '',
      emailAddress: '',
      preferredMailingAddress: '',
      zipCode: '',
      ...(originalSectionData?.changePreferredMailingAddress || {}),
    },
  };


  const claimData = {
    businessData: {
      transactionTypes: [{}],
      ...businessData,
      ...businessData?.businessData,
      businessData: void 0,
    }
  }
  if(!claimData.businessData.transactionTypes[0].decision)
    claimData.businessData.transactionTypes[0].decision = 'A'
  const flag = claimData.businessData.transactionTypes?.[0]?.usTaxInformation?.taxDeclarationsFlag;
  if(flag !== void 0)
    claimData.businessData.transactionTypes[0].usTaxInformation.taxDeclarationsFlag = {
      'N': 0,
      'Y': 1,
      0: 0,
      1: 1,
    }[flag]


  yield put({
    type: 'saveClaimProcessData',
    payload: {
      claimProcessData: claimData,
      init: !snapshotData && taskDefKey === TaskDefKey.PH_POS_ACT001,
      taskDefKey,
      snapshotData: snapshotData,
    },
  });

  if(claimData.businessData.mainPolicyId) {
    yield put({
      type: 'getPolicyInfoByPolicyNo',
      payload: {
        skipRequest: true,
        policyId: claimData.businessData.mainPolicyId
      },
    });
  }

  if (taskStatus !== TaskStatus.completed) {
    yield put.resolve({
      type: 'getUsTaxInformationByPosNo',
      payload: { posNo: inquiryBusinessNo },
    });
  }

  return businessData;
}
