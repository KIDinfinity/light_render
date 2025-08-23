import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import React, { useMemo } from 'react';
import {
  AddressChangeInfo,
  ApplytoPolicies,
  ChangeCustomerInfo,
  ChangePayment,
  ContactChangeInfo,
  FreelookCancellation,
  FundAllocation,
  FundSwitch,
  IssuanceOfDuplicatePolicy,
  MailsCertificatesCorrespondences,
  Nominee,
  NomineeList,
  PartialWithdrawal,
  PolicyLoan,
  PolicySurrender,
  Refund,
  SingleTopUp,
  SpecimenSignatureChange,
  Surrender,
  RecurringPaymentMethod,
  TaxConsent,
  DeleteRiders,
  ChangeICP,
  RequestForMaturityBooster,
  RequestForMaturityBoosterHistory,
  ReissueCheque,
  AddNewRiders,
  SettlementBankAccountNomination,
  ChangeRenewalMethod,
  AcciuntEnrolmentACA,
} from '../index';
import EffectiveItem from './EffectiveItem';
import styles from './index.less';
import Item from './Item';
import { useSelector } from 'dva';

export default function DetailsMap({
  transactionTypeCode,
  transactionId,
  isNotDataCapture,
  notCft,
  OMNEShow,
}: any) {
  const validating = useSelector((state: any) => state?.formCommonController?.validating);
  const render = useMemo(() => {
    // 添加新的transactionTypeCode需补充audit.config !!!!!!
    const tranMap = {
      SRV013: {
        main: (
          <>
            <DeleteRiders transactionId={transactionId} />
          </>
        ),
      },
      SRV002: {
        main: (
          <>
            {OMNEShow && (
              <ChangePayment
                transactionId={transactionId}
                transactionTypeCode={transactionTypeCode}
                isNotDataCapture={isNotDataCapture}
              />
            )}
          </>
        ),
      },
      SRV003: {
        main: (
          <FundSwitch transactionId={transactionId} transactionTypeCode={transactionTypeCode} />
        ),
        // ex: <PaymentMethod transactionId={transactionId} />,
      },
      SRV006: {
        main: (
          <PartialWithdrawal
            transactionId={transactionId}
            transactionTypeCode={transactionTypeCode}
          />
        ),
        // ex: <PaymentMethod transactionId={transactionId} />,
      },
      SRV004: {
        main: (
          <FundAllocation transactionId={transactionId} transactionTypeCode={transactionTypeCode} />
        ),
        // ex: <PaymentMethod transactionId={transactionId} />,
      },
      SRV018: {
        main: <PolicyLoan transactionId={transactionId} />,
        // ex: <PaymentMethod transactionId={transactionId} />,
      },
      SRV011: {
        main: (
          <>
            <PolicySurrender transactionId={transactionId} />
            <Surrender transactionId={transactionId} />
          </>
        ),
      },
      SRV012: {
        main: (
          <SingleTopUp transactionId={transactionId} transactionTypeCode={transactionTypeCode} />
        ),
      },
      SRV019: {
        // 占位
        main: <></>,
      },
      SRV024: {
        main: <IssuanceOfDuplicatePolicy transactionId={transactionId} />,
      },
      SRV027: {
        main: (
          <AddNewRiders transactionId={transactionId} transactionTypeCode={transactionTypeCode} />
        ),
      },
      SRV028: {
        main: <Refund transactionId={transactionId} />,
      },
      SRV046: {
        main: <SpecimenSignatureChange transactionId={transactionId} />,
      },
      SRV022: {
        main: <ChangeRenewalMethod transactionId={transactionId} />,
      },
      SRV001: {
        main: (
          <>
            {OMNEShow && (
              <>
                <ContactChangeInfo transactionId={transactionId} />
                <AddressChangeInfo transactionId={transactionId} />
              </>
            )}
          </>
        ),
        ex: <>{OMNEShow && <ApplytoPolicies transactionId={transactionId} />}</>,
      },
      SRV031: {
        main: <>{OMNEShow && <MailsCertificatesCorrespondences transactionId={transactionId} />}</>,
        // ex: <></>
      },
      SRV009: {
        main: (
          <>
            <Nominee transactionId={transactionId} />
          </>
        ),
        ex: (
          <>
            <NomineeList transactionId={transactionId} />
          </>
        ),
      },
      SRV086: {
        main: <>{OMNEShow && <ChangeCustomerInfo transactionId={transactionId} />}</>,
      },
      SRV010: {
        main: (
          <>
            {OMNEShow && (
              <FreelookCancellation
                transactionId={transactionId}
                transactionTypeCode={transactionTypeCode}
              />
            )}
          </>
        ),
      },
      SRV008: {
        main: <RecurringPaymentMethod transactionId={transactionId} />,
      },
      SRV014: {
        main: <TaxConsent transactionId={transactionId} />,
        ex: <>{OMNEShow && <ApplytoPolicies transactionId={transactionId} />}</>,
      },
      SRV015: {
        main: <ChangeICP transactionId={transactionId} />,
      },
      SRV107: {
        main: (
          <RequestForMaturityBooster
            transactionId={transactionId}
            transactionTypeCode={transactionTypeCode}
          />
        ),
        ex: (
          <>
            {isNotDataCapture && (
              <RequestForMaturityBoosterHistory
                transactionId={transactionId}
                transactionTypeCode={transactionTypeCode}
              />
            )}
          </>
        ),
      },
      SRV102: {
        main: <ReissueCheque transactionId={transactionId} />,
      },
      SRV110: {
        main: <SettlementBankAccountNomination transactionId={transactionId} />,
      },
      SRV041: {
        main: <AcciuntEnrolmentACA transactionId={transactionId} />,
      },
    };

    if (notCft || !tranMap?.[transactionTypeCode]) {
      return TransactionTypeEnum.SRV021 !== transactionTypeCode ? (
        <div className={classNames(styles.transactionTypeSection, transactionTypeCode)}>
          <Item transactionId={transactionId} />
        </div>
      ) : (
        <></>
      );
    }

    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.srv107]: transactionTypeCode === TransactionTypeEnum.SRV107,
        })}
      >
        <div
          className={classNames(styles.transactionTypeSection, transactionTypeCode, {
            [styles.srv003]: transactionTypeCode === TransactionTypeEnum.SRV003,
          })}
        >
          {!isNotDataCapture && <Item transactionId={transactionId} validating={validating} />}
          {isNotDataCapture && (
            <div className={styles.sectionTitle}>
              {formatMessageApi({
                Label_BIZ_POS: 'TransactionDetails',
              })}
            </div>
          )}
          <EffectiveItem transactionId={transactionId} />
          {tranMap?.[transactionTypeCode]?.main || <></>}
        </div>
        {tranMap?.[transactionTypeCode]?.ex || <></>}
      </div>
    );
  }, [transactionId, OMNEShow, transactionTypeCode, isNotDataCapture, notCft, validating]);
  return render;
}
