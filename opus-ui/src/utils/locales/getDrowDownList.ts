import { tenant, Language } from '@/components/Tenant';
import lodash from 'lodash';
import CaseCategoryMapping from './CaseCategoryMapping';

/**
 * 获取下拉
 *
 */
type dictItem = {
  dictCode: string;
  dictName: string;
};

const getList = ({ typeCode }: { typeCode: string }): dictItem[] => {
  const language = tenant.getLocaleLang();
  const { dictionary, taskDetail = {} } = window as any;

  if (!typeCode) return [];
  //这里出现了TH本来没有companyCode，但是MDLTH-6660会给companyCode为3，但是流程map是2的情况，优先用getTask的
  const companyCode =
    window.history?.state?.companyCode ||
    taskDetail?.companyCode ||
    CaseCategoryMapping(taskDetail);

  const datas = dictionary?.[`${typeCode}_${companyCode}`] || dictionary?.[typeCode];

  return (
    lodash
      .chain(lodash.keys(datas) || [])
      .map((key: any) => ({
        dictCode: key,
        dictName: datas?.[key]?.[language] || datas?.[key]?.[Language.EN_US] || key,
      }))
      .filter(({ dictCode, dictName }: any) => !!dictCode && !!dictName)
      .uniqBy('dictCode')
      .value() || []
  );
};

function getDrowDownList(maps: string): dictItem[];
function getDrowDownList(maps: { config: any } | { fieldProps: any }): dictItem[];
function getDrowDownList(maps: string[]): Record<string, dictItem[]>;
function getDrowDownList(maps: unknown): dictItem[] | Record<string, dictItem[]> {
  if (lodash.isString(maps)) {
    return getList({ typeCode: maps });
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
      .reduce((map: Record<string, dictItem[]>, typeCode: string) => {
        return {
          ...map,
          [typeCode]: getList({ typeCode }),
        };
      }, {})
      .value();
  }
  return [];
}

export default getDrowDownList;
