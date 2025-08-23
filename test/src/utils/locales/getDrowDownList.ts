import { tenant, Language } from '@/components/Tenant';
import lodash from 'lodash';
import CaseCategoryMapping from './CaseCategoryMapping';
import { LS, LSKey } from '@/utils/cache';

/**
 * 获取下拉
 *
 */

const getList = ({ typeCode }: any) => {
  const language = tenant.getLocaleLang();
  const { dictionary, taskDetail = {} } = window as any;

  if (!typeCode) return [];
  let companyCode = window.history?.state?.companyCode || CaseCategoryMapping(taskDetail);

  if (companyCode === '') {
    const userInfo = LS.getItem(LSKey.CURRENTUSER);
    if (userInfo?.companyCode?.[0] === '5') {
      companyCode = '5';
    }
  }

  const datas = dictionary?.[`${typeCode}_${companyCode}`] || dictionary?.[typeCode];

  return (
    lodash
      .chain(lodash.keys(datas) || [])
      .map((key: any) => ({
        dictCode: key,
        dictName: datas?.[key]?.[language] || datas?.[key]?.[Language.EN_US],
      }))
      .filter(({ dictCode, dictName }: any) => !!dictCode && !!dictName)
      .uniqBy('dictCode')
      .value() || []
  );
};
export default (maps: any) => {
  if (lodash.isString(maps)) {
    return getList({ typeCode: maps } || {});
  }

  if (lodash.isPlainObject(maps)) {
    const { config, fieldProps }: any = maps;

    const newConfig = config?.['field-props'] ?? config;
    const newFieldProps = fieldProps?.['field-props'] ?? fieldProps;

    return getList({
      typeCode: newConfig?.['x-dict']?.dictTypeCode || newFieldProps?.['x-dict']?.dictTypeCode,
    });
  }

  if (lodash.isArray(maps)) {
    return lodash
      .chain(maps)
      .reduce((map: any, typeCode: any) => {
        return {
          ...map,
          [typeCode]: getList({ typeCode }),
        };
      }, {})
      .value();
  }
};
