// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/info/checkInfoExistByCategoryCode */
export async function checkInfoExistByCategoryCode(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/info/checkInfoExistByCategoryCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/cleanNotice */
export async function cleanNotice(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/cleanNotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/deleteCaseInformation */
export async function deleteCaseInformation(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/info/deleteCaseInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/deleteDataAfterReject */
export async function deleteDataAfterReject(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/deleteDataAfterReject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/deleteTaskInformation */
export async function deleteDataAfterSubmit(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/info/deleteTaskInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/delInformation */
export async function delInformation(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/info/delInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/extractInformationData */
export async function extractInformationData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.extractInformationDataParams,
  options?: { [key: string]: any },
) {
  return request<API.InformationDataVO>(
    '/rpc/bpm/info/extractInformationData',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/filterBusinessNoByReasonType */
export async function filterBusinessNoByReasonType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.filterBusinessNoByReasonTypeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/info/filterBusinessNoByReasonType', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/filterBusinessNoByReasonTypeV2 */
export async function filterBusinessNoByReasonTypeV2(
  body: API.BusinessNoQO,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/info/filterBusinessNoByReasonTypeV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/findBusinessCheckInfo */
export async function findBusinessCheckInfo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.InformationReferenceVO[]>(
    '/rpc/bpm/info/findBusinessCheckInfo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/findInfoLinkedToPolicyByCategories */
export async function findInfoLinkedToPolicyByCategories(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.InformationVO[]>(
    '/rpc/bpm/info/findInfoLinkedToPolicyByCategories',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/findInfoLinkedToPolicyByIds */
export async function findInfoLinkedToPolicyByIds(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.InformationVO[]>(
    '/rpc/bpm/info/findInfoLinkedToPolicyByIds',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/findInformationByCaseNo */
export async function findInformationByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findInformationByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.InformationDO[]>('/rpc/bpm/info/findInformationByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/findInformationByTaskId */
export async function findInformationByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findInformationByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.InformationDO[]>('/rpc/bpm/info/findInformationByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getBusinessLatestInfoByBusinessNosAndCategory */
export async function getBusinessLatestInfoByBusinessNosAndCategory(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListInformationDO>(
    '/rpc/bpm/info/getBusinessLatestInfoByBusinessNosAndCategory',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/getCategoryReasonV2 */
export async function getCategoryReasonV2(
  body: API.CategoryReasonParam,
  options?: { [key: string]: any },
) {
  return request<API.InfoReasonType[]>('/rpc/bpm/info/getCategoryReasonV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getCategroyReason */
export async function getCategroyReason(
  body: API.CategoryReasonParam,
  options?: { [key: string]: any },
) {
  return request<API.InfoReasonType>('/rpc/bpm/info/getCategroyReason', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getCommentsByBusinessNo */
export async function getCommentsByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentsByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/info/getCommentsByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getInfoReasonByCaseNoAndCategory */
export async function getInfoReasonByCaseNoAndCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoReasonByCaseNoAndCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.InfoReasonDetailDO[]>(
    '/rpc/bpm/info/getInfoReasonByCaseNoAndCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getInformationByCaseNoAndCategory */
export async function getInfoByCaseNoAndCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoByCaseNoAndCategoryParams,
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.InformationDO[]>(
    '/rpc/bpm/info/getInformationByCaseNoAndCategory',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getInquiryBusinessNoInfo */
export async function getInquiryBusinessNoInfo(
  body: API.InquiryBusinessNoInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListInformationVO>(
    '/rpc/bpm/info/getInquiryBusinessNoInfo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/getLatestInfoForIntegration */
export async function getLatestInfoForIntegration(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLatestInfoForIntegrationParams,
  options?: { [key: string]: any },
) {
  return request<API.InformationDO[]>(
    '/rpc/bpm/info/getLatestInfoForIntegration',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getMCSCommentsByBusinessNo */
export async function getMcsCommentsByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMCSCommentsByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/info/getMCSCommentsByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getNewestInformation */
export async function getNewestInformation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNewestInformationParams,
  options?: { [key: string]: any },
) {
  return request<API.InformationDO>('/rpc/bpm/info/getNewestInformation', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/getWithdrawReason */
export async function getWithdrawReason(
  body: API.BaseInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.InformationDO[]>('/rpc/bpm/info/getWithdrawReason', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/ph/migration */
export async function phMigration(
  body: API.MigrationInformationDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMigrationInformationDataVO>(
    '/rpc/bpm/info/ph/migration',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/policyRelCaseInfo */
export async function policyRelCaseInfo(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/info/policyRelCaseInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/querySPApprovalRequestByCaseNo */
export async function querySpApprovalRequestByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.querySPApprovalRequestByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<number>('/rpc/bpm/info/querySPApprovalRequestByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/refreshNotices */
export async function refreshNotices(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/refreshNotices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveBatch */
export async function saveBatch(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/saveBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveBatchInformationReference */
export async function saveBatchInformationReference(
  body: API.InformationReferenceBatchVO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/saveBatchInformationReference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveEnvoyInfo */
export async function saveEnvoyInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveEnvoyInfoParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/saveEnvoyInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveInformation */
export async function saveInformation(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.InformationVO>('/rpc/bpm/info/saveInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveInformationByBusinessNoList */
export async function saveInformationByBusinessNoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveInformationByBusinessNoListParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/info/saveInformationByBusinessNoList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveInformationForCurrentTask */
export async function saveInformationForCurrentTask(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/info/saveInformationForCurrentTask',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/saveLinkToCaseByDocumentIds */
export async function saveLinkToCaseByDocumentIds(
  body: API.LinkToCaseParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/info/saveLinkToCaseByDocumentIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/info/updateInformationForIWSMigrate */
export async function updateInformationForIwsMigrate(
  body: API.InformationVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/info/updateInformationForIWSMigrate',
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

/** 此处后端没有提供注释 POST /rpc/bpm/info/updateLatestInfoForIntegration */
export async function updateLatestInfoForIntegration(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/info/updateLatestInfoForIntegration',
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
