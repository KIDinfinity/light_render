import { isNil } from 'lodash';
import { tenant, Language } from '@/components/Tenant';
import CaseCategoryMapping from './CaseCategoryMapping';
import { LS, LSKey } from '../cache';
/**
 * @param {要修改的数据源} obj
 * @param {按顺序要替换的文本} arg
 * @return {返回国际化后的字符串}
 */
function formatMessageApi(obj: any, ...arg: any) {
  const typeCode = String(Object.keys(obj)[0]);
  const { dictionary, taskDetail } = window as any;
  const caseCategory = { caseCategory: taskDetail?.caseCategory || obj.caseCategory || '' };
  const userCompanyCode = LS.getItem(LSKey.CURRENTUSER)?.companyCode?.[0];

  const companyCode = CaseCategoryMapping(caseCategory) || userCompanyCode;

  const dictCode = obj[typeCode];
  const language = obj.language || tenant.getLocaleLang();

  let res =
    dictionary?.[`${typeCode}_${companyCode}`]?.[dictCode]?.[language] ||
    dictionary?.[`${typeCode}_${companyCode}`]?.[dictCode]?.[Language.EN_US] ||
    dictionary?.[typeCode]?.[dictCode]?.[language] ||
    dictionary?.[typeCode]?.[dictCode]?.[Language.EN_US];
  if (arg.length > 0 && res) {
    arg.forEach((item: any, index: number) => {
      res = res.replace(`{${index}}`, item);
    });
  }

  return isNil(res) ? dictCode : res;
}

export default formatMessageApi;
