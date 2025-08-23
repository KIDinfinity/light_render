import React, { useEffect } from 'react';
import Item from './Item';
import { Icon, Popover } from 'antd';
import styles from './index.less';
import { localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { formUtils } from 'basic/components/Form';
import SettlementBankAccountNominationForNewAccount from '../SettlementBankAccountNominationForNewAccount';
import classNames from 'classnames';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { isDcOMNE } from '../../../common/utils';

const PaymentMethod = ({ transactionId }: any) => {
  const dispatch = useDispatch();
  const taskDetailSubmissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.taskDetailSubmissionChannel
  );

  const caseCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.caseCategory
  );

  const paymentMethodList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList
  );
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const payoutPaymentMethod = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.defaultPayoutPaymentMethod
  );

  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.transactionTypeCode
  );

  const clientId = lodash.find(
    policyInfo?.policyOwnerList,
    (item) => item.policyId === mainPolicyId
  )?.clientId;

  const info = lodash.find(policyInfo?.clientInfoList, (item) => item.clientId === clientId);

  const policyOwner = [info?.title, info?.firstName, info?.middleName, info?.surname]
    .filter((item) => item)
    .join(' ');
  const clientBankAccountList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.clientBankAccountList
  );

  const txPmBankList = paymentMethodList?.[0]?.txPmBankList || [];
  const renderTxPmBankList = txPmBankList?.filter((item) =>
    tenant.isPH() ? item?.bankNewAdd !== 'Y' : true
  );
  const payoutOption = formUtils.queryValue(paymentMethodList?.[0]?.payoutOption);

  const hasDefaultPayoutBank = !!renderTxPmBankList?.find((i) => i.isDefaultPayoutBank);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAllBank`,
      payload: { transactionTypeCode },
    });
  }, [transactionTypeCode]);

  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/settlementBankAccountNominationInit`,
        payload: {
          transactionId,
          isDcOMNE: isDcOMNE({ submissionChannel: taskDetailSubmissionChannel, caseCategory }),
        },
      });
    }
  }, [transactionId, clientBankAccountList]);

  return (
    <div className={styles.investmentConsultant}>
      <div className={styles.paymentMethod}>
        {payoutOption === OptionEnum.BTR && (
          <>
            {!lodash.isEmpty(renderTxPmBankList) && (
              <SectionTable
                section="SettlementBankAccountNomination"
                config={localConfig}
                dataSource={renderTxPmBankList?.map((item, index) => index)}
                className={styles.hiddencolor}
                classNameHeader={classNames({
                  [styles.indent]: hasDefaultPayoutBank,
                  [styles.selfTableHeader]: true,
                })}
              >
                <Item
                  transactionId={transactionId}
                  policyOwner={policyOwner}
                  payoutPaymentMethod={payoutPaymentMethod}
                  hasDefaultPayoutBank={hasDefaultPayoutBank}
                />
              </SectionTable>
            )}

            <div
              className={classNames(styles.addBankAccount, {
                [styles.hidden]:
                  renderTxPmBankList?.filter((item) => item.bankNewAdd === 'Y')?.length > 0 &&
                  !tenant.isPH(),
                [styles.addSection]: true,
                [styles.addIndent]: hasDefaultPayoutBank,
              })}
            >
              <SettlementBankAccountNominationForNewAccount
                transactionId={transactionId}
                hasTxPmBank={!lodash.isEmpty(renderTxPmBankList)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const DefaultFlag = () => (
  <Popover
    placement="top"
    content={'Preferred Payout'}
    overlayClassName={styles.defaultIconWrapper}
  >
    <Icon type="star" theme="filled" className={styles.defaultIcon} />
  </Popover>
)

export default PaymentMethod;
