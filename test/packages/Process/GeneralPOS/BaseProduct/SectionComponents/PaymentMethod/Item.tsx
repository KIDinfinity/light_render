import React from 'react';
import { Form, Icon } from 'antd';
import { tenant } from '@/components/Tenant';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';
import classNames from 'classnames';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { Radio } from 'antd';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { DefaultFlag } from '.';

const Item = ({
  form,
  txPmBankList,
  transactionId,
  id,
  tableCollect,
  payoutPaymentMethod,
  hasDefaultPayoutBank,
}: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  const item = txPmBankList?.[id] || {};

  const selectBank = (e) => {
    if (editable) {
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'paymentMethodUpdate',
        payload: {
          transactionId,
          index: id,
          type: OperationTypeEnum.COVER,
          changedFields: {
            selected: true,
          },
        },
      });
    }
  };

  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'paymentMethodUpdate',
      payload: {
        transactionId,
        index: id,
        type: OperationTypeEnum.DELETE,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Radio
        className={classNames(styles.radio, { [styles.disabled]: !editable })}
        checked={item?.selected}
        onClick={selectBank}
      />
      <div
        className={classNames({
          [styles.sectionWrapper]: true,
          [styles.indent]: !item.isDefaultPayoutBank && hasDefaultPayoutBank,
        })}
      >
        {item.isDefaultPayoutBank && <DefaultFlag />}
        <Section
          form={form}
          editable={editable}
          section="PaymentMethod"
          tableCollect={tableCollect}
        >
          <Fields.PolicyOwner />
          <Fields.BankCode transactionId={transactionId} />
          <Fields.BranchCode />
          <Fields.BankCurrency />
          <Fields.BankAccountNo />
          <Fields.BankAccountName />
          <Fields.TypeOfAccount />
          <Fields.CurrentFrom />
          <Fields.CurrentTo />
        </Section>
      </div>

      {editable && item?.bankNewAdd === 'Y' && (
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
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    task: processTask?.getTask,

    txPmBankList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0]
        ?.txPmBankList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentMethodUpdate',
          payload: {
            changedFields,
            transactionId,
            index,
            type: OperationTypeEnum.LISTINFOUPDATE,
          },
        });
        if (tenant.isPH()) {
          dispatch({
            type: `${NAMESPACE}/paymentMethodBranchCodeUpdate`,
            payload: {
              transactionId,
              index,
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { txPmBankList, task, id: index, policyOwner } = props;
      const item = txPmBankList?.[index];

      return formUtils.mapObjectToFields(
        task?.taskStatus === 'completed'
          ? formUtils.cleanValidateData({
              ...item,
              policyOwner,
              bankCurrency: item?.bankCurrency || item?.currencyCode,
            })
          : { ...item, policyOwner, bankCurrency: item?.bankCurrency || item?.currencyCode }
      );
    },
  })(Item)
);
