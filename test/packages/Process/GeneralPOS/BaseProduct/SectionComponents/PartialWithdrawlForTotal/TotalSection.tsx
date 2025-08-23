import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PremiumTypeEnum } from 'process/GeneralPOS/common/Enum';

const FundSwitch = ({ form }: any) => {
  return (
    <div className={styles.totalWrap}>
      <SectionDafault
        form={form}
        layout="horizontal"
        editable={false}
        section="PartialWithdrawlForTotal"
        tableCollect={() => {}}
      >
        <Fields.TotalAccountValue />
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
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { partialWithdrawalFundList } = props;
      const list = formUtils.cleanValidateData(
        partialWithdrawalFundList?.filter((item) => item.premiumType === PremiumTypeEnum.BOTH) || []
      );

      return formUtils.mapObjectToFields({
        totalAccountValue: lodash
          .sum(list.map((item) => Number(Number(item.accountValue || 0).toFixed(2))))
          .toFixed(2),
      });
    },
  })(FundSwitch)
);
