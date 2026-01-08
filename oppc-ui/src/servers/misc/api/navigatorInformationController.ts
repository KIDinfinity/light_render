// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/information/deleteInfomationById */
export async function deleteInfomationById(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/information/deleteInfomationById',
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

/** 此处后端没有提供注释 POST /api/navigator/information/findInformation */
export async function findInformation(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListNavigatorInformationDO>(
    '/api/navigator/information/findInformation',
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

/** 此处后端没有提供注释 POST /api/navigator/information/findInformationHist */
export async function findInformationHist(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListNavigatorInformationDO>(
    '/api/navigator/information/findInformationHist',
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

/** 此处后端没有提供注释 POST /api/navigator/information/findTempInformationNum */
export async function findTempInformationNum(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInteger>(
    '/api/navigator/information/findTempInformationNum',
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

/** 此处后端没有提供注释 POST /api/navigator/information/getTemporaryInformation */
export async function getTemporaryInformation(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListNavigatorInformationDO>(
    '/api/navigator/information/getTemporaryInformation',
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

/** 此处后端没有提供注释 POST /api/navigator/information/saveInformation */
export async function saveInformation2(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVONavigatorInformationDO>(
    '/api/navigator/information/saveInformation',
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
