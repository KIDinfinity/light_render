import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';
import PolicyInfo from '../SectionComponents/PolicyInfo';
import TransactionInfo from '../SectionComponents/TransactionInfo';
import Add from '../SectionComponents/TransactionInfo/Add';
import UserInfo from './UserInfo';
import TransactionTypeExComponent from './TransactionTypeExComponent';
import TransactionTypeExComponentCombine from './TransactionTypeExComponentCombine';
import lodash from 'lodash';
import RequestInfo from '../SectionComponents/RequestInfo';
import {
  isDataCapture,
  isPaymentTrack,
  isHideTransactionInfoByTransactionTypeCode,
  isPolicyExcluded,
} from 'process/GeneralPOS/common/utils';
import RoleQuestionnaire from 'process/GeneralPOS/common/RoleQuestionnaire';
import PaymentTrack from '../SectionComponents/PaymentTrack';
import { tenant } from '@/components/Tenant';
import { Reinstatement } from '../SectionComponents';

const pageSelector = ({ [NAMESPACE]: modelnamepsace, processTask }: any) => {
  return {
    policyInfo: modelnamepsace.processData?.policyInfo,
    getTask: processTask?.getTask,
    transactionTypes: modelnamepsace.processData?.transactionTypes,
    transactionTypesMap: modelnamepsace.entities?.transactionTypesMap,
    isCft: modelnamepsace.processData.cftFlag ?? true,
    inquiryBusinessNo: modelnamepsace.processData?.inquiryBusinessNo,
    sourceSystem: modelnamepsace.processData?.sourceSystem,
    caseCategory: modelnamepsace.processData?.caseCategory,
    inquirySrvNo: modelnamepsace.processData?.inquirySrvNo,
  };
};

export default function Index({ servicingHistory }) {
  const dispatch = useDispatch();
  const {
    policyInfo,
    getTask,
    transactionTypes,
    transactionTypesMap,
    isCft,
    inquiryBusinessNo,
    sourceSystem,
    caseCategory,
    inquirySrvNo,
  } = useSelector(pageSelector, shallowEqual);
  const {
    caseCategory: caseCategoryByGetTask,
    businessNo,
    inquiryBusinessNo: inquiryBusinessNoByGetTask,
  } = getTask || {};
  const existInquiryBusinessNo = inquiryBusinessNo || inquiryBusinessNoByGetTask || inquirySrvNo;
  const existCaseCategory = caseCategory || caseCategoryByGetTask;

  const isNotDataCapture = !isDataCapture({ caseCategory: existCaseCategory });
  const isPaymentTrackDetail = isPaymentTrack({ caseCategory: existCaseCategory });
  const effectiveDate = formUtils.queryValue(
    transactionTypesMap?.[transactionTypes?.[0]]?.effectiveDate
  );
  useEffect(() => {
    if (isNotDataCapture) {
      dispatch({
        type: `${NAMESPACE}/getAllPrice`,
        payload: {
          effectiveDate,
          businessNo,
        },
      });
    }
  }, [effectiveDate]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAllFunds`,
    });
  }, []);

  const OMNEShow = tenant.isTH() && !isCft ? false : true;

  return (
    <div>
      <PolicyInfo
        servicingHistory={servicingHistory}
        transactionId={transactionTypes?.[0]}
        isNotDataCapture={isNotDataCapture}
      />
      {!lodash.isEmpty(policyInfo) && <UserInfo />}
      {isNotDataCapture && !isPaymentTrackDetail && <RequestInfo />}
      {lodash.compact(transactionTypes).map((transactionId: any, index) => {
        const transactionTypeCode = formUtils.queryValue(
          transactionTypesMap?.[transactionId]?.transactionTypeCode
        );
        const hideTransactionInfo = isHideTransactionInfoByTransactionTypeCode({
          transactionTypeCode,
        });
        const showReinstatement =
          !tenant.isTH() && transactionTypeCode === 'SRV019' && !isPolicyExcluded(sourceSystem);

        return (
          <div key={transactionId}>
            {isPaymentTrackDetail && <PaymentTrack transactionId={transactionId} />}
            {!hideTransactionInfo && !isPaymentTrackDetail && isCft && (
              <div key={transactionId}>
                <TransactionInfo
                  transactionId={transactionId}
                  transactionTypeCode={transactionTypeCode}
                  isNotDataCapture={isNotDataCapture}
                  notCft={false}
                  OMNEShow={OMNEShow}
                />
                {showReinstatement && <Reinstatement transactionId={transactionId} />}
                <TransactionTypeExComponent
                  isMoreTransaction={lodash.size(transactionTypes) > 1}
                  transactionId={transactionId}
                  transactionTypeCode={transactionTypeCode}
                />
              </div>
            )}
            {!hideTransactionInfo && !isPaymentTrackDetail && !isCft && (
              <TransactionInfo
                transactionId={transactionId}
                transactionTypeCode={transactionTypeCode}
                isNotDataCapture={isNotDataCapture}
                notCft={true}
                key={transactionId}
              />
            )}
          </div>
        );
      })}
      {!isPaymentTrackDetail && isCft && lodash.size(transactionTypes) > 1 && (
        <TransactionTypeExComponentCombine />
      )}
      {lodash.compact(transactionTypes).length < 1 && (
        <div className={styles.servicingRequestInfoAdd}>
          <Add />
        </div>
      )}
      {!isPaymentTrackDetail && (
        <RoleQuestionnaire
          caseCategory={existCaseCategory}
          inquiryBusinessNo={existInquiryBusinessNo}
          policyInfo={policyInfo}
        />
      )}
    </div>
  );
}
