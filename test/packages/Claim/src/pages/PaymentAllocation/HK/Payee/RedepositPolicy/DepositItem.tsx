import DataLayout from '@/components/DataLayout';
import DataWrap from '@/components/DataLayout/DataWrap';
import FormRegist from '@/components/FormRegistComponent';
import { withContextData } from '@/components/_store';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { FormItemInput, FormItemNumber, FormItemSelect } from 'basic/components/Form/FormItem';
import DeleteButton from 'claim/components/DeleteButton';
import { getRedepositPolicyDicts } from 'claim/pages/PaymentAllocation/_function';
import formatExchangeRecord from 'claim/pages/utils/formatExchangeRecord';
import { connect } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash, { isNumber } from 'lodash';
import React, { useMemo } from 'react';
import styles from './index.less';
import type { IDepositPolicy } from './types';

const DepositPolicySection = (props: IDepositPolicy) => {
  const {
    form,
    ownerPolicyMap,
    payeeItem,
    taskNotEditable,
    dispatch,
    redepositPolicyItem,
    canRedeposit = false,
  } = props;

  const ownerPolicyList = useMemo(
    () => getRedepositPolicyDicts(ownerPolicyMap, payeeItem),
    [ownerPolicyMap, payeeItem]
  );

  const isESubmissionRedepositPolicy = useMemo(() => {
    return (
      isNumber(redepositPolicyItem?.originalRedepositPercentage) &&
      redepositPolicyItem?.originalRedepositPercentage > 0
    );
  }, [redepositPolicyItem?.originalRedepositPercentage]);

  return (
    <div className={styles.rowContent}>
      <DataLayout>
        <DataWrap span={4}>
          <FormItemSelect
            form={form}
            formName="redepositPolicyNo"
            labelType="inline"
            dicts={ownerPolicyList}
            dictCode="policyId"
            dictName="policyId"
            required
            disabled={isESubmissionRedepositPolicy || taskNotEditable || !canRedeposit}
          />
        </DataWrap>
        <DataWrap span={4}>
          <FormItemNumber
            form={form}
            formName="redepositPercentage"
            min={0}
            max={100}
            precision={0}
            labelType="inline"
            disabled={taskNotEditable || !canRedeposit}
            suffix={<div className={styles.suffix}>%</div>}
          />
        </DataWrap>
        <DataWrap span={4}>
          <FormItemNumber form={form} formName="redepositAmount" labelType="inline" disabled />
        </DataWrap>
        <DataWrap span={4}>
          <FormItemInput
            form={form}
            formName="redepositPolicyCurrency"
            labelType="inline"
            disabled
          />
        </DataWrap>
        <DataWrap span={8}>
          <FormItemInput form={form} formName="exchangeRateRecord" labelType="inline" disabled />
        </DataWrap>
      </DataLayout>
      {!isESubmissionRedepositPolicy && !taskNotEditable && canRedeposit && (
        <DeleteButton
          className={styles.close}
          handleClick={() => {
            if (!!dispatch) {
              dispatch({
                type: 'paymentAllocation/deleteRedepositPolicy',
                payload: {
                  payeeId: payeeItem?.id,
                  redepositPolicyId: redepositPolicyItem?.id,
                },
              });
            }
          }}
        />
      )}
    </div>
  );
};

const FormWrap = Form.create<IDepositPolicy>({
  mapPropsToFields(props) {
    const { redepositPolicyItem } = props;
    return formUtils.mapObjectToFields(
      {
        ...redepositPolicyItem,
      },
      {
        exchangeRateRecord: (val: any) => formatExchangeRecord(val),
      }
    );
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, redepositPolicyItem, withData, validating } = props;
    const payeeId = lodash.get(withData, 'payeeItem.id', '');
    // const changedFieldsTemp = { ...changedFields };

    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'saveRedepositPolicy',
            payload: {
              changedFields,
              id: redepositPolicyItem?.id,
              payeeId,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'saveRedepositPolicy',
          payload: {
            changedFields,
            id: redepositPolicyItem?.id,
            payeeId,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(DepositPolicySection, shallowEqual)));

const DepositItem = connect(({ claimEditable, formCommonController, paymentAllocation }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
  ownerPolicyMap: paymentAllocation.ownerPolicyMap,
  beneficiaryList: lodash.get(
    paymentAllocation,
    'claimData.policyBenefitList[0].beneficiaryList',
    []
  ),
}))(withContextData(FormWrap));

export default DepositItem;
