import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ePageName, eOperation, eTaskDefToPageName, eEventOperation } from './enum';

let beforeunload = () => {};

const trackLoad = ({ dispatch, params }: any) => {
  if (!lodash.isFunction(dispatch)) return;
  beforeunload = () => {
    window.removeEventListener('beforeunload', beforeunload);
    dispatch({
      type: 'tarckPointController/unLoadPoint',
    });
  };

  window.addEventListener('beforeunload', beforeunload);
  dispatch({
    type: 'tarckPointController/loadPoint',
    payload: params,
  });
};

const tarckInquiry = ({ dispatch, params }: any) => {
  dispatch({ type: 'tarckPointController/inquiryPoint', payload: params });
};

export const tarckClaimLoad = ({ dispatch, taskDetail = {}, businessData }: any) => {
  const {
    businessNo,
    caseCategory,
    taskDefKey,
    taskId,
    taskStatus,
    inquiryBusinessNo, // 疑似后端改造的时候将key改了，似乎已经没有inquiryClaimNo
    assignee,
    processInstanceId,
  } = taskDetail;
  const insuredName =
    lodash
      .chain([businessData?.insured?.firstName, businessData?.insured?.surname])
      .compact()
      .join(' ')
      .value() || undefined;
  const params = {
    claimNo: businessNo,
    inquiryBusinessNo: inquiryBusinessNo,
    caseCategory,
    caseNo: processInstanceId,
    activityKey: taskDefKey,
    taskId,
    caseStatus: '',
    activityStatus: '',
    taskStatus,
    assignee,
    operation: eOperation.load,
    page: eTaskDefToPageName[taskDefKey],
    eventDesc: `${formatMessageApi({
      activity: taskDetail.taskDefKey,
    })} - ${eEventOperation.viewDetail}`,
    policyNo: businessData?.insured?.policyId || businessData?.policyId,
    insuredName,
  };

  trackLoad({ dispatch, params });
};

export const tarckInquiryLoad = ({
  dispatch,
  caseNo,
  businessData,
  eventName,
  eventOperation,
}: any) => {
  const insuredName =
    lodash
      .chain([businessData?.insured?.firstName, businessData?.insured?.surname])
      .compact()
      .join(' ')
      .value() || undefined;
  trackLoad({
    dispatch,
    params: {
      page: ePageName.claimInquiry,
      caseNo,
      operation: eOperation.load,
      eventDesc: `${eventName} - ${eventOperation}`,
      policyNo: businessData?.insured?.policyId,
      insuredName,
    },
  });
};

export const tarckCaseManageLoad = ({
  dispatch,
  taskDetail = {},
  eventName,
  eventOperation,
}: any) => {
  const insuredName =
    lodash
      .chain([taskDetail?.insuredFirstName, taskDetail?.insuredLastName])
      .compact()
      .join(' ')
      .value() || undefined;
  trackLoad({
    dispatch,
    params: {
      claimNo: taskDetail?.businessNo,
      inquiryBusinessNo: taskDetail?.inquiryClaimNo,
      caseCategory: taskDetail?.caseCategory,
      caseNo: taskDetail?.processInstanceId,
      page: ePageName.caseManagement,
      operation: eOperation.load,
      eventDesc: `${eventName} - ${eventOperation}`,
      policyNo: taskDetail?.policyNo,
      insuredName,
      businessType: taskDetail?.businessType,
    },
  });
};

export const tarckClaimStatus = async ({ dispatch, targetStatus }: any) => {
  if (!lodash.isFunction(dispatch)) return;
  await dispatch({
    type: 'tarckPointController/changeStatusPoint',
    payload: {
      taskStatus: targetStatus,
    },
  });
};

export const tarckUnload = ({ dispatch }: any) => {
  window.removeEventListener('beforeunload', beforeunload);
  if (!lodash.isFunction(dispatch)) return;
  dispatch({
    type: 'tarckPointController/unLoadPoint',
  });
};

const remarkFromat = (whereConditions: any) => {
  if (!whereConditions) return whereConditions;
  const data = lodash.reduce(
    whereConditions,
    (result: any, item) => {
      if (item.whereOperator === 'between') {
        result.push(
          `${formatMessageApi({ Label_COM_ReportCenter: item.fieldName })}: ${
            item.firstFieldValue
          } to ${item.secondFieldValue}`
        );
      } else {
        result.push(
          `${formatMessageApi({ Label_COM_ReportCenter: item.fieldName })}: ${item.firstFieldValue}`
        );
      }
      return result;
    },
    []
  );
  return lodash.join(data, ';');
};

export const tarckInquiryPoint = (
  dispatch: any,
  {
    policyNo,
    processInstanceId,
    inquiryBusinessNo,
    eventName,
    eventOperation,
    remarks,
    businessType,
    assignee,
    caseCategory,
    activityKey,
    taskStatus,
    clientName,
    caseStatus,
    insuredName,
    inquiryClaimNo,
  }: any
) => {
  const params = {
    policyNo,
    caseNo: processInstanceId,
    inquiryBusinessNo: inquiryBusinessNo || inquiryClaimNo,
    eventDesc: `${eventName} - ${eventOperation}`,
    remarks: remarkFromat(remarks),
    page: eventName,
    businessType,
    assignee,
    caseCategory,
    activityKey,
    taskStatus,
    insuredName: clientName || insuredName,
    caseStatus,
  };
  tarckInquiry({ dispatch, params });
};
