import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import {
  OperationTypeEnum,
  PremiumTypeEnum,
  EditSectionCodeEnum,
  StateSectionEnum,
} from 'process/GeneralPOS/common/Enum';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { tenant } from '@/components/Tenant';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';

const Item = ({ form, transactionId, id, tableCollect }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/partialWithdrawalUpdate`,
      payload: {
        transactionId,
        fundCode: id,
        type: OperationTypeEnum.DELETE,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Section
        form={form}
        editable={editable}
        section="PartialWithdrawal"
        tableCollect={tableCollect}
      >
        <Fields.FundCode transactionId={transactionId} />
        <Fields.Currency transactionId={transactionId} />
        <Fields.UnitPrice transactionId={transactionId} />
        <Fields.BaseUnit />
        <Fields.TopUpUnit />
        <Fields.UnitHolding />
        <Fields.AccountValue />
        <Fields.WithdrawalPct />
        <Fields.WithdrawalUnit />
        <Fields.WriteWithdrawalAmt />
        <Fields.WithdrawalAmt />
        <Fields.FundChargeAmt />
      </Section>
      {!tenant.isPH() && editable && (
        <div className={classNames(styles.btn)}>
          <div className={styles.icon} onClick={remove}>
            <Icon type="close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId, id }: any) => ({
    task: processTask?.getTask,
    partialWithdrawalFundList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.partialWithdrawalFundList,
    withdrawalOpt:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.withdrawalOpt,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any, form) {
      const { dispatch, transactionId, id: fundCode, task }: any = props;
      const { caseCategory, activityKey } = task || {};
      const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'partialWithdrawalUpdate',
          payload: {
            changedFields,
            transactionId,
            fundCode,
            type: OperationTypeEnum.LISTINFOUPDATE,
            isNotDataCapture,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { partialWithdrawalFundList, task, id: fundCode, withdrawalOpt } = props;
      const { caseCategory, taskStatus, activityKey } = task || {};
      const isNotDataCapture = !isDataCapture({ caseCategory, activityKey });
      let item = lodash.cloneDeep(
        lodash.find(
          partialWithdrawalFundList,
          (item) => fundCode === formUtils.queryValue(item.fundCode)
        ) || {}
      );

      if (isNotDataCapture) {
        const premiumTypeMap = lodash
          .chain(partialWithdrawalFundList)
          .filter((item) => fundCode === formUtils.queryValue(item.fundCode))
          .groupBy('premiumType')
          .value();

        item = {
          ...(premiumTypeMap?.[PremiumTypeEnum.BOTH]?.[0] || {}),
          unitHolding: Number(premiumTypeMap?.[PremiumTypeEnum.BOTH]?.[0]?.unitHolding || 0),
          baseUnit: Number(premiumTypeMap?.[PremiumTypeEnum.BS]?.[0]?.unitHolding || 0),
          topUpUnit:
            Number(premiumTypeMap?.[PremiumTypeEnum.RT]?.[0]?.unitHolding || 0) +
            Number(premiumTypeMap?.[PremiumTypeEnum.AT]?.[0]?.unitHolding || 0),
        };
      }
      item.withdrawalOpt =
        withdrawalOpt || defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION);
      return formUtils.mapObjectToFields(
        taskStatus === 'completed' ? formUtils.cleanValidateData(item) : item
      );
    },
  })(Item)
);
