// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/benefitSetter/getBenefitSettingMap */
export async function getBenefitSettingMap(
  body: API.AssessmentDomain,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapObjectObject>(
    '/api/pc/benefitSetter/getBenefitSettingMap',
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
