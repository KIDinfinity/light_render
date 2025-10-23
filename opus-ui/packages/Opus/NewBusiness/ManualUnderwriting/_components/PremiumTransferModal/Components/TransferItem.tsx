import { Form, Spin } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import React, { useState } from 'react';
import { useThrottleFn } from 'ahooks';
import lodash from 'lodash';

import { Button } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from '../Section';
import styles from './TransferItem.less';
import { TransferPaymentStatus } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import TaskDefKey from 'basic/enum/TaskDefKey';
import { usePrevious } from 'ahooks';

const TransferItem = ({ form, data, list }: any) => {
  const dispatch = useDispatch();

  const businessData = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.businessData;
  });

  const processData = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.processData;
  });

  const { taskDetail } = useSelector(
    ({ [NAMESPACE]: state }: any) => state?.premiumTransferModalData
  );

  const [validating, setValidating] = useState(false);

  const prevData = usePrevious(data);

  const { id, status } = data;

  const rowDisabled = status === TransferPaymentStatus.Success;

  const deleteDisabled =
    rowDisabled ||
    list.filter((item: any) => item.status !== TransferPaymentStatus.Success).length < 2;

  const onValidatePolicyId = async (e: any) => {
    // 防止循环校验
    if (e.relatedTarget?.nodeName === 'INPUT') {
      return;
    }

    form.validateFields(async (err: any, fieldsValue: any) => {
      if (err) {
        return;
      }

      const { amount, targetPolicyId } = fieldsValue;

      if (
        formUtils.queryValue(amount) === formUtils.queryValue(prevData.amount) &&
        formUtils.queryValue(targetPolicyId) === formUtils.queryValue(prevData.targetPolicyId)
      ) {
        return;
      }

      setValidating(true);

      const payload: any = {
        id,
        policyId: formUtils.queryValue(targetPolicyId),
        addNew: false,
      };

      // 兼容premium settlement
      if (taskDetail?.activityKey === TaskDefKey.BP_NB_ACT006) {
        payload.businessData = lodash.cloneDeep(businessData);
      }

      await dispatch({
        type: `${NAMESPACE}/validateTransferPolicyId`,
        payload: payload,
      });

      setValidating(false);
    });
  };

  const { run: onAdd } = useThrottleFn(
    async () => {
      if (status === TransferPaymentStatus.Success) {
        dispatch({
          type: `${NAMESPACE}/addPaymentTransferItem`,
          payload: {
            changedFields: { policyId: processData?.policyId },
          },
        });

        return;
      }

      setValidating(true);

      form.validateFields(async (err: any, fieldsValue: any) => {
        if (err) {
          setValidating(false);

          return;
        }

        await dispatch({
          type: `${NAMESPACE}/validateTransferPolicyId`,
          payload: {
            id,
            policyId: formUtils.queryValue(fieldsValue.targetPolicyId),
          },
        });

        setValidating(false);
      });
    },
    { wait: 1500 }
  );

  const onDelete = () => {
    const { id } = data;

    dispatch({
      type: `${NAMESPACE}/deleteTransferPaymentItem`,
      payload: {
        id,
      },
    });
  };

  return (
    <div className={styles.transferItem}>
      <Spin spinning={validating}>
        <Section form={form} editable={!rowDisabled} section="TransferInformation">
          <Fields.TargetPolicyId onBlur={onValidatePolicyId} />
          <Fields.Amount onBlur={onValidatePolicyId} />
          <Fields.Status />
        </Section>

        <div className={styles.operations}>
          {id === list[list.length - 1].id && <Button icon="plus" type="link" onClick={onAdd} />}
          <Button icon="delete" type="link" disabled={deleteDisabled} onClick={onDelete} />
        </div>
      </Spin>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'updateTransferPaymentItem',
          payload: {
            changedFields,
            id: data.id,
          },
        });
      }
    },
  })(TransferItem)
);
