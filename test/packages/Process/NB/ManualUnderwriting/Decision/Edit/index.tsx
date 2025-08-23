import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Tooltip, Icon } from 'antd';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import useGetDecisionData from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionData';
import useHandleReCalculateCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleReCalculateCallback';
import useHandleAddRiderCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddRiderCallback';
import useLoadExclusionList from 'process/NB/ManualUnderwriting/_hooks/useLoadExclusionList';
import useLoadAllResonConfigList from 'process/NB/ManualUnderwriting/_hooks/useLoadAllResonConfigList';
import useGetBankInfoFieldData from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldData';
import useGetbankInfoIndex from 'process/NB/ManualUnderwriting/_hooks/useGetbankInfoIndex';
import useGetBankAcctFactoryHouse from 'process/NB/ManualUnderwriting/_hooks/useGetBankAcctFactoryHouse';
import useGetIsShowWithdrawalPaymentInfo from 'process/NB/ManualUnderwriting/_hooks/useGetIsShowWithdrawalPaymentInfo';
import useGetIsShowPayoutFundBankInfo from 'process/NB/ManualUnderwriting/_hooks/useGetIsShowPayoutFundBankInfo';
import useGetShowDividendICPInfo from 'process/NB/ManualUnderwriting/_hooks/useGetShowDividendICPInfo';
import PlanInfo from 'process/NB/ManualUnderwriting/PlanInfo/PolicyInfoDetail/Edit';
import RenewalPaymentBankInfoTable from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/RenewalPaymentAmount/BankInfoEdit';
import RenewalPaymentBankCardInfoTable from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/RenewalPaymentAmount/BankCardInfoEdit';
import WithdrawalPaymentInfoTable from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/WithdrawalPaymentInfo/Edit';
import PayoutFundBankInfoTable from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/PayoutFundBankInfo/Edit';
import DividendICPInfo from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/DividendICPInfo/Edit';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Benefit from 'process/NB/ManualUnderwriting/Decision/Benefit';
import useGetNeedPremRecalFlag from 'process/NB/ManualUnderwriting/_hooks/useGetNeedPremRecalFlag';
import useGetPlaninfotableEditable from 'process/NB/ManualUnderwriting/_hooks/useGetPlaninfotableEditable';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import styles from './index.less';
import useGetWaiveListByCoreCode from 'process/NB/ManualUnderwriting/_hooks/useGetWaiveListByCoreCode';
import useGetBasePremiumValue from 'process/NB/ManualUnderwriting/_hooks/useGetBasePremiumValue';
import useLoadFundConfigByProductList from 'process/NB/ManualUnderwriting/_hooks/useLoadFundConfigByProductList';
import CharityOrganizationTable from '../../PlanInfo/PaymentInfoDetail/CharitableOrganization/Edit';
import CaseCategory from 'basic/enum/CaseCategory';

const Decision = ({ mode }: any) => {
  const dispatch = useDispatch();
  const regionCode = tenant.region();
  const [recalculateLoading, setReCalculateLoading] = useState(false);
  const needPremRecal = useGetNeedPremRecalFlag();
  const isShowWithdrawalPaymentInfo = useGetIsShowWithdrawalPaymentInfo();
  const isShowPayoutFundBankInfo = useGetIsShowPayoutFundBankInfo();
  const showDividendICPInfo = useGetShowDividendICPInfo();
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldData({ type: BankInfoType.Renewal });
  const withdrawalPaymentInfoTableData = useGetBankInfoFieldData({ type: BankInfoType.Withdrawal });
  const payoutFundBankInfoTableData = useGetBankInfoFieldData({ type: BankInfoType.Payout });
  const icpDividendBankInfoData = useGetBankInfoFieldData({ type: BankInfoType.ICPDividend });
  const renewalPaymentBankIInfoIndex = useGetbankInfoIndex({ type: BankInfoType.Renewal });
  const withdrawalPaymentInfoIndex = useGetbankInfoIndex({ type: BankInfoType.Withdrawal });
  const payoutFundBankInfoIndex = useGetbankInfoIndex({ type: BankInfoType.Payout });
  const icpDividendBankInfoIndex = useGetbankInfoIndex({ type: BankInfoType.ICPDividend });
  const addProductButtonEditable = useGetPlaninfotableEditable();
  useGetBankAcctFactoryHouse();
  const handleRecalculate = useHandleReCalculateCallback({
    mode,
    setLoading: setReCalculateLoading,
  });

  useLoadExclusionList();
  const basePremium = useGetBasePremiumValue();
  const data = useGetDecisionData();
  useLoadAllResonConfigList();
  const {
    caseCategory,
    applicationNo,
    clientInfoList,
    policyOrderCoerageList,
  }: any = lodash.pick(data, [
    'caseCategory',
    'applicationNo',
    'clientInfoList',
    'policyOrderCoerageList',
  ]);

  useGetWaiveListByCoreCode({
    coverageList: policyOrderCoerageList,
    region: regionCode,
    tenant: regionCode,
  });
  const handleAddRider = useHandleAddRiderCallback();

  useEffect(() => {
    window.requestIdleCallback(() => {
      lodash.map(policyOrderCoerageList, (item: any) => {
        dispatch({
          type: `${NAMESPACE}/saveShowAddBtn`,
          payload: {
            value: formUtils.queryValue(item?.uwDecision),
            productCode: item?.coreCode,
          },
        });

        dispatch({
          type: `${NAMESPACE}/setClientNameList`,
          payload: {
            clientName: lodash.get(item, 'coverageInsuredList[0].clientName'),
          },
        });
        dispatch({
          type: `${NAMESPACE}/saveShowLoading`,
          payload: {
            value: formUtils.queryValue(item?.uwDecision),
            productCode: item?.coreCode,
          },
        });
      });
      dispatch({
        type: `${NAMESPACE}/getDropdownList`,
      });
      dispatch({
        type: `${NAMESPACE}/searchBankCode`,
      });

      dispatch({
        type: `${NAMESPACE}/getSpecificCfgFactoringHouses`,
      });
      dispatch({
        type: `${NAMESPACE}/getAllFundConfigList`,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationNo]);
  useLoadFundConfigByProductList();

  const bankCardInfoTHVisible = () => {
    return caseCategory === CaseCategory.BP_PAPER_CTG003 ? true : false;
  };

  const isShowRenewalPaymentBankInfo = tenant.region({
    [Region.TH]: bankCardInfoTHVisible,
    notMatch: true,
  });

  const isShowRenewalPaymentBankCardInfo = tenant.region({
    [Region.KH]: false,
    [Region.TH]: bankCardInfoTHVisible,
    notMatch: true,
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.title}>Plan Information</span>
        <div className={styles.add}>
          <Button
            className={styles.element}
            onClick={handleRecalculate}
            loading={recalculateLoading}
          >
            {needPremRecal === 'Y' && (
              <div className={styles.reCalculateBtnFlag}>
                <Tooltip
                  overlayClassName={styles.reCalculateBtnFlagTooltip}
                  title="Plan has changed, please re-calculate to refresh premium!"
                >
                  <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
                </Tooltip>
              </div>
            )}
            <span>Re-Calculate</span>
          </Button>
          <Button
            className={styles.element}
            onClick={() => {
              handleAddRider();
            }}
            disabled={!addProductButtonEditable}
          >
            Add Product
          </Button>
        </div>
      </div>
      <Row className={styles.decision} gutter={[16, 16]}>
        <Col span={24}>
          <PlanInfo basePremium={basePremium} />
        </Col>
      </Row>
      <>
        {isShowRenewalPaymentBankInfo && (
          <RenewalPaymentBankInfoTable
            renewalPaymentBankInfoTableData={renewalPaymentBankInfoTableData}
            bankInfoIndex={renewalPaymentBankIInfoIndex}
            id={renewalPaymentBankInfoTableData?.id}
          />
        )}
        {isShowRenewalPaymentBankCardInfo && <RenewalPaymentBankCardInfoTable />}
        {isShowWithdrawalPaymentInfo && (
          <WithdrawalPaymentInfoTable
            withdrawalPaymentInfoTableData={withdrawalPaymentInfoTableData}
            bankInfoIndex={withdrawalPaymentInfoIndex}
            id={withdrawalPaymentInfoTableData?.id}
          />
        )}
        {tenant.region({
          [Region.MY]: () => <CharityOrganizationTable />,
          notMatch: () => null,
        })}
        {isShowPayoutFundBankInfo && (
          <PayoutFundBankInfoTable
            payoutFundBankInfoTableData={payoutFundBankInfoTableData}
            bankInfoIndex={payoutFundBankInfoIndex}
            id={payoutFundBankInfoTableData?.id}
          />
        )}
        {showDividendICPInfo && (
          <DividendICPInfo
            icpDividendBankInfoData={icpDividendBankInfoData}
            bankInfoIndex={icpDividendBankInfoIndex}
            id={icpDividendBankInfoData?.id}
          />
        )}
      </>
      <div className={styles.content}>
        <div className={styles.benefit}>
          <Benefit
            coverageList={policyOrderCoerageList}
            clientInfoList={clientInfoList}
            mode={mode}
            caseCategory={caseCategory}
          />
        </div>
      </div>
    </div>
  );
};

Decision.displayName = 'decision';

export default Decision;
