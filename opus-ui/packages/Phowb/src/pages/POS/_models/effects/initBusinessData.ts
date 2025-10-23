/* eslint-disable import/no-unresolved */
import TaskStatus from 'enum/TaskStatus';
import { safeParseUtil } from '@/utils/utils';
import { isString } from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';
import { WithdrawalOptionCode } from '../../Enum';

export default function* initBusinessData({ payload }: any, { put }: any) {
  const {
    inquiryBusinessNo,
    taskDefKey,
    taskStatus,
    submissionChannel,
    businessData,
    snapshotData,
  } = payload;
  let originalSectionData = isString(businessData?.posDataDetail)
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
  let posDataDetail = isString(businessData?.posDataDetail)
    ? safeParseUtil(businessData?.posDataDetail, {})
    : businessData?.posDataDetail;
  posDataDetail = {
    ...posDataDetail,
    partialWithdrawal: {
      ...posDataDetail?.partialWithdrawal,
      withdrawalOption:
        posDataDetail?.partialWithdrawal?.withdrawalOption || WithdrawalOptionCode.Percentage,
    },
  };

  yield put({
    type: 'saveClaimProcessData',
    payload: {
      claimProcessData: {
        ...businessData,
        submissionChannel: businessData?.submissionChannel || submissionChannel,
        posDataDetail,
      },
      init: !snapshotData && taskDefKey === TaskDefKey.PH_POS_ACT001,
      taskDefKey,
      snapshotData: snapshotData,
    },
  });

  yield put.resolve({
    type: 'getQueryPayInStatus',
    payload: { posDataDetail: businessData?.posDataDetail, taskDefKey },
  });

  if (taskStatus !== TaskStatus.completed) {
    yield put.resolve({
      type: 'getUsTaxInformationByPosNo',
      payload: { posNo: inquiryBusinessNo },
    });
  }

  return businessData;
}
