// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/registration/van/correspondence/correspondenceValidate */
export async function correspondenceValidate(
  body: API.BusinessValidationVOOwbRegVanCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/registration/van/correspondence/correspondenceValidate',
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

/** 此处后端没有提供注释 POST /rpc/registration/van/correspondence/getCorrespondenceSendData */
export async function getCorrespondenceSendData(
  body: API.CorrespondenceInitialBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCorrespondenceSendBO>(
    '/rpc/registration/van/correspondence/getCorrespondenceSendData',
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
