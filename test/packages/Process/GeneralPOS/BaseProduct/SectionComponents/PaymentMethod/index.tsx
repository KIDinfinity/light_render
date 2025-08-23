import React, { useEffect } from 'react';
import Item from './Item';
import { Icon, Popover } from 'antd';
import styles from './index.less';
import { localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PayoutOptionSection from './PayoutOptionSection';
import PPYSection from './PPYSection';
import CHQSection from './CHQSection';
import AddSection from './AddSection';
import PaymentMethodForNewAccountSection from '../PaymentMethodForNewAccount';
import classNames from 'classnames';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import classnames from 'classnames';
import { isDcOMNE } from '../../../common/utils';
import { PreferPayout } from './PreferPayout';

const PaymentMethod = ({ transactionId }: any) => {
  const dispatch = useDispatch();
  const taskDetailSubmissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.taskDetailSubmissionChannel
  );

  const caseCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.caseCategory
  );

  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
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
  const payoutOption = formUtils.queryValue(paymentMethodList?.[0]?.payoutOption);
  const setPreferredPayout = formUtils.queryValue(paymentMethodList?.[0]?.setPreferredPayout);
  const renderTxPmBankList = txPmBankList?.filter((item) =>
    tenant.isPH() ? item?.bankNewAdd !== 'Y' : true
  );
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
        type: `${NAMESPACE}/paymentMethodInit`,
        payload: {
          transactionId,
          isDcOMNE: isDcOMNE({ submissionChannel: taskDetailSubmissionChannel, caseCategory }),
        },
      });
    }
  }, [transactionId, clientBankAccountList]);

  return (
    <div className={styles.investmentConsultant}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_POS: 'PaymentMethod',
        })}
        className={classnames('PaymentMethod', styles.paymentMethodHeader)}
      >
        <div className={styles.paymentMethod}>
          <PayoutOptionSection
            transactionId={transactionId}
            payoutPaymentMethod={payoutPaymentMethod}
            payoutOption={payoutOption}
          />
          {payoutOption === OptionEnum.BTR && (
            <>
              {((tenant.isPH() && !lodash.isEmpty(renderTxPmBankList)) || !tenant.isPH()) && (
                <SectionTable
                  section="PaymentMethod"
                  config={localConfig}
                  dataSource={renderTxPmBankList?.map((item, index) => index)}
                  className={styles.hiddencolor}
                  classNameHeader={classNames({
                    [styles.indent]: hasDefaultPayoutBank,
                    [styles.selfTableHeader]: true,
                  })}
                  suffixItem={(idx) => {
                    const item = renderTxPmBankList[idx] || {};
                    return (
                      <PreferPayout
                        isShow={
                          tenant.isTH() &&
                          sourceSystem == 'LA' &&
                          !item.isDefaultPayoutBank &&
                          item.selected
                        }
                        isSetPreferPayout={setPreferredPayout === 'Y'}
                        style={{ margin: '10px 0' }}
                        transactionId={transactionId}
                        className={classNames({
                          [styles.preferPayoutIndent]: hasDefaultPayoutBank,
                        })}
                      />
                    );
                  }}
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
                    txPmBankList?.filter((item) => item.bankNewAdd === 'Y')?.length > 0 &&
                    !tenant.isPH(),
                  [styles.addSection]: tenant.isPH(),
                  [styles.addIndent]: hasDefaultPayoutBank,
                })}
              >
                {!tenant.isPH() && <AddSection transactionId={transactionId} />}
                {tenant.isPH() && (
                  <PaymentMethodForNewAccountSection transactionId={transactionId} />
                )}
              </div>
            </>
          )}
          {payoutOption === OptionEnum.PPY && (
            <div className={styles.payBox}>
              <PPYSection transactionId={transactionId} />
              <PreferPayout
                isShow={
                  tenant.isTH() && payoutPaymentMethod !== OptionEnum.PPY && sourceSystem == 'LA'
                }
                isSetPreferPayout={setPreferredPayout === 'Y'}
                transactionId={transactionId}
              />
            </div>
          )}
          {payoutOption === OptionEnum.CHQ && (
            <div className={styles.payBox}>
              <CHQSection transactionId={transactionId} />
              <PreferPayout
                isShow={
                  tenant.isTH() && payoutPaymentMethod !== OptionEnum.CHQ && sourceSystem == 'LA'
                }
                isSetPreferPayout={setPreferredPayout === 'Y'}
                transactionId={transactionId}
              />
            </div>
          )}
        </div>
      </FormAntCard>
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
);
export default PaymentMethod;
