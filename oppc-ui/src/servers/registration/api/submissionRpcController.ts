// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/submission/documentScanningAutoSubmission */
export async function documentScanningAutoSubmission1(
  body: API.BatchDocScanningDataBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submission/documentScanningAutoSubmission',
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

/** 此处后端没有提供注释 POST /api/registration/submission/documentScanningCaseBindingDoc */
export async function documentScanningCaseBindingDoc1(
  body: API.BatchDocScanningDataBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submission/documentScanningCaseBindingDoc',
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

/** 此处后端没有提供注释 POST /api/registration/submission/getBatchDocScanSubmissionData */
export async function getBatchDocScanSubmissionData1(
  body: API.CaseInquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseInquiryResultVOObject>(
    '/api/registration/submission/getBatchDocScanSubmissionData',
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

/** 此处后端没有提供注释 POST /api/registration/submission/getSubMissionCaseCategory */
export async function getSubMissionCaseCategory1(
  body: API.SubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/submission/getSubMissionCaseCategory',
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

/** 此处后端没有提供注释 POST /api/registration/submission/receiveData */
export async function receiveDataToCreateNewCase1(
  body: API.SubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/registration/submission/receiveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDataFromNavigator */
export async function receiveDataFromNavigator1(
  body: API.NavigatorSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submission/receiveDataFromNavigator',
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

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDataFromNavigatorAsyn */
export async function receiveDataFromNavigatorAsyn1(
  body: API.NavigatorSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submission/receiveDataFromNavigatorAsyn',
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

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDataFromPaperSubmission */
export async function receiveDataFromPaperSubmission1(
  body: API.CaseSubmitVOSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/submission/receiveDataFromPaperSubmission',
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

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDataToMapCaseDocument */
export async function receiveDataToMapCaseDocument1(
  body: API.SubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/submission/receiveDataToMapCaseDocument',
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

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDataV2 */
export async function receiveDataToCreateNewCaseV21(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/registration/submission/receiveDataV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDocRelCaseDataFromNavigator */
export async function receiveDocRelCaseDataFromNavigator1(
  body: API.NavigatorSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/registration/submission/receiveDocRelCaseDataFromNavigator',
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

/** 此处后端没有提供注释 POST /api/registration/submission/receiveDocScanningCreateFromNavigator */
export async function receiveDocScanningCreateFromNavigator1(
  body: API.CaseSubmitVOBatchDocScanSubmissionDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/submission/receiveDocScanningCreateFromNavigator',
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

/** 此处后端没有提供注释 POST /api/registration/submission/test1 */
export async function test11(options?: { [key: string]: any }) {
  return request<any>('/api/registration/submission/test1', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/submission/test2 */
export async function test21(options?: { [key: string]: any }) {
  return request<any>('/api/registration/submission/test2', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/submission/test3 */
export async function test31(options?: { [key: string]: any }) {
  return request<any>('/api/registration/submission/test3', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/submission/updateDocScanningCase */
export async function updateDocScanningCase1(
  body: API.CaseSubmitVOBatchDocScanSubmissionDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/submission/updateDocScanningCase',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/documentScanningAutoSubmission */
export async function documentScanningAutoSubmission(
  body: API.BatchDocScanningDataBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/registration/submission/documentScanningAutoSubmission',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/documentScanningCaseBindingDoc */
export async function documentScanningCaseBindingDoc(
  body: API.BatchDocScanningDataBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/registration/submission/documentScanningCaseBindingDoc',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/getBatchDocScanSubmissionData */
export async function getBatchDocScanSubmissionData(
  body: API.CaseInquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseInquiryResultVOObject>(
    '/rpc/registration/submission/getBatchDocScanSubmissionData',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/getSubMissionCaseCategory */
export async function getSubMissionCaseCategory(
  body: API.SubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/submission/getSubMissionCaseCategory',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveData */
export async function receiveDataToCreateNewCase(
  body: API.SubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/registration/submission/receiveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDataFromNavigator */
export async function receiveDataFromNavigator(
  body: API.NavigatorSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/registration/submission/receiveDataFromNavigator',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDataFromNavigatorAsyn */
export async function receiveDataFromNavigatorAsyn(
  body: API.NavigatorSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/registration/submission/receiveDataFromNavigatorAsyn',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDataFromPaperSubmission */
export async function receiveDataFromPaperSubmission(
  body: API.CaseSubmitVOSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/submission/receiveDataFromPaperSubmission',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDataToMapCaseDocument */
export async function receiveDataToMapCaseDocument(
  body: API.SubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/submission/receiveDataToMapCaseDocument',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDataV2 */
export async function receiveDataToCreateNewCaseV2(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/registration/submission/receiveDataV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDocRelCaseDataFromNavigator */
export async function receiveDocRelCaseDataFromNavigator(
  body: API.NavigatorSubmissionData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/registration/submission/receiveDocRelCaseDataFromNavigator',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/receiveDocScanningCreateFromNavigator */
export async function receiveDocScanningCreateFromNavigator(
  body: API.CaseSubmitVOBatchDocScanSubmissionDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/submission/receiveDocScanningCreateFromNavigator',
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

/** 此处后端没有提供注释 POST /rpc/registration/submission/test1 */
export async function test1(options?: { [key: string]: any }) {
  return request<any>('/rpc/registration/submission/test1', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/registration/submission/test2 */
export async function test2(options?: { [key: string]: any }) {
  return request<any>('/rpc/registration/submission/test2', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/registration/submission/test3 */
export async function test3(options?: { [key: string]: any }) {
  return request<any>('/rpc/registration/submission/test3', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/registration/submission/updateDocScanningCase */
export async function updateDocScanningCase(
  body: API.CaseSubmitVOBatchDocScanSubmissionDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/submission/updateDocScanningCase',
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
