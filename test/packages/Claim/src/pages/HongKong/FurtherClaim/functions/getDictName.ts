import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

/**
 * 通过dict code和misc dict数据获取dict name
 * @param dictCodes
 * @param dicts
 * @param dictCode
 * @param dictName
 */
export const getDictName = (
  dictCodes: string | string[],
  dicts: any[],
  withCode?: boolean,
  dictCode?: string,
  dictName?: string
) => {
  const dictCodesTemp = lodash.isString(dictCodes) ? lodash.split(dictCodes, ',') : dictCodes;

  return lodash
    .chain(dictCodesTemp)
    .map((dictCodeItem: any) => {
      const name =
        lodash.find(dicts, { [dictCode || 'dictCode']: dictCodeItem })?.[dictName || 'dictName'] ||
        dictCodeItem;
      if (tenant.isJP()) {
        return name;
      }
      return withCode ? `${dictCodeItem}-${name}` : name;
    })
    .compact()
    .join(',')
    .value();
};
