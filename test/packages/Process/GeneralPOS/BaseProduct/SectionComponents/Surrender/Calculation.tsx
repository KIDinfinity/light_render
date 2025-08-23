import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon } from 'antd';
import classnames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import React from 'react';
import style from './index.less';
import { formatWithPeriod } from '@/utils/precisionUtils';

const Calculation = ({ transactionId, select = 'suspBalanceAmt', setSelect }: any) => {
  const policySurrender =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.policySurrender
    ) || {};
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const mainCompanyCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainCompanyCode
  );
  const policyContractList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.processData?.policyInfo?.policyContractList
    ) || [];
  const ulPolicyIndicator =
    lodash.find(policyContractList, (item) => mainPolicyId === item?.policyId)?.ulPolicyIndicator ??
    'N';

  const calculationConfig = [
    {
      field: 'cashValue',
      label: 'CashValue',
      operator: '+',
      selectable: true,
      ulPolicyIndicatorList: ['N'],
    },
    {
      field: 'totalEstimatedValue',
      label: 'TotalEstimatedValue',
      operator: '+',
      selectable: true,
      ulPolicyIndicatorList: ['Y'],
    },
    {
      field: 'proRateRider',
      label: 'ProRateRider',
      operator: '+',
      selectable: false,
      ulPolicyIndicatorList: ['N', 'Y'],
    },
    {
      field: 'penalty',
      label: 'Penalty',
      operator: '-',
      selectable: false,
      ulPolicyIndicatorList: ['Y'],
    },
    {
      field: 'policyLoan',
      label: 'PolicyLoan',
      operator: '-',
      selectable: false,
      ulPolicyIndicatorList: ['N'],
    },
    {
      field: 'cashDeposit',
      label: 'ICP/Cashback',
      operator: '+',
      selectable: false,
      ulPolicyIndicatorList: ['N'],
    },
    {
      field: 'suspBalanceAmt',
      label: 'SuspenseBalance',
      operator: mainCompanyCode === 'SCBL' ? '-' : '+',
      selectable: true,
      ulPolicyIndicatorList: ['N'],
    },
  ];
  return (
    <div className={style.calculation}>
      {lodash.map(calculationConfig, (item) => (
        <div className={style.itemBox}>
          {lodash.includes(item.ulPolicyIndicatorList, ulPolicyIndicator) && (
            <div
              className={classnames(style.name, item.field === select && style.select)}
              onClick={() => (item.selectable ? setSelect(item.field) : true)}
            >
              {item.operator && <span className={style.operator}>{item.operator}</span>}
              {formatMessageApi({ Label_BIZ_POS: item.label })}
              <span className={style.num}>
                {lodash.isNumber(policySurrender[item.field])
                  ? formatWithPeriod(policySurrender[item.field], 2, true)
                  : policySurrender[item.field]}
              </span>
              {item.selectable && (
                <Icon
                  type="right"
                  className={classnames(style.icon, { [style.selectIcon]: item.field === select })}
                />
              )}
            </div>
          )}
        </div>
      ))}
      <div className={style.borderLine} />

      <div className={classnames(style.total, ulPolicyIndicator === 'N' && style.notULTotal)}>
        Total Surrender Value
        <span className={style.num}>
          {lodash.isNumber(policySurrender.totalSurrenderAmt)
            ? formatWithPeriod(policySurrender.totalSurrenderAmt, 2, true)
            : policySurrender.totalSurrenderAmt}
        </span>
      </div>

      {ulPolicyIndicator === 'Y' && (
        <>
          <div className={style.borderLine2} />
          <div
            className={classnames(
              style.suspenseBalance,
              'suspBalanceAmt' === select && style.select
            )}
            onClick={() => setSelect('suspBalanceAmt')}
          >
            Suspense Balance
            <span className={style.num}>
              {lodash.isNumber(policySurrender.suspBalanceAmt)
                ? formatWithPeriod(policySurrender.suspBalanceAmt, 2, true)
                : policySurrender.suspBalanceAmt}
            </span>
            <Icon
              type="right"
              className={classnames(style.icon, 'suspBalanceAmt' === select && style.selectIcon)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Calculation;
