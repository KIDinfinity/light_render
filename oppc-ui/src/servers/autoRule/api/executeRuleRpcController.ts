// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/autoRule/execute/executeRule */
export async function executeRule(
  body: API.ExecuteRuleRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAutoRuleResponseVO>(
    '/rpc/autoRule/execute/executeRule',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/execute/genQuestionnaireConfigListByCase */
export async function genQuestionnaireConfigListByCase(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAutoRuleResponseVO>(
    '/rpc/autoRule/execute/genQuestionnaireConfigListByCase',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/execute/omneExecuteRule */
export async function stp(
  body: API.ExecuteRuleRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOOmneRuleStpResultVO>(
    '/rpc/autoRule/execute/omneExecuteRule',
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
