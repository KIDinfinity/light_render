// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/activateReasonGroup */
export async function activateReasonGroup1(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/activateReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/activateReasonGroupV2 */
export async function activateReasonGroupV21(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/activateReasonGroupV2',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/appendEnvoy */
export async function appendEnvoy1(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/appendEnvoy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/appendMemoForChangePlan */
export async function appendMemoForChangePlan1(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/appendMemoForChangePlan',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/appendPendingMemoByReasonGroupId */
export async function appendPendingMemoByReasonGroupId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.appendPendingMemoByReasonGroupId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/rpc/evy/reasons/appendPendingMemoByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/batchActivateReasonGroup */
export async function batchActivateReasonGroup1(
  body: API.ReasonGroupVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/batchActivateReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkActiveEnvoy */
export async function checkActiveEnvoy1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkActiveEnvoy1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/rpc/evy/reasons/checkActiveEnvoy', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkActiveEnvoyByInquiryBusinessNo */
export async function checkActiveEnvoyByInquiryBusinessNo1(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/rpc/evy/reasons/checkActiveEnvoyByInquiryBusinessNo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkEnvoyByTaskIdAndStatus */
export async function checkEnvoyByTaskIdAndStatus1(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/rpc/evy/reasons/checkEnvoyByTaskIdAndStatus',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkExistActiveExternalReasonGroupByCaseNo */
export async function checkExistActiveExternalReasonGroupByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkExistActiveExternalReasonGroupByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/rpc/evy/reasons/checkExistActiveExternalReasonGroupByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkExistSentReason */
export async function checkExistSentReason1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkExistSentReason1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/rpc/evy/reasons/checkExistSentReason', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkIsTickedDelayLetter */
export async function checkIsTickedDelayLetter1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkIsTickedDelayLetter1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/rpc/evy/reasons/checkIsTickedDelayLetter', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkMedMemo */
export async function checkMedMemo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkMedMemo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/rpc/evy/reasons/checkMedMemo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkReasonDetailSendSuccessfullyFlag */
export async function checkReasonDetailSendSuccessfullyFlag1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkReasonDetailSendSuccessfullyFlag1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/rpc/evy/reasons/checkReasonDetailSendSuccessfullyFlag',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkSubmittedAndNotReceive */
export async function checkSubmittedAndNotReceive1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkSubmittedAndNotReceive1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/rpc/evy/reasons/checkSubmittedAndNotReceive', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/checkWithdrawNotice */
export async function checkWithdrawNotice1(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/rpc/evy/reasons/checkWithdrawNotice',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/copyMainCaseReasonGroup */
export async function copyMainCaseReasonGroup1(
  body: API.CopyToCaseInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/copyMainCaseReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/copyReasonGroup */
export async function copyReasonGroup1(
  body: API.CopyReasonVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/copyReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/deleteReasonGroup */
export async function deleteReasonGroup1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteReasonGroup1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/rpc/evy/reasons/deleteReasonGroup', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/existSentReasonByBusinessNo */
export async function existSentReasonByBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.existSentReasonByBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/rpc/evy/reasons/existSentReasonByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode */
export async function findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveMemoDescByReasonGroupId */
export async function findActiveMemoDescByReasonGroupId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveMemoDescByReasonGroupId1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/api/rpc/evy/reasons/findActiveMemoDescByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveOrDraftReasonGroupCodeByReferenceCodes */
export async function findActiveOrDraftReasonGroupCodeByReferenceCodes1(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/rpc/evy/reasons/findActiveOrDraftReasonGroupCodeByReferenceCodes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveReasonGroupByCaseNo */
export async function findActiveReasonGroupByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/findActiveReasonGroupByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveReasonGroupByInquiryBusinessNo */
export async function findActiveReasonGroupByInquiryBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupByInquiryBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/findActiveReasonGroupByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveReasonGroupCodeByReferenceCodes */
export async function findActiveReasonGroupCodeByReferenceCodes1(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/rpc/evy/reasons/findActiveReasonGroupCodeByReferenceCodes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveReasonGroupCodes */
export async function findActiveReasonGroupCodes1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupCodes1Params,
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/rpc/evy/reasons/findActiveReasonGroupCodes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNo */
export async function findActiveReasonGroupCodesByBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupCodesByBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNoV2 */
export async function findActiveReasonGroupCodesByBusinessNoV21(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupCodesByBusinessNoV21Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNoV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findAllActRuTaskVariable */
export async function findAllActRuTaskVariable1(
  body: API.ActRuTaskVariableVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActRuTaskVariableVO>(
    '/api/rpc/evy/reasons/findAllActRuTaskVariable',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findAllReasonGroupByBusinessNo */
export async function findAllReasonGroupByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllReasonGroupByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/findAllReasonGroupByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findApplicationNoByPendingMemo */
export async function findApplicationNoByPendingMemo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findApplicationNoByPendingMemo1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/api/rpc/evy/reasons/findApplicationNoByPendingMemo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findCorrespondenceRelationByCaseCategory */
export async function findCorrespondenceRelationByCaseCategory1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCorrespondenceRelationByCaseCategory1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCorrespondenceRelationCfgDO>(
    '/api/rpc/evy/reasons/findCorrespondenceRelationByCaseCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findDocTypeCodeByMemoCode */
export async function findDocTypeCodeByMemoCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findDocTypeCodeByMemoCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/rpc/evy/reasons/findDocTypeCodeByMemoCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findEarliestExternalPending */
export async function findEarliestExternalPending1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findEarliestExternalPending1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPendingReasonGroupVO>(
    '/api/rpc/evy/reasons/findEarliestExternalPending',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findExternalEndReasonInfoList */
export async function findExternalEndReasonInfoList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findExternalEndReasonInfoList1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/findExternalEndReasonInfoList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findHighestRankingActiveReasonType */
export async function findHighestRankingActiveReasonType1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findHighestRankingActiveReasonType1Params,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/api/rpc/evy/reasons/findHighestRankingActiveReasonType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findLatestExternalPending */
export async function findLatestExternalPending1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatestExternalPending1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPendingReasonGroupVO>(
    '/api/rpc/evy/reasons/findLatestExternalPending',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findMemoByInquiryBusinessNo */
export async function findMemoByInquiryBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMemoByInquiryBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/api/rpc/evy/reasons/findMemoByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findNotTodoCleanCase */
export async function findNotTodoCleanCase1(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/rpc/evy/reasons/findNotTodoCleanCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findPendingListByBusinessNo */
export async function findPendingListByBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPendingListByBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoVO>(
    '/api/rpc/evy/reasons/findPendingListByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReasonDetailListByCaseNo */
export async function findReasonDetailListByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonDetailListByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonDetailVO[]>(
    '/api/rpc/evy/reasons/findReasonDetailListByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReasonGroupCodeByReferenceCodesWithoutDraft */
export async function findReasonGroupCodeByReferenceCodesWithoutDraft1(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/rpc/evy/reasons/findReasonGroupCodeByReferenceCodesWithoutDraft',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReasonGroupList */
export async function findReasonGroupList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonGroupList1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/findReasonGroupList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReasonInfo */
export async function findReasonInfo3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonInfo3Params,
  options?: { [key: string]: any },
) {
  return request<API.CaseReasonGroupDTO>(
    '/api/rpc/evy/reasons/findReasonInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReasonInfoByInquiryBusinessNo */
export async function findReasonInfo1(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.CaseReasonGroupDTO>(
    '/api/rpc/evy/reasons/findReasonInfoByInquiryBusinessNo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReceivedPendingListByBusinessNo */
export async function findReceivedPendingByBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReceivedPendingByBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoVO>(
    '/api/rpc/evy/reasons/findReceivedPendingListByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/findReGroupCodeByReasonGroupId */
export async function findReGroupCodeByReasonGroupId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReGroupCodeByReasonGroupId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/findReGroupCodeByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/furtherRequirementActiveEnvoy */
export async function furtherRequirementActiveEnvoy1(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/furtherRequirementActiveEnvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/furtherRequirementDraftEnvoy */
export async function furtherRequirementDraftEnvoy1(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/furtherRequirementDraftEnvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/generateDraftDrForPhPostQc */
export async function generateDraftDrForPhPostQc1(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/generateDraftDrForPhPostQc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/generateDraftForMedicalCase */
export async function generateDraftForMedicalCase1(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/generateDraftForMedicalCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/generateDraftReasonGroup */
export async function draftReasonGroup1(
  body: API.DraftEnvoyVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/generateDraftReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getAutoAppendEnvoy */
export async function getAutoAppendEnvoy1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAutoAppendEnvoy1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO>('/api/rpc/evy/reasons/getAutoAppendEnvoy', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getAutoAppendEnvoyId */
export async function getAutoAppendEnvoyId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAutoAppendEnvoyId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/rpc/evy/reasons/getAutoAppendEnvoyId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getByCaseNoAndReasonGroupCode */
export async function getByCaseNoAndReasonGroupCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByCaseNoAndReasonGroupCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/getByCaseNoAndReasonGroupCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getClassNameByReasonCodeAndRegionCode */
export async function getClassNameByReasonCodeAndRegionCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClassNameByReasonCodeAndRegionCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonCodeMapDTO>(
    '/api/rpc/evy/reasons/getClassNameByReasonCodeAndRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getEmailAddressBySubCaseNo */
export async function getEmailAddressBySubCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEmailAddressBySubCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<string>('/api/rpc/evy/reasons/getEmailAddressBySubCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo7(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo7Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/api/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo10(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo10Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/api/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'PUT',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo9(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo9Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/api/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 DELETE /api/rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo12(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo12Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/api/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'DELETE',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PATCH /api/rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo11(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo11Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/api/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'PATCH',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getFirstPendingDateByCaseNo */
export async function getFirstPendingDateByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFirstPendingDateByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingDateTime>(
    '/api/rpc/evy/reasons/getFirstPendingDateByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getNtuLastReceiverEmail */
export async function getNtuLastReceiverEmail1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNtuLastReceiverEmail1Params,
  options?: { [key: string]: any },
) {
  return request<string>('/api/rpc/evy/reasons/getNtuLastReceiverEmail', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getPendingMemoDate */
export async function getPendingMemoDate1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPendingMemoDate1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoDO[]>(
    '/api/rpc/evy/reasons/getPendingMemoDate',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getPendingMemoDesc */
export async function getPendingMemoDesc1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPendingMemoDesc1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoDO[]>(
    '/api/rpc/evy/reasons/getPendingMemoDesc',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getReasonDetailBySubCaseNo */
export async function getReasonDetailBySubCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReasonDetailBySubCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupDO>(
    '/api/rpc/evy/reasons/getReasonDetailBySubCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getReasonDetailByTriggerCaseNo */
export async function getReasonDetailByTriggerCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReasonDetailByTriggerCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonDetailDO>(
    '/api/rpc/evy/reasons/getReasonDetailByTriggerCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getReasonGroupBySubCaseNo */
export async function getReasonGroupBySubCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReasonGroupBySubCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO>(
    '/api/rpc/evy/reasons/getReasonGroupBySubCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/getSpecialNtuDate */
export async function getSpecialNtuDate1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpecialNtuDate1Params,
  options?: { [key: string]: any },
) {
  return request<number>('/api/rpc/evy/reasons/getSpecialNtuDate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/judgeHighestFirstNoticePriority */
export async function judgeHighestFirstNoticePriorityReasonGroup1(
  body: API.ReasonGroupVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/rpc/evy/reasons/judgeHighestFirstNoticePriority',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listActiveGroupMemosByCaseNo */
export async function listActiveGroupMemosByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listActiveGroupMemosByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/api/rpc/evy/reasons/listActiveGroupMemosByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listActiveReasonGroupByReasonCodeAndLimitDate */
export async function listReasonGroupByReasonCodeAndLimitDate1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listReasonGroupByReasonCodeAndLimitDate1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/listActiveReasonGroupByReasonCodeAndLimitDate',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listActiveReasonGroupCodeByReferenceCodes */
export async function listActiveReasonGroupCodeByReferenceCodes1(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/api/rpc/evy/reasons/listActiveReasonGroupCodeByReferenceCodes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listLoadingRemarkByReasonGroupId */
export async function getLoadingRemarkList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLoadingRemarkList1Params,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/rpc/evy/reasons/listLoadingRemarkByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listReasonGroupByReasonCodeAndDateRange */
export async function listReasonGroupByReasonCodeAndDateRange1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listReasonGroupByReasonCodeAndDateRange1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/listReasonGroupByReasonCodeAndDateRange',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listReasonGroupByReminderCodeAndDateRange */
export async function listReasonGroupByReminderCodeAndDateRange1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listReasonGroupByReminderCodeAndDateRange1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/rpc/evy/reasons/listReasonGroupByReminderCodeAndDateRange',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listSentMemosByCaseNo */
export async function listSentMemosByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSentMemosByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/api/rpc/evy/reasons/listSentMemosByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listSentMemosByInquiryBusinessNo */
export async function listSentMemosByInquiryBusinessNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSentMemosByInquiryBusinessNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/api/rpc/evy/reasons/listSentMemosByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/listUnWaiveReasonInfo */
export async function listUnWaiveReasonInfo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUnWaiveReasonInfo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupDO[]>(
    '/api/rpc/evy/reasons/listUnWaiveReasonInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/pendingReasonGroupExists */
export async function pendingReasonGroupExists1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pendingReasonGroupExists1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/rpc/evy/reasons/pendingReasonGroupExists', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/resolveByReasonCode */
export async function resolveByReasonCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resolveByReasonCode1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/resolveByReasonCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/resolveParent */
export async function resolveParent1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resolveParent1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/resolveParent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/resolveReasonGroup */
export async function resolveReasonGroup1(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/resolveReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/sendReminder */
export async function sendReminder1(
  body: API.ReasonReminderVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/sendReminder',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/splitEnvoyByDocs */
export async function splitEnvoyByDocs1(
  body: API.SplitRequest,
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/rpc/evy/reasons/splitEnvoyByDocs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/triggerEnvoy */
export async function triggerEnvoy1(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/triggerEnvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/triggerExtraFunction */
export async function triggerExtraFunction1(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/rpc/evy/reasons/triggerExtraFunction',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/triggerStopSla */
export async function triggerStopSla1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerStopSla1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/rpc/evy/reasons/triggerStopSla', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updateMemoByObjects */
export async function updateMemoByObjects1(
  body: API.PendingMemoVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/rpc/evy/reasons/updateMemoByObjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updateMemoSubmitStatusByObject */
export async function updatePendingMemoSubmitStatus1(
  body: API.UpdateMemoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/updateMemoSubmitStatusByObject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updateOriginCaseMemoByOperator */
export async function updateOriginCaseMemoByOperator1(
  body: API.SubCaseOperatorInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubCaseOperationResult>(
    '/api/rpc/evy/reasons/updateOriginCaseMemoByOperator',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updateOverdueJobByCaseNoAndGroupCode */
export async function updateOverdueJobByCaseNoAndGroupCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateOverdueJobByCaseNoAndGroupCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODate>(
    '/api/rpc/evy/reasons/updateOverdueJobByCaseNoAndGroupCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updatePendingMemoStatus */
export async function updatePendingMemoStatus1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePendingMemoStatus1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/updatePendingMemoStatus',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updatePendingMemoStatusByObject */
export async function updatePendingMemoStatusByObject1(
  body: API.UpdateMemoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/updatePendingMemoStatusByObject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/updateReminderStatus */
export async function updateReminderStatus1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateReminderStatus1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/rpc/evy/reasons/updateReminderStatus',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/validateOutstandingEnvoy */
export async function validateOutstandingEnvoy1(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/rpc/evy/reasons/validateOutstandingEnvoy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/waiveByCaseNoAndGroupCode */
export async function waiveByCaseNoAndGroupCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waiveByCaseNoAndGroupCode1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/waiveByCaseNoAndGroupCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/waivedAndAutoUnpendByCaseNo */
export async function waivedAndAutoUnpendByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedAndAutoUnpendByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/waivedAndAutoUnpendByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/waivedEnvoyByCaseNo */
export async function waivedEnvoyByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedEnvoyByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/waivedEnvoyByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCode */
export async function waivedEnvoyByCaseNoAndGroupCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedEnvoyByCaseNoAndGroupCode1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCodes */
export async function waivedEnvoyByCaseNoAndGroupCodes1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedEnvoyByCaseNoAndGroupCodes1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCodes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rpc/evy/reasons/waiveReasonGroup */
export async function waiveReasonGroup1(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/rpc/evy/reasons/waiveReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/activateReasonGroup */
export async function activateReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/activateReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/activateReasonGroupV2 */
export async function activateReasonGroupV2(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/activateReasonGroupV2',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/appendEnvoy */
export async function appendEnvoy(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/appendEnvoy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/appendMemoForChangePlan */
export async function appendMemoForChangePlan(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/appendMemoForChangePlan',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/appendPendingMemoByReasonGroupId */
export async function appendPendingMemoByReasonGroupId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.appendPendingMemoByReasonGroupIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/evy/reasons/appendPendingMemoByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/batchActivateReasonGroup */
export async function batchActivateReasonGroup(
  body: API.ReasonGroupVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/batchActivateReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkActiveEnvoy */
export async function checkActiveEnvoy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkActiveEnvoyParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/evy/reasons/checkActiveEnvoy', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkActiveEnvoyByInquiryBusinessNo */
export async function checkActiveEnvoyByInquiryBusinessNo(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/evy/reasons/checkActiveEnvoyByInquiryBusinessNo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkEnvoyByTaskIdAndStatus */
export async function checkEnvoyByTaskIdAndStatus(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/evy/reasons/checkEnvoyByTaskIdAndStatus',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkExistActiveExternalReasonGroupByCaseNo */
export async function checkExistActiveExternalReasonGroupByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkExistActiveExternalReasonGroupByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/rpc/evy/reasons/checkExistActiveExternalReasonGroupByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkExistSentReason */
export async function checkExistSentReason(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkExistSentReasonParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/evy/reasons/checkExistSentReason', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkIsTickedDelayLetter */
export async function checkIsTickedDelayLetter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkIsTickedDelayLetterParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/evy/reasons/checkIsTickedDelayLetter', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkMedMemo */
export async function checkMedMemo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkMedMemoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/rpc/evy/reasons/checkMedMemo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkReasonDetailSendSuccessfullyFlag */
export async function checkReasonDetailSendSuccessfullyFlag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkReasonDetailSendSuccessfullyFlagParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/rpc/evy/reasons/checkReasonDetailSendSuccessfullyFlag',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkSubmittedAndNotReceive */
export async function checkSubmittedAndNotReceive(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkSubmittedAndNotReceiveParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/evy/reasons/checkSubmittedAndNotReceive', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/checkWithdrawNotice */
export async function checkWithdrawNotice(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/rpc/evy/reasons/checkWithdrawNotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/copyMainCaseReasonGroup */
export async function copyMainCaseReasonGroup(
  body: API.CopyToCaseInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/copyMainCaseReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/copyReasonGroup */
export async function copyReasonGroup(
  body: API.CopyReasonVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/copyReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/deleteReasonGroup */
export async function deleteReasonGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteReasonGroupParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/evy/reasons/deleteReasonGroup', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/existSentReasonByBusinessNo */
export async function existSentReasonByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.existSentReasonByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/evy/reasons/existSentReasonByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode */
export async function findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/rpc/evy/reasons/findActiveAndDraftReasonGroupByCaseNoAndReasonGroupCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveMemoDescByReasonGroupId */
export async function findActiveMemoDescByReasonGroupId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveMemoDescByReasonGroupIdParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/rpc/evy/reasons/findActiveMemoDescByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveOrDraftReasonGroupCodeByReferenceCodes */
export async function findActiveOrDraftReasonGroupCodeByReferenceCodes(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/evy/reasons/findActiveOrDraftReasonGroupCodeByReferenceCodes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveReasonGroupByCaseNo */
export async function findActiveReasonGroupByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/rpc/evy/reasons/findActiveReasonGroupByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveReasonGroupByInquiryBusinessNo */
export async function findActiveReasonGroupByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/rpc/evy/reasons/findActiveReasonGroupByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveReasonGroupCodeByReferenceCodes */
export async function findActiveReasonGroupCodeByReferenceCodes(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/evy/reasons/findActiveReasonGroupCodeByReferenceCodes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveReasonGroupCodes */
export async function findActiveReasonGroupCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupCodesParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/evy/reasons/findActiveReasonGroupCodes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNo */
export async function findActiveReasonGroupCodesByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupCodesByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNoV2 */
export async function findActiveReasonGroupCodesByBusinessNoV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActiveReasonGroupCodesByBusinessNoV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/rpc/evy/reasons/findActiveReasonGroupCodesByBusinessNoV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findAllActRuTaskVariable */
export async function findAllActRuTaskVariable(
  body: API.ActRuTaskVariableVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActRuTaskVariableVO>(
    '/rpc/evy/reasons/findAllActRuTaskVariable',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findAllReasonGroupByBusinessNo */
export async function findAllReasonGroupByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllReasonGroupByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/rpc/evy/reasons/findAllReasonGroupByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findApplicationNoByPendingMemo */
export async function findApplicationNoByPendingMemo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findApplicationNoByPendingMemoParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/rpc/evy/reasons/findApplicationNoByPendingMemo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findCorrespondenceRelationByCaseCategory */
export async function findCorrespondenceRelationByCaseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCorrespondenceRelationByCaseCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCorrespondenceRelationCfgDO>(
    '/rpc/evy/reasons/findCorrespondenceRelationByCaseCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findDocTypeCodeByMemoCode */
export async function findDocTypeCodeByMemoCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findDocTypeCodeByMemoCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/rpc/evy/reasons/findDocTypeCodeByMemoCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findEarliestExternalPending */
export async function findEarliestExternalPending(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findEarliestExternalPendingParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPendingReasonGroupVO>(
    '/rpc/evy/reasons/findEarliestExternalPending',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findExternalEndReasonInfoList */
export async function findExternalEndReasonInfoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findExternalEndReasonInfoListParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/findExternalEndReasonInfoList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findHighestRankingActiveReasonType */
export async function findHighestRankingActiveReasonType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findHighestRankingActiveReasonTypeParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/rpc/evy/reasons/findHighestRankingActiveReasonType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findLatestExternalPending */
export async function findLatestExternalPending(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatestExternalPendingParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPendingReasonGroupVO>(
    '/rpc/evy/reasons/findLatestExternalPending',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findMemoByInquiryBusinessNo */
export async function findMemoByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMemoByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/rpc/evy/reasons/findMemoByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findNotTodoCleanCase */
export async function findNotTodoCleanCase(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/evy/reasons/findNotTodoCleanCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findPendingListByBusinessNo */
export async function findPendingListByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPendingListByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoVO>(
    '/rpc/evy/reasons/findPendingListByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReasonDetailListByCaseNo */
export async function findReasonDetailListByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonDetailListByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonDetailVO[]>(
    '/rpc/evy/reasons/findReasonDetailListByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReasonGroupCodeByReferenceCodesWithoutDraft */
export async function findReasonGroupCodeByReferenceCodesWithoutDraft(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/evy/reasons/findReasonGroupCodeByReferenceCodesWithoutDraft',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReasonGroupList */
export async function findReasonGroupList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonGroupListParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>('/rpc/evy/reasons/findReasonGroupList', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReasonInfo */
export async function findReasonInfo2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonInfo2Params,
  options?: { [key: string]: any },
) {
  return request<API.CaseReasonGroupDTO>('/rpc/evy/reasons/findReasonInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReasonInfoByInquiryBusinessNo */
export async function findReasonInfo(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.CaseReasonGroupDTO>(
    '/rpc/evy/reasons/findReasonInfoByInquiryBusinessNo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReceivedPendingListByBusinessNo */
export async function findReceivedPendingByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReceivedPendingByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoVO>(
    '/rpc/evy/reasons/findReceivedPendingListByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/findReGroupCodeByReasonGroupId */
export async function findReGroupCodeByReasonGroupId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReGroupCodeByReasonGroupIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/findReGroupCodeByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/furtherRequirementActiveEnvoy */
export async function furtherRequirementActiveEnvoy(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/furtherRequirementActiveEnvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/furtherRequirementDraftEnvoy */
export async function furtherRequirementDraftEnvoy(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/furtherRequirementDraftEnvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/generateDraftDrForPhPostQc */
export async function generateDraftDrForPhPostQc(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/generateDraftDrForPhPostQc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/generateDraftForMedicalCase */
export async function generateDraftForMedicalCase(
  body: API.FurtherRequirement,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/generateDraftForMedicalCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/generateDraftReasonGroup */
export async function draftReasonGroup(
  body: API.DraftEnvoyVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/generateDraftReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getAutoAppendEnvoy */
export async function getAutoAppendEnvoy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAutoAppendEnvoyParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO>('/rpc/evy/reasons/getAutoAppendEnvoy', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getAutoAppendEnvoyId */
export async function getAutoAppendEnvoyId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAutoAppendEnvoyIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/evy/reasons/getAutoAppendEnvoyId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getByCaseNoAndReasonGroupCode */
export async function getByCaseNoAndReasonGroupCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByCaseNoAndReasonGroupCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/rpc/evy/reasons/getByCaseNoAndReasonGroupCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getClassNameByReasonCodeAndRegionCode */
export async function getClassNameByReasonCodeAndRegionCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClassNameByReasonCodeAndRegionCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonCodeMapDTO>(
    '/rpc/evy/reasons/getClassNameByReasonCodeAndRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getEmailAddressBySubCaseNo */
export async function getEmailAddressBySubCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEmailAddressBySubCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/evy/reasons/getEmailAddressBySubCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo3Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'PUT',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 DELETE /rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo5Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'DELETE',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PATCH /rpc/evy/reasons/getEnvoyDomainByBusinessNo */
export async function getEnvoyDomainByBusinessNo4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEnvoyDomainByBusinessNo4Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/evy/reasons/getEnvoyDomainByBusinessNo',
    {
      method: 'PATCH',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getFirstPendingDateByCaseNo */
export async function getFirstPendingDateByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFirstPendingDateByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingDateTime>(
    '/rpc/evy/reasons/getFirstPendingDateByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getNtuLastReceiverEmail */
export async function getNtuLastReceiverEmail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNtuLastReceiverEmailParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/evy/reasons/getNtuLastReceiverEmail', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getPendingMemoDate */
export async function getPendingMemoDate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPendingMemoDateParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoDO[]>('/rpc/evy/reasons/getPendingMemoDate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getPendingMemoDesc */
export async function getPendingMemoDesc(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPendingMemoDescParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoDO[]>('/rpc/evy/reasons/getPendingMemoDesc', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getReasonDetailBySubCaseNo */
export async function getReasonDetailBySubCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReasonDetailBySubCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupDO>(
    '/rpc/evy/reasons/getReasonDetailBySubCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getReasonDetailByTriggerCaseNo */
export async function getReasonDetailByTriggerCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReasonDetailByTriggerCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonDetailDO>(
    '/rpc/evy/reasons/getReasonDetailByTriggerCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getReasonGroupBySubCaseNo */
export async function getReasonGroupBySubCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReasonGroupBySubCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO>(
    '/rpc/evy/reasons/getReasonGroupBySubCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/getSpecialNtuDate */
export async function getSpecialNtuDate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSpecialNtuDateParams,
  options?: { [key: string]: any },
) {
  return request<number>('/rpc/evy/reasons/getSpecialNtuDate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/judgeHighestFirstNoticePriority */
export async function judgeHighestFirstNoticePriorityReasonGroup(
  body: API.ReasonGroupVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/rpc/evy/reasons/judgeHighestFirstNoticePriority',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listActiveGroupMemosByCaseNo */
export async function listActiveGroupMemosByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listActiveGroupMemosByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/rpc/evy/reasons/listActiveGroupMemosByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listActiveReasonGroupByReasonCodeAndLimitDate */
export async function listReasonGroupByReasonCodeAndLimitDate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listReasonGroupByReasonCodeAndLimitDateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/listActiveReasonGroupByReasonCodeAndLimitDate',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listActiveReasonGroupCodeByReferenceCodes */
export async function listActiveReasonGroupCodeByReferenceCodes(
  body: API.AutoGenerationParam,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupVO[]>(
    '/rpc/evy/reasons/listActiveReasonGroupCodeByReferenceCodes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listLoadingRemarkByReasonGroupId */
export async function getLoadingRemarkList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLoadingRemarkListParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/evy/reasons/listLoadingRemarkByReasonGroupId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listReasonGroupByReasonCodeAndDateRange */
export async function listReasonGroupByReasonCodeAndDateRange(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listReasonGroupByReasonCodeAndDateRangeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/listReasonGroupByReasonCodeAndDateRange',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listReasonGroupByReminderCodeAndDateRange */
export async function listReasonGroupByReminderCodeAndDateRange(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listReasonGroupByReminderCodeAndDateRangeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/rpc/evy/reasons/listReasonGroupByReminderCodeAndDateRange',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listSentMemosByCaseNo */
export async function listSentMemosByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSentMemosByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/rpc/evy/reasons/listSentMemosByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listSentMemosByInquiryBusinessNo */
export async function listSentMemosByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listSentMemosByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.PendingMemoVO[]>(
    '/rpc/evy/reasons/listSentMemosByInquiryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/listUnWaiveReasonInfo */
export async function listUnWaiveReasonInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUnWaiveReasonInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupDO[]>(
    '/rpc/evy/reasons/listUnWaiveReasonInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/pendingReasonGroupExists */
export async function pendingReasonGroupExists(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pendingReasonGroupExistsParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/evy/reasons/pendingReasonGroupExists', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/resolveByReasonCode */
export async function resolveByReasonCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resolveByReasonCodeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/resolveByReasonCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/resolveParent */
export async function resolveParent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resolveParentParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/resolveParent', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/resolveReasonGroup */
export async function resolveReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/resolveReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/sendReminder */
export async function sendReminder(
  body: API.ReasonReminderVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>('/rpc/evy/reasons/sendReminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/splitEnvoyByDocs */
export async function splitEnvoyByDocs(
  body: API.SplitRequest,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/evy/reasons/splitEnvoyByDocs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/triggerEnvoy */
export async function triggerEnvoy(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/triggerEnvoy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/triggerExtraFunction */
export async function triggerExtraFunction(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/evy/reasons/triggerExtraFunction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/triggerStopSla */
export async function triggerStopSla(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerStopSlaParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/evy/reasons/triggerStopSla', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updateMemoByObjects */
export async function updateMemoByObjects(
  body: API.PendingMemoVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/evy/reasons/updateMemoByObjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updateMemoSubmitStatusByObject */
export async function updatePendingMemoSubmitStatus(
  body: API.UpdateMemoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/updateMemoSubmitStatusByObject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updateOriginCaseMemoByOperator */
export async function updateOriginCaseMemoByOperator(
  body: API.SubCaseOperatorInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubCaseOperationResult>(
    '/rpc/evy/reasons/updateOriginCaseMemoByOperator',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updateOverdueJobByCaseNoAndGroupCode */
export async function updateOverdueJobByCaseNoAndGroupCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateOverdueJobByCaseNoAndGroupCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODate>(
    '/rpc/evy/reasons/updateOverdueJobByCaseNoAndGroupCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updatePendingMemoStatus */
export async function updatePendingMemoStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePendingMemoStatusParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/updatePendingMemoStatus',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updatePendingMemoStatusByObject */
export async function updatePendingMemoStatusByObject(
  body: API.UpdateMemoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/updatePendingMemoStatusByObject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/updateReminderStatus */
export async function updateReminderStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateReminderStatusParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/evy/reasons/updateReminderStatus', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/validateOutstandingEnvoy */
export async function validateOutstandingEnvoy(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/evy/reasons/validateOutstandingEnvoy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/waiveByCaseNoAndGroupCode */
export async function waiveByCaseNoAndGroupCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waiveByCaseNoAndGroupCodeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/waiveByCaseNoAndGroupCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/waivedAndAutoUnpendByCaseNo */
export async function waivedAndAutoUnpendByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedAndAutoUnpendByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/waivedAndAutoUnpendByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/waivedEnvoyByCaseNo */
export async function waivedEnvoyByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedEnvoyByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/waivedEnvoyByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCode */
export async function waivedEnvoyByCaseNoAndGroupCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedEnvoyByCaseNoAndGroupCodeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCodes */
export async function waivedEnvoyByCaseNoAndGroupCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivedEnvoyByCaseNoAndGroupCodesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/evy/reasons/waivedEnvoyByCaseNoAndGroupCodes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/reasons/waiveReasonGroup */
export async function waiveReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/rpc/evy/reasons/waiveReasonGroup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
