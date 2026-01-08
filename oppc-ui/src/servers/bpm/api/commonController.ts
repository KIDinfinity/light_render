// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/common/checkTaskCompleted */
export async function checkTaskCompleted(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkTaskCompletedParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/bpm/common/checkTaskCompleted', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/completeTask */
export async function completeTask7(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/docScanningAssign */
export async function docScanningAssign(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.docScanningAssignParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/docScanningAssign', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/genDocId */
export async function genDocId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genDocIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/genDocId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/getAssigneeTaskSummary */
export async function getAssigneeTaskSummary(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAssigneeTaskSummaryVO>(
    '/api/bpm/common/getAssigneeTaskSummary',
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

/** 此处后端没有提供注释 POST /api/bpm/common/getAutoRuleArgs */
export async function getAutoRuleArgs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAutoRuleArgsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/common/getAutoRuleArgs', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/getCustomerTypeConfig */
export async function getCustomerTypeByCaseCategory(
  body: API.CaseBusinessInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCustomerTypeConfigDO>(
    '/api/bpm/common/getCustomerTypeConfig',
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

/** 此处后端没有提供注释 POST /api/bpm/common/getHolidayByRegionAndTimeRange */
export async function getHolidayByRegionAndTimeRange(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHolidayByRegionAndTimeRangeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListHolidaySetting>(
    '/api/bpm/common/getHolidayByRegionAndTimeRange',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/common/getHolidaysSetting */
export async function getHolidaysSetting(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHolidaysSettingParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListHolidaySetting>(
    '/api/bpm/common/getHolidaysSetting',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/common/listTaskByCaseNo */
export async function listTaskByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTaskByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/listTaskByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/reAssignByCaseNo */
export async function reAssignByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reAssignByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/common/reAssignByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/startProcess */
export async function startProcess1(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/common/startProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/triggerExecution */
export async function triggerExecution(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerExecutionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/triggerExecution', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/updateDayEndPauseTimeZone */
export async function updateDayEndPauseTimeZone(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDayEndPauseTimeZoneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/updateDayEndPauseTimeZone', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/common/updateRcsAutoSubmissionFlag */
export async function updateRcsAutoSubmissionFlag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRcsAutoSubmissionFlagParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/common/updateRcsAutoSubmissionFlag', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
