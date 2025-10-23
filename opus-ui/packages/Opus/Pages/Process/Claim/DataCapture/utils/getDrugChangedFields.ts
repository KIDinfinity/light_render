import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { getStandardDrugListForPage } from '@/services/claimJpPlanStandardControllerService';
import defaultProps from 'basic/components/Form/FormItem/FormItemSelectPlus/defaultProps.ts';
import { fieldConfig } from '../../Components/Procedure/AntiCancerAndHormone/Section/Fields/TherapeuticDrugs.tsx';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export default async (drugsListStore, currentCodeBeforeOpenModal) => {
  if (!lodash.isArray(drugsListStore) || !lodash.isArray(currentCodeBeforeOpenModal)) {
    return undefined;
  }
  if (
    lodash.intersection(drugsListStore, currentCodeBeforeOpenModal)?.length ===
    drugsListStore?.length
  ) {
    return undefined;
  }
  const formerList = lodash.cloneDeep(currentCodeBeforeOpenModal);
  const afterList = lodash.cloneDeep(
    lodash.uniq([...drugsListStore, ...currentCodeBeforeOpenModal])
  );

  const params = {
    current: 1,
    pagesize: 99,
    params: {
      current: 1,
      dropdownCode: defaultProps?.dropdownCode || 'claim_dict001',
      pageSize: 99,
      regionCode: tenant.region(),
      searchContent: afterList?.join(),
      searchType: 3,
    },
  };
  //获取最大数据后匹配进new、old的list返回
  const response = await getStandardDrugListForPage(params, {});
  let changedField;
  if (
    response &&
    response?.success &&
    lodash.isArray(response?.resultData?.rows) &&
    response?.resultData?.rows.length > 0
  ) {
    const { rows } = response.resultData;
    const localeNewList = [];
    const localeOldList = [];
    rows.forEach((item) => {
      formerList.forEach((ele) => {
        if (item.drugId === ele) {
          localeOldList.push(`${item.version}-${item.drugName}`);
        }
      });
      afterList.forEach((ele) => {
        if (item.drugId === ele) {
          localeNewList.push(`${item.version}-${item.drugName}`);
        }
      });
    });
    if (lodash.isEqual(formerList, afterList)) {
      return undefined;
    }
    //获取label
    const labelConfig = fieldConfig?.['field-props']?.label;

    let label = 'Anti-cancer Drug Name';
    if (labelConfig && lodash.isPlainObject(labelConfig)) {
      const { dictTypeCode, dictCode } = labelConfig;
      if (dictTypeCode && dictCode) {
        label = formatMessageApi({
          [dictTypeCode]: dictCode,
        });
      }
    }
    changedField = {
      __change: {
        dirty: false,
        errors: undefined,
        format: '',
        label,
        locale_new: localeNewList.join(),
        locale_old: localeOldList.join(),
        name: labelConfig?.field || 'therapeuticDrugs',
        touched: true,
        validating: false,
        value: afterList,
      },
    };
    return changedField;
  }
  return undefined;
};
