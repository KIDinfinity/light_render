import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PremiumTypeEnum } from 'process/GeneralPOS/common/Enum';
import { stringToNumber } from 'process/GeneralPOS/common/utils';
import { tenant } from '@/components/Tenant';
import classNames from 'classnames';

const FundSwitch = ({ form }: any) => {
  return (
    <div className={classNames(styles.totalWrap, { [styles.pr8]: !tenant.isPH() })}>
      <SectionDafault
        form={form}
        layout="horizontal"
        editable={false}
        section="PartialWithdrawal"
        tableCollect={() => {}}
      >
        <Fields.TotalAccountValue />
        <Fields.TotalAmount />
        <Fields.TotalSurrenderCharge />
        <Fields.NetAmount />
        <Fields.ChargeRate />
      </SectionDafault>
    </div>
  );
};

export default connect(
  (
    { [NAMESPACE]: modelnamepsace, processTask, formCommonController }: any,
    { transactionId }: any
  ) => ({
    partialWithdrawalFundList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.partialWithdrawalFundList,
    task: processTask?.getTask,
    policyFundDOList: modelnamepsace.processData?.policyInfo?.policyFundDOList,
    policySurrenderChargeRateList:
      modelnamepsace.processData?.policyInfo?.policySurrenderChargeRateList,
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { partialWithdrawalFundList, policyFundDOList, policySurrenderChargeRateList } = props;
      const list = formUtils.cleanValidateData(
        partialWithdrawalFundList?.filter((item) => item.premiumType === PremiumTypeEnum.BOTH) || []
      );
      const totalAmount = lodash.every(
        list,
        (item) => item.withdrawalAmt !== 0 && !item.withdrawalAmt
      )
        ? ''
        : lodash.sum(list.map((item) => Number(Number(item.withdrawalAmt || 0).toFixed(2))));

      const totalSurrenderCharge = lodash.sum(
        list.map((item) => Number(Number(item.fundChargeAmt || 0).toFixed(2)))
      );
      const currency = policyFundDOList?.[0]?.currency || '';
      const surrenderChargeRate = lodash.filter(
        policySurrenderChargeRateList,
        (item) =>
          item?.coverageSeq === '01' &&
          item?.lifeNo === '01' &&
          item?.riderSeq === '00' &&
          item?.chargeType === 'J'
      )[0]?.feeRate;
      return formUtils.mapObjectToFields({
        totalAccountValue: stringToNumber(
          lodash.sum(list.map((item) => Number(Number(item.accountValue || 0).toFixed(2)))),
          2
        ),
        totalAmount:
          totalAmount === ''
            ? ''
            : `${stringToNumber(totalAmount, 2)} ${tenant.isPH() ? '' : currency}`,
        totalSurrenderCharge: `${stringToNumber(totalSurrenderCharge, 2)} ${currency}`,
        netAmount:
          totalAmount === ''
            ? ''
            : `(Net ${stringToNumber(totalAmount - totalSurrenderCharge, 2)}${
                currency ? ' ' : ''
              }${currency})`,
        surrenderChargeRate: `(Rate ${(
          Math.floor(Number(surrenderChargeRate) * 100) / 100 || 0
        ).toFixed(2)} %)`,
      });
    },
  })(FundSwitch)
);
