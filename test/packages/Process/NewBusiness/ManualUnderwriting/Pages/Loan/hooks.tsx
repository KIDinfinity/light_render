import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { fnPrecisionFormat } from '@/utils/precisionUtils';
import lodash, { get, isEmpty, isFunction } from 'lodash';

import React, { useMemo } from 'react';
import BooleanEnum from 'basic/enum/BooleanEnum';
import RelatePolicy from './Show/RelatePolicy';
import { formUtils } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './_config/LoanTableField';
import moment from 'moment';
import { Region, tenant } from '@/components/Tenant';
export const useLoanDetailList = () => {
  const list = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.processData?.loanDetailList || []
  );
  return useMemo(() => {
    return list.map((item: any) => {
      return formUtils.objectQueryValue(item);
    });
  }, [list]);
};
export const useModalLoanDetailList = () => {
  return useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.modalData?.loanDetailList || []
  );
};
export const useShowLoan = () => {
  const loanProtection =
    useSelector(
      ({ [NAMESPACE]: modelNamespace }: any) =>
        modelNamespace.processData?.planInfoData?.loanProtection
    ) || '';

  return useMemo(() => {
    return loanProtection === BooleanEnum.Yes;
  }, [loanProtection]);
};

const defaultDropdownRender = (config: any) => {
  const dropdownList = getDrowDownList({ config }) as { dictCode: string; dictName: string }[];
  return (val: any) =>
    lodash
      .chain(dropdownList)
      .find((el: any) => el.dictCode === val)
      .get('dictName')
      .value() ||
    val ||
    '-';
};
const defaultNumberRender = () => {
  return (val: string) => {
    const num = parseFloat(val);
    return fnPrecisionFormat(num.toFixed(2) || 0) || '-';
  };
};

const defaultDateRender = () => {
  return (val: string) => moment(val).format('DD/MM/YYYY') || '';
};

const getDefaultRenderByFieldType = (fieldType: string, config: any) => {
  const type = fieldType.toLowerCase();
  switch (type) {
    case 'dropdown':
      return defaultDropdownRender(config);
    case 'number':
      return defaultNumberRender();
    case 'date':
      return defaultDateRender();
    default:
      return (val: any) => val;
  }
};
const getColumnFromConfig = (config: any, customerRender?: (val: any, record: any) => any) => {
  const fieldType = lodash.get(config, 'fieldType');
  const { dictTypeCode, dictCode } = lodash.get(config, 'field-props.label', {});
  const title = formatMessageApi({ [dictTypeCode]: dictCode });
  const dataIndex = lodash.get(config, 'field');

  const render = isFunction(customerRender)
    ? customerRender
    : getDefaultRenderByFieldType(fieldType, config);
  return {
    title,
    dataIndex,
    render,
  };
};
const getColumnsFromSectionConfig = (
  sectionConfig: any,
  customerRenders: Record<string, (val: any, record: any) => any>
) => {
  const fieldConfigs = lodash
    .chain(sectionConfig)
    .filter((config) => !isEmpty(config?.field) && get(config, 'field-props.visible') === 'Y')
    .orderBy((item) => get(item, 'field-props.x-layout.lg.order'))
    .value();
  const columns = lodash.map(fieldConfigs, (config) => {
    const field = lodash.get(config, 'field');
    const customerRender = lodash.get(customerRenders, field);
    return getColumnFromConfig(config, customerRender);
  });
  return columns;
};

export const useLoanColumns = (tooltip: any, trigger: any) => {
  const config = useGetSectionAtomConfig({ localConfig, section: 'Load-Table' });

  const customerRenders =
    tenant.region({
      [Region.KH]: {
        loanContractNumber: (item: string, record: any) => (
          <RelatePolicy tooltip={tooltip} record={record} trigger={trigger} loanContractNo={item} />
        ),
      },
      [Region.MY]: {
        interestRate: (item: string) => item,
        interimPeriod: (item: string) => item,
        numberOfPeriod: (item: string) => item,
      },
    }) || {};
  const columns = getColumnsFromSectionConfig(config, customerRenders);
  return columns;
};
