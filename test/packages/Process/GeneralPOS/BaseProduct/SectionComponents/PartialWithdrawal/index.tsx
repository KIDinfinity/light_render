import React, { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import TotalSection from './TotalSection';
import AddSection from './AddSection';
import WithdrawalOptSection from './WithdrawalOptSection';
import WithdrawalReasonSection from './WithdrawalReasonSection';
import WithdrawalLevelSection from './WithdrawalLevelSection';
import WithdrawalLevelTotalSection from './WithdrawalLevelTotalSection';
import PartialWithdrawlForTotal from '../PartialWithdrawlForTotal';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import classNames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import { OptionEnum, LimitTypeEnum } from 'process/GeneralPOS/common/Enum';

const PartialWithdrawal = ({ transactionId, form, transactionTypeCode }: any) => {
  const dispatch = useDispatch();
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );
  const partialWithdrawalFundList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.partialWithdrawalFundList
  );
  const withdrawalLevel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.withdrawalLevel
  );
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const validating = useSelector((state: any) => state?.formCommonController?.validating);
  const currency = policyInfo?.policyFundDOList?.[0]?.currency;
  const task = useSelector((state) => state.processTask?.getTask);

  const { caseCategory, companyCode } = task || {};

  const isNotDataCapture = !isDataCapture({ caseCategory });
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAllFundConfigList`,
      payload: { mainPolicyId, transactionTypeCode },
    });
  }, [mainPolicyId, policyInfo]);

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/partialWithdrawalInit`,
        payload: {
          transactionId,
        },
      });
    }
  }, [servicingInit]);

  useEffect(() => {
    if ([Region.PH].includes(tenant.region()) && currency) {
      dispatch({
        type: `${NAMESPACE}/getLimitDataByType`,
        payload: {
          companyCode: '',
          currency,
          limitType: LimitTypeEnum.MinimumRedemptionAmount,
        },
      });
    }
  }, [currency]);

  useEffect(() => {
    if (companyCode) {
      dispatch({
        type: `${NAMESPACE}/getLimitDataByType`,
        payload: {
          companyCode,
          currency,
          limitType: LimitTypeEnum.InputPartialWithdrawalFundAmount,
        },
      });
    }
  }, [companyCode, currency]);

  const dataSource = useMemo(() => {
    return lodash.uniq(
      (partialWithdrawalFundList || [])?.map((item) => formUtils.queryValue(item.fundCode)) || []
    );
  }, [partialWithdrawalFundList]);

  return (
    <div className={styles.partialWithdrawalInfo}>
      <WithdrawalLevelSection transactionId={transactionId} isNotDataCapture={isNotDataCapture} />
      {formUtils.queryValue(withdrawalLevel) === OptionEnum.PolicyLevel && (
        <WithdrawalLevelTotalSection
          transactionId={transactionId}
          isNotDataCapture={isNotDataCapture}
        />
      )}
      {((tenant.isPH() && formUtils.queryValue(withdrawalLevel) === OptionEnum.FundLevel) ||
        !tenant.isPH()) && (
        <WithdrawalOptSection transactionId={transactionId} isNotDataCapture={isNotDataCapture} />
      )}
      <WithdrawalReasonSection transactionId={transactionId} isNotDataCapture={isNotDataCapture} />
      {(tenant.isPH() && formUtils.queryValue(withdrawalLevel) === OptionEnum.FundLevel) ||
      !tenant.isPH() ? (
        <div className={styles.partialWithdrawalTable}>
          <SectionTable
            form={form}
            section="PartialWithdrawal"
            config={localConfig}
            dataSource={dataSource}
            className={styles.hiddencolor}
            classNameHeader={styles.selfTableHeader}
            numberShowRight
          >
            <Item transactionId={transactionId} validating={validating} />
          </SectionTable>
        </div>
      ) : (
        <PartialWithdrawlForTotal transactionId={transactionId} />
      )}

      <div className={classNames(styles.addFund)}>
        {!tenant.isPH() && (
          <AddSection transactionId={transactionId} isNotDataCapture={isNotDataCapture} />
        )}
        {((tenant.isPH() && formUtils.queryValue(withdrawalLevel) === OptionEnum.FundLevel) ||
          (!tenant.isPH() && isNotDataCapture)) && <TotalSection transactionId={transactionId} />}
      </div>
    </div>
  );
};

export default PartialWithdrawal;
