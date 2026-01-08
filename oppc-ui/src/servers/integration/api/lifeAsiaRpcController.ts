// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/la/checkIfStopCallingBo */
export async function checkIfStopCallingBo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkIfStopCallingBoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/rpc/integration/la/checkIfStopCallingBo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/la/checkPolicyInsured */
export async function checkPolicyInsuredInfo(
  body: API.RemotePolicyInsuredQO,
  options?: { [key: string]: any },
) {
  return request<API.SimplifyInsuredInfo[]>(
    '/rpc/integration/la/checkPolicyInsured',
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

/** 此处后端没有提供注释 POST /rpc/integration/la/checkPolicyInsuredIsNew */
export async function checkPolicyInsuredIsNew(
  body: API.RemotePolicyInsuredQO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/la/checkPolicyInsuredIsNew', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/disableBusinessObjectByList */
export async function disableBusinessObjectByList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/integration/la/disableBusinessObjectByList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/disableBusinessObjects */
export async function disableBusinessObjects(
  body: API.RecordBusinessObjectVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/la/disableBusinessObjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/findExistIlClaimNoList */
export async function findExistIlClaimNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/integration/la/findExistIlClaimNoList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/findIlClaimNoList */
export async function findIlClaimNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/integration/la/findIlClaimNoList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/getInsuredInfo */
export async function getInsuredInfo2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInsuredInfo2Params,
  body: API.SubmissionInfo,
  options?: { [key: string]: any },
) {
  return request<API.InsuredInfo>('/rpc/integration/la/getInsuredInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/getLaResponseDetail */
export async function getLaResponseDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLaResponseDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.LaResponseDetail[]>(
    '/rpc/integration/la/getLaResponseDetail',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/la/insertCanRecordIfCancelHospitalBilling */
export async function insertCanRecordIfCancelHospitalBilling(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<any>(
    '/rpc/integration/la/insertCanRecordIfCancelHospitalBilling',
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

/** 此处后端没有提供注释 POST /rpc/integration/la/insertLaBusinessObjectResult */
export async function insertLaBusinessObjectResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.insertLaBusinessObjectResultParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/integration/la/insertLaBusinessObjectResult', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/insertLaBusinessObjectResultByFunction */
export async function insertLaBusinessObjectResultByFunction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.insertLaBusinessObjectResultByFunctionParams,
  options?: { [key: string]: any },
) {
  return request<any>(
    '/rpc/integration/la/insertLaBusinessObjectResultByFunction',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/la/recordBusinessObject */
export async function recordBusinessObject1(
  body: API.RecordBusinessObjectVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/la/recordBusinessObject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/recordBusinessObjects */
export async function recordBusinessObjects(
  body: API.RecordBusinessObjectVO[],
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/la/recordBusinessObjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/recordJobLogAndCheckBoRunning */
export async function recordEndCaseJobLogAndCheckBoRunning(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.EndCaseCheck>(
    '/rpc/integration/la/recordJobLogAndCheckBoRunning',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/la/recordJobLogAndCheckBoRunningByBatchNo */
export async function recordEndCaseJobLogAndCheckBoRunningByBatchNo(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.EndCaseCheck>(
    '/rpc/integration/la/recordJobLogAndCheckBoRunningByBatchNo',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/la/updateBusinessObject */
export async function updateBusinessObject(
  body: API.UpdateBusinessObjectVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/rpc/integration/la/updateBusinessObject',
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

/** 此处后端没有提供注释 POST /rpc/integration/la/updateData */
export async function updateData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDataParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/integration/la/updateData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/updateJobLog */
export async function updateJobLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateJobLogParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/la/updateJobLog', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/la/updateJobLogStatusAndErrorMsg */
export async function updateJobLogStatusAndErrorMsg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateJobLogStatusAndErrorMsgParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/la/updateJobLogStatusAndErrorMsg', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/skipBoError/markPass */
export async function markPass(
  body: API.SkipBoHandlerCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/integration/skipBoError/markPass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
