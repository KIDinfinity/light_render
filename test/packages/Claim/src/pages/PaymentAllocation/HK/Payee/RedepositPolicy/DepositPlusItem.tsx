import DataLayout from '@/components/DataLayout';
import DataWrap from '@/components/DataLayout/DataWrap';
import FormRegist from '@/components/FormRegistComponent';
import { withContextData } from '@/components/_store';
import { Form } from 'antd';
import { FormItemSelect } from 'basic/components/Form/FormItem';
import { getRedepositPolicyDicts } from 'claim/pages/PaymentAllocation/_function';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import React, { useEffect, useMemo } from 'react';
import type { IDepositPolicy } from './types';

// just for add new section
const DepositPolicyPlusSection = (props: IDepositPolicy) => {
  const { form, ownerPolicyMap, payeeItem, taskNotEditable } = props;
  useEffect(() => {
    form.resetFields();
  }, [form]);
  const ownerPolicyList = useMemo(
    () => getRedepositPolicyDicts(ownerPolicyMap, payeeItem),
    [ownerPolicyMap, payeeItem]
  );

  return (
    <DataLayout>
      <DataWrap span={4}>
        <FormItemSelect
          dicts={ownerPolicyList}
          dictCode="policyId"
          dictName="policyId"
          form={form}
          formName="redepositPolicyNo"
          labelType="inline"
          required
          disabled={taskNotEditable}
        />
      </DataWrap>
    </DataLayout>
  );
};
// just for add new section
const FormPlusWrap = Form.create<IDepositPolicy>({
  mapPropsToFields() {
    return {};
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, payeeItem } = props;
    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: 'paymentAllocation/addRedepositPolicy',
        payload: {
          changedFields,
          payeeId: payeeItem?.id,
        },
      });
    }
  },
})(
  FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(DepositPolicyPlusSection, shallowEqual))
);

const DepositPlusItem = connect(
  ({ claimEditable, formCommonController, paymentAllocation }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    ownerPolicyMap: paymentAllocation.ownerPolicyMap,
    beneficiaryList: lodash.get(
      paymentAllocation,
      'claimData.policyBenefitList[0].beneficiaryList',
      []
    ),
  })
)(withContextData(FormPlusWrap));

export default DepositPlusItem;
