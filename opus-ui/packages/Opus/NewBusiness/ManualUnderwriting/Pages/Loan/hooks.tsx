import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import lodash from 'lodash';

import React, { useMemo } from 'react';
import BooleanEnum from 'basic/enum/BooleanEnum';
import RelatePolicy from './Show/RelatePolicy';
import { formUtils } from 'basic/components/Form';

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
export const useLoanColumns = (tooltip: any, trigger: any) => {
  const Dropdown_POL_Period = getDrowDownList('Dropdown_POL_Period');
  const Dropdown_POL_NewLoanFlag = getDrowDownList('Dropdown_POL_NewLoanFlag');
  const Dropdown_CFG_Currency = getDrowDownList('Dropdown_CFG_Currency');

  const getFormate = (val: string) => {
    const num = parseFloat(val);
    return fnPrecisionFormat(fnPrecisionParser(num, 2) || 0);
  };
  const getDictName = (lsit: { dictCode: string; dictName: string }[] = [], val: string) => {
    return (
      lodash
        .chain(lsit)
        .find((el: any) => el.dictCode === val)
        .get('dictName')
        .value() || val
    );
  };

  const columns = [
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'LoanContractNo' }),
      dataIndex: 'loanContractNumber',
      render: (item: string, record: any) => (
        <RelatePolicy tooltip={tooltip} record={record} trigger={trigger} loanContractNo={item} />
      ),
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'LoanProtectionAmount' }),
      dataIndex: 'newLoanAmount',
      render: (val: any) => getFormate(val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'Currency' }),
      dataIndex: 'currency',
      render: (val: any) => getDictName(Dropdown_CFG_Currency, val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'Period' }),
      dataIndex: 'period',
      render: (val: any) => getDictName(Dropdown_POL_Period, val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'NumberOfPreiod' }),
      dataIndex: 'numberOfPeriod',
      render: (val: any) => getFormate(val) || '-',
    },
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'IsNew' }),
      dataIndex: 'isNew',
      render: (val: any) => getDictName(Dropdown_POL_NewLoanFlag, val) || '-',
    },
  ];
  return columns;
};
