import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import CheckList from '../../SectionComponents/Checklist';
import Suitability from '../../SectionComponents/Suitability';
import InvestmentConsultant from '../../SectionComponents/InvestmentConsultant';
import PaymentMethod from '../../SectionComponents/PaymentMethod';
import USTaxDeclarations from '../../SectionComponents/USTaxDeclarations';
import InstantPay from '../../SectionComponents/InstantPay';
import PayInDetail from '../../SectionComponents/PayInDetail';
import { tenant } from '@/components/Tenant';
import { safeParseUtil } from '@/utils/utils';
import { vagueEqual, addKey } from '../../../common/utils';
import lodash from 'lodash';
import { TransactionTypeEnum, OptionEnum } from 'process/GeneralPOS/common/Enum';

export default function index({ transactionId, transactionTypeCode, isMoreTransaction }) {
  const UIConfig = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.UIConfig);
  const processData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const { activityKey, caseCategory, submissionChannel } = formUtils.cleanValidateData(
    processData || {}
  );
  const cleanTransactionTypeCode = formUtils.queryValue(transactionTypeCode);
  const regionCode = tenant.region();

  const { icpOption, icpEligible }: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeIcp
    ) || {};

  const newConfig = useMemo(() => {
    const newUIconfig: any = {};
    (UIConfig || []).forEach((item: any) => {
      if (
        vagueEqual([
          [item.regionCode, regionCode],
          [item.caseCategory, caseCategory],
          [item.activityKey, activityKey],
          [item.submissionChannel, submissionChannel],
          [item.transactionTypeCode, cleanTransactionTypeCode],
        ])
      ) {
        addKey(newUIconfig, { ...item, remark: safeParseUtil(item.remarkJson || '') }, 5);
      } else if (
        vagueEqual([
          [item.caseCategory, caseCategory],
          [item.activityKey, activityKey],
          [item.submissionChannel, submissionChannel],
          [item.transactionTypeCode, cleanTransactionTypeCode],
        ])
      ) {
        addKey(newUIconfig, { ...item, remark: safeParseUtil(item.remarkJson || '') }, 4);
      } else if (
        vagueEqual([
          [item.caseCategory, caseCategory],
          [item.submissionChannel, submissionChannel],
          [item.transactionTypeCode, cleanTransactionTypeCode],
        ])
      ) {
        addKey(newUIconfig, { ...item, remark: safeParseUtil(item.remarkJson || '') }, 3);
      } else if (
        vagueEqual([
          [item.submissionChannel, submissionChannel],
          [item.transactionTypeCode, cleanTransactionTypeCode],
        ])
      ) {
        addKey(newUIconfig, { ...item, remark: safeParseUtil(item.remarkJson || '') }, 2);
      } else if (
        vagueEqual([[item.transactionTypeCode, cleanTransactionTypeCode]]) &&
        lodash.isEmpty(item.submissionChannel)
      ) {
        addKey(newUIconfig, { ...item, remark: safeParseUtil(item.remarkJson || '') }, 1);
      } else if (
        vagueEqual([[item.submissionChannel, submissionChannel]]) &&
        lodash.isEmpty(item.transactionTypeCode)
      ) {
        addKey(newUIconfig, { ...item, remark: safeParseUtil(item.remarkJson || '') }, 1);
      }
    });
    if (isMoreTransaction) {
      try {
        delete newUIconfig.checkList;
      } catch (err) {}
    }
    return newUIconfig;
  }, [
    activityKey,
    caseCategory,
    submissionChannel,
    transactionId,
    cleanTransactionTypeCode,
    UIConfig,
  ]);

  return (
    <div className={styles.exComponent}>
      <div
        className={classNames({
          [styles.addInstantPaySeciton]: newConfig?.instantPay,
        })}
      >
        <div className={styles.paymentMethod}>
          {(newConfig?.paymentMethod ||
            (cleanTransactionTypeCode === TransactionTypeEnum.SRV015 &&
              ([OptionEnum.BTR, OptionEnum.PPY, OptionEnum.PDT].includes(
                formUtils.queryValue(icpOption)
              ) ||
                formUtils.queryValue(icpEligible) === 'N'))) && (
            <PaymentMethod transactionId={transactionId} />
          )}
        </div>
        <div className={styles.instantPay}>
          {newConfig?.instantPay && <InstantPay transactionId={transactionId} />}
        </div>
      </div>
      {newConfig?.payInDetail && <PayInDetail transactionId={transactionId} />}
      <div className={styles.wrapper}>
        <div
          className={classNames({
            [styles.left]: newConfig?.checkList || newConfig?.suitability,
            [styles.w100]: !newConfig?.investmentConsultant,
          })}
        >
          {newConfig?.checkList && (
            <div className={styles.leftItem}>
              <CheckList transactionId={transactionId} remark={newConfig?.checkList?.remark} />
            </div>
          )}
          {newConfig?.suitability && (
            <div className={styles.leftItem}>
              <Suitability
                transactionId={transactionId}
                remark={newConfig?.suitability?.remark}
              />
            </div>
          )}
        </div>
        <div
          className={classNames({
            [styles.right]: newConfig?.investmentConsultant,
            [styles.w100]: !newConfig?.checkList && !newConfig?.suitability,
          })}
        >
          {newConfig?.investmentConsultant && (
            <InvestmentConsultant
              transactionId={transactionId}
              remark={newConfig?.investmentConsultant?.remark}
            />
          )}
        </div>
      </div>
      {tenant.isPH() ? <USTaxDeclarations transactionId={transactionId} /> : <></>}
    </div>
  );
}
